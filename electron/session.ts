import { BrowserWindow, ipcMain, session } from "electron";

const setupSessionHandlers = (win: BrowserWindow) => {
  const ses = session.fromPartition("persist:eli");

  let grantedDeviceThroughPermHandler: Electron.USBDevice | undefined;

  let selectBluetoothCallback: (deviceId: string) => void;

  let bluetoothPinCallback: (response: Electron.Response) => void;

  ses.on("select-usb-device", (event, details, callback) => {
    console.log("select-usb-device", details);

    ses.on("usb-device-added", (_, device) => {
      console.log("usb-device-added", device);
    });

    ses.on("usb-device-removed", (_, device) => {
      console.log("usb-device-removed", device);
    });

    event.preventDefault();

    if (details.deviceList && details.deviceList.length > 0) {
      const deviceToReturn = details.deviceList.find((device) => {
        return (
          !grantedDeviceThroughPermHandler ||
          device.deviceId !== grantedDeviceThroughPermHandler?.deviceId
        );
      });

      if (deviceToReturn) {
        callback(deviceToReturn.deviceId);
      } else {
        callback();
      }
    }
  });

  ses.setPermissionCheckHandler((_, permission) => {
    if (permission === "usb") {
      return true;
    }

    return false;
  });

  ses.setDevicePermissionHandler((details) => {
    if (details.deviceType === "usb") {
      grantedDeviceThroughPermHandler = details.device as Electron.USBDevice;
      return true;
    }
    return false;
  });

  ses.setUSBProtectedClassesHandler((details) => {
    console.log("setUSBProtectedClassesHandler", details);

    return details.protectedClasses.filter((usbClass) => {
      return usbClass.indexOf("audio") === -1;
    });
  });

  win.webContents.on(
    "select-bluetooth-device",
    (event, deviceList, callback) => {
      event.preventDefault();
      selectBluetoothCallback = callback;
      const result = deviceList.find((device) => {
        return device.deviceName === "test";
      });
      if (result) {
        callback(result.deviceId);
      }
    },
  );

  ipcMain.on('cancel-bluetooth-request', () => {
    selectBluetoothCallback('')
  })

  // 监听配对结果
  ipcMain.on('bluetooth-pairing-response', (_, response) => {
    bluetoothPinCallback(response)
  })

  ses.setBluetoothPairingHandler((details, callback) => {
    bluetoothPinCallback = callback
    // 向渲染进程发送消息，请求配对操作
    win.webContents.send('bluetooth-pairing-request', details)
  })

  ipcMain.handle("session-get-user-agent", () => {
    return ses.getUserAgent();
  });

  ipcMain.handle("session-clear-cache", async () => {
    await ses.clearCache();
    return true;
  });

  ipcMain.handle("session-clear-storage-data", async () => {
    await ses.clearStorageData();
    return true;
  });

  ipcMain.handle(
    "session-set-cookies",
    (_, details: Electron.CookiesSetDetails) => {
      return ses.cookies.set(details);
    },
  );

  ipcMain.handle(
    "session-get-cookies",
    (_, details: Electron.CookiesGetFilter) => {
      return ses.cookies.get(details);
    },
  );
};

export default setupSessionHandlers;
