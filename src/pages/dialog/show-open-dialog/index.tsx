import { Button, Typography, Paper, Box } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

const ShowOpenDialog = () => {
  const handleOpenDialog = async () => {
    const result = await window.electronApi.showOpenDialog({
      properties: ["openFile", "multiSelections"],
    });

    if (!result.canceled) {
      console.log("Selected files:", result.filePaths);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          选择对话框
        </Typography>

        <Button
          variant="contained"
          startIcon={<FolderOpenIcon />}
          onClick={handleOpenDialog}
          size="large"
          sx={{ mt: 2 }}
        >
          选择文件
        </Button>

        <Typography variant="body1" sx={{ mt: 3 }}>
          这里仅展示该API的实现。
        </Typography>
      </Paper>
    </Box>
  );
};

export default ShowOpenDialog;
