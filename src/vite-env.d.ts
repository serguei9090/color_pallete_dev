/// <reference types="vite/client" />

interface Window {
  electronAPI?: {
    exportPalette: (data: unknown, defaultFileName: string) => Promise<void>;
  };
}
