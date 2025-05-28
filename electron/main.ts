import { app, BrowserWindow, Notification } from "electron";
import { setupHandlers } from "./ipcmain";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { notificationHandlers } from "./notification";
import { createTray, destroyTray } from "./tray";
import setupSessionHandlers from "./session";

// 创建一个 require 函数，用于在 ESM 中使用 CommonJS 模块
createRequire(import.meta.url);
// 获取当前文件所在的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 定义应用程序的根目录结构
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
// 设置 APP_ROOT 环境变量为当前目录的上一级目录
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 使用 ['ENV_NAME'] 避免 vite:define 插件 - Vite@2.x
// 从环境变量中获取 Vite 开发服务器的 URL
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
// 定义主进程代码的构建目录
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
// 定义渲染进程代码的构建目录
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

// 根据是否存在 VITE_DEV_SERVER_URL 来设置 VITE_PUBLIC 环境变量
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  // 创建一个新的 BrowserWindow 实例
  win = new BrowserWindow({
    width: 980,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      partition: "persist:eli",
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // 监听窗口的 did-finish-load 事件，当页面加载完成后，向渲染进程发送消息
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // 如果存在 VITE_DEV_SERVER_URL，则加载开发服务器的 URL
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // 否则，加载构建后的 index.html 文件
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// 监听所有窗口关闭的事件，在非 macOS 系统上，退出应用程序
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

// 监听应用程序激活的事件，在 macOS 系统上，如果没有打开的窗口，则创建一个新的窗口
app.on("activate", () => {
  // 在 OS X 上，当应用程序的停靠图标被点击且没有其他窗口打开时，通常会重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("will-quit", () => {
  destroyTray();
});

// 当应用程序准备好时，调用 createWindow 函数创建一个新的窗口
app.whenReady().then(() => {
  createWindow();

  if (!Notification.isSupported()) {
    alert("当前系统不支持通知");
  } else {
    new Notification({
      title: "主进程通知",
      body: "应用程序准备就绪, 这是一个通知消息。",
    }).show();
    notificationHandlers();
  }
  setupHandlers();
  if (win) {
    setupSessionHandlers(win);
    createTray(win);
  }
});
