import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';

const isDev = !app.isPackaged;

async function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 1080,
    minHeight: 720,
    autoHideMenuBar: true,
    backgroundColor: '#09090b',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev && process.env.ELECTRON_START_URL) {
    await win.loadURL(process.env.ELECTRON_START_URL);
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    const filePath = path.join(__dirname, '../dist/index.html');
    await win.loadFile(filePath);
  }
}

app.whenReady().then(() => {
  ipcMain.handle('export-palette', async (_event, data: unknown, defaultFileName: string) => {
    const result = await dialog.showSaveDialog({
      defaultPath: defaultFileName,
      filters: [{ name: 'JSON', extensions: ['json'] }],
    });

    if (result.canceled || !result.filePath) {
      return;
    }

    const json = JSON.stringify(data, null, 2);
    await fs.writeFile(result.filePath, json, 'utf8');
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
