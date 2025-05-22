import { Box, Link, Typography } from "@mui/material";

const DeviceAccess = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        设备访问
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Electron 也提供了通过 web API
        访问设备硬件的方法。 大部分接口就像在浏览器调用的 API
        一样，但有一些差异需要考虑到。
        Electron和浏览器之间的主要区别是请求访问设备时发生的情况。
        在浏览器中，用户可以在弹出窗口中允许访问单独的设备。 在 Electron
        API中，提供了可供开发者自动选择设备或提示用户通过开发者创建的接口选择设备。
      </Typography>
      <Typography variant="body2">
        体验一下Electron的设备访问功能：
        <Link href="/device-access/demo" underline="hover">
          例子
        </Link>
      </Typography>
    </Box>
  );
};

export default DeviceAccess;
