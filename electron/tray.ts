import { Tray, Menu, nativeImage, app, BrowserWindow } from "electron";
import path from "path";
import fs from "fs";

let tray: Tray | null = null;

export const createTray = (win: BrowserWindow | null) => {
  // 创建托盘图标
  const iconPath = path.join(app.getAppPath(), "public", "default_avatar.png");
  if (!fs.existsSync(iconPath)) {
    console.error(`托盘图标文件不存在: ${iconPath}`);
    return null;
  }
  const trayIcon = nativeImage
    .createFromPath(iconPath)
    .resize({ width: 16, height: 16 });

  tray = new Tray(trayIcon);

  // 设置托盘提示
  tray.setToolTip("ELI.S Electron App");

  // 创建上下文菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "显示应用",
      click: () => {
        win?.show();
      },
    },
    {
      label: "退出",
      click: () => {
        app.quit();
      },
    },
  ]);

  // 设置上下文菜单
  tray.setContextMenu(contextMenu);

  // 点击托盘图标事件
  tray.on("click", () => {
    // 这里可以添加点击托盘图标时的行为
  });
};

export const destroyTray = () => {
  if (tray) {
    tray.destroy();
  }
};
