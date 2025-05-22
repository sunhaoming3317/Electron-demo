import { ipcMain, Notification } from "electron";

export const notificationHandlers = () => {
  ipcMain.handle(
    "show-notification",
    (_, options: Electron.NotificationConstructorOptions) => {
      try {
        const notification = new Notification({...options});

        // 添加事件监听
        notification.on("click", () => {
          console.log("通知被点击");
        });

        notification.show();
        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    },
  );
};
