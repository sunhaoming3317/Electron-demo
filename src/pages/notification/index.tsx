import { Box, Link, Typography } from "@mui/material";

const Notification = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Notification
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        在 Electron 里， Notification
        模块允许应用程序向用户发送系统通知。这些通知会在操作系统的通知区域显示，能有效提示用户应用内的重要事件，如收到新消息、任务完成等。
      </Typography>

      <Typography variant="h5" gutterBottom>
        在主进程中显示通知
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        要在主进程中显示通知，需要使用 Electron 的 Notification 模块。
      </Typography>

      <Typography variant="h5" gutterBottom>
        在渲染进程中显示通知
      </Typography>
      <Typography variant="body2">
        要在渲染进程中显示通知，可直接使用 Web Notifications API。
        <Link href="/notification/web-api" underline="hover">
          例子
        </Link>
      </Typography>
    </Box>
  );
};

export default Notification;
