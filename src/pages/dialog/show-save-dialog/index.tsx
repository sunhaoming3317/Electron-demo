import Button from "@mui/material/Button";
import { Box, Paper, Typography } from "@mui/material";

const ShowSaveDialog = () => {
  const handleSave = async () => {
    try {
      const { filePath, canceled } = await window.electronApi.showSaveDialog({
        title: "保存文件",
        defaultPath: "untitled",
        filters: [
          { name: "txt文件", extensions: ["txt"] },
          { name: "所有文件", extensions: ["*"] },
        ],
      });

      if (!canceled && filePath) {
        console.log("用户选择了保存路径:", filePath);
        window.electronApi.saveFile(filePath, "Hello, World!");
      }
    } catch (error) {
      console.error("保存对话框错误:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          保存对话框
        </Typography>

        <Button
          variant="contained"
          onClick={handleSave}
          size="large"
          sx={{ mt: 2 }}
        >
          打开保存对话框
        </Button>

        <Typography variant="body1" sx={{ mt: 3 }}>
          这里仅展示该API的实现。
        </Typography>
        <Typography variant="body1" sx={{ mt: 3 }}>
          保存一份TxT文档，内容为“Hello, World!”。
        </Typography>
      </Paper>
    </Box>
  );
};

export default ShowSaveDialog;
