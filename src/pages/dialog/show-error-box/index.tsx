import { Button, Typography, Paper, Box } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const showErrorBox = () => {
  const handleShowError =  () => {
     window.electronApi.showErrorBox({
      title: "错误提示",
      content: "这是一个错误消息示例"
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          错误提示对话框
        </Typography>

        <Button
          variant="contained"
          startIcon={<ErrorIcon />}
          onClick={handleShowError}
          size="large"
          sx={{ mt: 2 }}
          color="error"
        >
          显示错误
        </Button>

        <Typography variant="body1" sx={{ mt: 3 }}>
          这里仅展示该API的实现。
        </Typography>
      </Paper>
    </Box>
  );
}

export default showErrorBox;