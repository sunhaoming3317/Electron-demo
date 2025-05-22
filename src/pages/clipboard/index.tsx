import { Box, Typography } from "@mui/material";

const Clipboard = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Clipboard
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        在 Electron 中， clipboard
        模块提供了对系统剪贴板的读写能力，可以处理文本、图片、HTML
        等多种格式的数据。
      </Typography>
    </Box>
  );
};

export default Clipboard;
