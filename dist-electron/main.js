import { ipcMain as t, dialog as m, clipboard as u, nativeImage as y, Notification as w, app as p, Tray as S, Menu as x, session as E, BrowserWindow as T } from "electron";
import g from "fs";
import P from "path";
import { createRequire as C } from "node:module";
import { fileURLToPath as L } from "node:url";
import c from "node:path";
function D() {
  t.handle("open-dialog", async (o, e) => await m.showOpenDialog(e)), t.handle("save-dialog", async (o, e) => await m.showSaveDialog(e)), t.handle("message-box", async (o, e) => await m.showMessageBox(e)), t.handle("error-box", async (o, e) => m.showErrorBox(e.title, e.content)), t.handle("certificate-trust-dialog", async (o, { certificate: e, message: r }) => await m.showCertificateTrustDialog({ certificate: e, message: r })), t.handle("save-file", async (o, e, r) => {
    try {
      const a = P.dirname(e);
      return g.existsSync(a) || g.mkdirSync(a, { recursive: !0 }), g.writeFileSync(e, r), { success: !0 };
    } catch (a) {
      return console.error("文件保存失败:", a), { success: !1, error: a };
    }
  }), t.handle("clipboard-write-text", async (o, e) => u.writeText(e)), t.handle("clipboard-read-text", async () => u.readText()), t.handle(
    "clipboard-write-image",
    async (o, e) => {
      const r = y.createFromPath(e);
      return u.writeImage(r);
    }
  ), t.handle("clipboard-read-image", async () => u.readImage()), t.handle("clipboard-write-html", async (o, e) => u.writeHTML(e)), t.handle("clipboard-read-html", async () => u.readHTML()), t.handle("clipboard-clear", async () => u.clear());
}
const k = () => {
  t.handle(
    "show-notification",
    (o, e) => {
      try {
        const r = new w({ ...e });
        return r.on("click", () => {
          console.log("通知被点击");
        }), r.show(), { success: !0 };
      } catch (r) {
        return { success: !1, error: r };
      }
    }
  );
};
let h = null;
const O = (o) => {
  const e = P.join(p.getAppPath(), "public", "default_avatar.png");
  if (!g.existsSync(e))
    return console.error(`托盘图标文件不存在: ${e}`), null;
  const r = y.createFromPath(e).resize({ width: 16, height: 16 });
  h = new S(r), h.setToolTip("ELI.S Electron App");
  const a = x.buildFromTemplate([
    {
      label: "显示应用",
      click: () => {
        o == null || o.show();
      }
    },
    {
      label: "退出",
      click: () => {
        p.quit();
      }
    }
  ]);
  h.setContextMenu(a), h.on("click", () => {
  });
}, j = () => {
  h && h.destroy();
}, A = (o) => {
  const e = E.fromPartition("persist:eli");
  let r, a, _;
  e.on("select-usb-device", (s, n, f) => {
    if (console.log("select-usb-device", n), e.on("usb-device-added", (l, d) => {
      console.log("usb-device-added", d);
    }), e.on("usb-device-removed", (l, d) => {
      console.log("usb-device-removed", d);
    }), s.preventDefault(), n.deviceList && n.deviceList.length > 0) {
      const l = n.deviceList.find((d) => !r || d.deviceId !== (r == null ? void 0 : r.deviceId));
      l ? f(l.deviceId) : f();
    }
  }), e.setPermissionCheckHandler((s, n) => n === "usb"), e.setDevicePermissionHandler((s) => s.deviceType === "usb" ? (r = s.device, !0) : !1), e.setUSBProtectedClassesHandler((s) => (console.log("setUSBProtectedClassesHandler", s), s.protectedClasses.filter((n) => n.indexOf("audio") === -1))), o.webContents.on(
    "select-bluetooth-device",
    (s, n, f) => {
      s.preventDefault(), a = f;
      const l = n.find((d) => d.deviceName === "test");
      l && f(l.deviceId);
    }
  ), t.on("cancel-bluetooth-request", () => {
    a("");
  }), t.on("bluetooth-pairing-response", (s, n) => {
    _(n);
  }), e.setBluetoothPairingHandler((s, n) => {
    _ = n, o.webContents.send("bluetooth-pairing-request", s);
  }), t.handle("session-get-user-agent", () => e.getUserAgent()), t.handle("session-clear-cache", async () => (await e.clearCache(), !0)), t.handle("session-clear-storage-data", async () => (await e.clearStorageData(), !0)), t.handle(
    "session-set-cookies",
    (s, n) => e.cookies.set(n)
  ), t.handle(
    "session-get-cookies",
    (s, n) => e.cookies.get(n)
  );
};
C(import.meta.url);
const I = c.dirname(L(import.meta.url));
process.env.APP_ROOT = c.join(I, "..");
const v = process.env.VITE_DEV_SERVER_URL, F = c.join(process.env.APP_ROOT, "dist-electron"), b = c.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = v ? c.join(process.env.APP_ROOT, "public") : b;
let i;
function R() {
  i = new T({
    width: 980,
    icon: c.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: c.join(I, "preload.mjs"),
      partition: "persist:eli",
      webSecurity: !1,
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), i.webContents.on("did-finish-load", () => {
    i == null || i.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), v ? (console.log(v), i.loadURL(v)) : (console.log(b), i.loadFile(c.join(b, "index.html")));
}
p.on("window-all-closed", () => {
  process.platform !== "darwin" && (p.quit(), i = null);
});
p.on("activate", () => {
  T.getAllWindows().length === 0 && R();
});
p.on("will-quit", () => {
  j();
});
p.whenReady().then(() => {
  R(), w.isSupported() ? (new w({
    title: "主进程通知",
    body: "应用程序准备就绪, 这是一个通知消息。"
  }).show(), k()) : alert("当前系统不支持通知"), D(), i && (A(i), O(i));
});
export {
  F as MAIN_DIST,
  b as RENDERER_DIST,
  v as VITE_DEV_SERVER_URL
};
