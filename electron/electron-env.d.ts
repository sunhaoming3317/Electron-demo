/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string;
    /** /dist/ or /public/ */
    VITE_PUBLIC: string;
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import("electron").IpcRenderer;
  electronApi: {
    showOpenDialog: (
      options: import("electron").OpenDialogOptions,
    ) => Promise<import("electron").OpenDialogReturnValue>;
    showSaveDialog: (
      options: import("electron").SaveDialogOptions,
    ) => Promise<import("electron").SaveDialogReturnValue>;
    showMessageBox: (
      options: import("electron").MessageBoxOptions,
    ) => Promise<import("electron").MessageBoxReturnValue>;
    showErrorBox: (options: { title: string; content: string }) => void;
    showCertificateTrustDialog: (
      options: import("electron").CertificateTrustDialogOptions,
    ) => Promise<import("electron").CertificateTrustDialogReturnValue>;
    saveFile: (
      filePath: string,
      content: string,
    ) => Promise<{ success: boolean; error?: Error }>;
    showNotification: (
      options: Electron.NotificationConstructorOptions,
    ) => Promise<import("electron").NotificationResponse>;
    clipboard: {
      writeText: (text: string) => Promise<void>;
      readText: () => Promise<string>;
      writeImage: (image: string) => Promise<void>;
      readImage: () => Promise<Electron.NativeImage>;
      writeHTML: (html: string) => Promise<void>;
      readHTML: () => Promise<string>;
      clear: () => Promise<void>;
    };
    session: {
      getUserAgent: () => Promise<string>;
      clearCache: () => Promise<void>;
      clearStorageData: (
        options?: Electron.SessionClearStorageDataOptions,
      ) => Promise<void>;
      setCookies: (cookie: Electron.CookiesSetDetails) => Promise<void>;
      getCookies: (filter: Electron.CookiesGetFilter) => Promise<Electron.Cookie[]>;
    };
  };
}

interface USBDeviceFilter {
  vendorId?: number;
  productId?: number;
  classCode?: number;
  subclassCode?: number;
  protocolCode?: number;
  serialNumber?: string;
}

interface Navigator {
  usb: {
    requestDevice: (options?: {
      filters?: USBDeviceFilter[];
    }) => Promise<USBDevice>;
    getDevices: () => Promise<USBDevice[]>;
  };
}
