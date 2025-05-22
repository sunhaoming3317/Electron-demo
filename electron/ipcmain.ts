import { ipcMain, dialog, clipboard, nativeImage } from "electron";
import fs from "fs";
import path from "path";

export function setupHandlers() {
  ipcMain.handle("open-dialog", async (_, options) => {
    return await dialog.showOpenDialog(options);
  });

  ipcMain.handle("save-dialog", async (_, options) => {
    return await dialog.showSaveDialog(options);
  });

  ipcMain.handle("message-box", async (_, options) => {
    return await dialog.showMessageBox(options);
  });

  ipcMain.handle("error-box", async (_, options: {title: string, content: string}) => {
    return dialog.showErrorBox(options.title, options.content);
  });

  ipcMain.handle("certificate-trust-dialog", async (_, {certificate, message}: {certificate: Electron.Certificate, message: string}) => {
    return await dialog.showCertificateTrustDialog({certificate, message});
  });


  ipcMain.handle("save-file", async (_, filePath: string, content: string) => {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, content);
      return { success: true };
    } catch (error) {
      console.error("文件保存失败:", error);
      return { success: false, error };
    }
  });

  ipcMain.handle("clipboard-write-text", async (_, text: string) => {
    return clipboard.writeText(text);
  });

  ipcMain.handle("clipboard-read-text", async () => {
    return clipboard.readText();
  });

  ipcMain.handle(
    "clipboard-write-image",
    async (_, image: string) => {
      const icon = nativeImage.createFromPath(image);

      return clipboard.writeImage(icon);
    },
  );

  ipcMain.handle("clipboard-read-image", async () => {
    return clipboard.readImage();
  });

  ipcMain.handle("clipboard-write-html", async (_, html: string) => {
    return clipboard.writeHTML(html);
  });

  ipcMain.handle("clipboard-read-html", async () => {
    return clipboard.readHTML();
  });

  ipcMain.handle("clipboard-clear", async () => {
    return clipboard.clear();
  });
}
