import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  exportPalette: (data: unknown, defaultFileName: string) =>
    ipcRenderer.invoke('export-palette', data, defaultFileName),
});
