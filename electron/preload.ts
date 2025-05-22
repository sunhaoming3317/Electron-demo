// 引入 electron 模块的 ipcRenderer 和 contextBridge 组件
import { ipcRenderer, contextBridge } from "electron";

// --------- 向渲染进程暴露一些 API ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  // 监听指定频道的事件，当事件触发时调用传入的监听器函数
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args),
    );
  },
  // 停止监听指定频道的事件，传入频道和要移除的监听器等参数
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  // 向主进程发送消息，传入频道和要发送的消息等参数
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  // 向主进程发送消息并等待主进程的回复，传入频道和要发送的消息等参数
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
});
contextBridge.exposeInMainWorld("electronApi", {
  showOpenDialog: (options: Electron.OpenDialogOptions) => {
    return ipcRenderer.invoke("open-dialog", options);
  },
  showSaveDialog: (options: Electron.SaveDialogOptions) => {
    return ipcRenderer.invoke("save-dialog", options);
  },
  showMessageBox: (options: Electron.MessageBoxOptions) => {
    return ipcRenderer.invoke("message-box", options);
  },
  showErrorBox: (options: { title: string; content: string }) => {
    return ipcRenderer.invoke("error-box", options);
  },
  showCertificateTrustDialog: (
    options: Electron.CertificateTrustDialogOptions,
  ) => {
    return ipcRenderer.invoke("certificate-trust-dialog", options);
  },
  saveFile: (filePath: string, content: string) => {
    return ipcRenderer.invoke("save-file", filePath, content);
  },
  showNotification: (options: Electron.NotificationConstructorOptions) => {
    return ipcRenderer.invoke("show-notification", options);
  },
  clipboard: {
    writeText: (text: string) => {
      return ipcRenderer.invoke("clipboard-write-text", text);
    },
    readText: () => {
      return ipcRenderer.invoke("clipboard-read-text");
    },
    writeImage: (image: Electron.NativeImage) => {
      return ipcRenderer.invoke("clipboard-write-image", image);
    },
    readImage: () => {
      return ipcRenderer.invoke("clipboard-read-image");
    },
    writeHTML: (html: string) => {
      return ipcRenderer.invoke("clipboard-write-html", html);
    },
    readHTML: () => {
      return ipcRenderer.invoke("clipboard-read-html");
    },
    clear: () => {
      return ipcRenderer.invoke("clipboard-clear");
    },
  },
  session: {
    getUserAgent: () => {
      return ipcRenderer.invoke("session-get-user-agent");
    },
    clearCache: () => {
      return ipcRenderer.invoke("session-clear-cache");
    },
    clearStorageData: () => {
      return ipcRenderer.invoke("session-clear-storage-data");
    },
    setCookies: (details: Electron.CookiesSetDetails) => {
      return ipcRenderer.invoke("session-set-cookies", details);
    },
    getCookies: (details: Electron.CookiesGetFilter) => {
      return ipcRenderer.invoke("session-get-cookies", details);
    },
  },
  cancelBluetoothRequest: () => ipcRenderer.send("cancel-bluetooth-request"),
  bluetoothPairingRequest: (callback: (deviceId: string) => void) =>
    ipcRenderer.on("bluetooth-pairing-request", () => callback),
  bluetoothPairingResponse: (response: (response: Electron.Response) => void) =>
    ipcRenderer.send("bluetooth-pairing-response", response),
});
