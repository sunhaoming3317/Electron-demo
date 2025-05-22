import Button from "@mui/material/Button";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";

const ShowMessageBox = () => {
  const [index, setIndex] = useState<number>(); // 用于控制按钮的状态

  const handleOpenMessageBox = async () => {
    try {
      const { response } = await window.electronApi.showMessageBox({
        type: "info", // 消息框类型，可选：info, error, warning, question
        title: "消息框标题",
        message: "这是一个消息框",
        buttons: ["确定", "取消"], // 按钮文本数组，可选
        cancelId : 1, // 取消按钮的索引，可选，默认为 0
      })
      if (response === 0) { // response: 点击的按钮的索引。
        console.log("用户选择:", response); // 0 表示用户点击了第一个按钮
        setIndex(response);
      } else {
        console.log("用户取消了操作");
      }
      
      setIndex(response);

    } catch (error) {
      console.error("消息框错误:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          消息框
        </Typography>

        <Button
          variant="contained"
          onClick={handleOpenMessageBox}
          size="large"
          sx={{ mt: 2 }}
        >
          打开消息框
        </Button>

        <Typography variant="body1" sx={{ mt: 3 }}>
          这里仅展示该API的实现。
        </Typography>
        {index !== undefined && <Typography variant="body1" sx={{ mt: 3, color: "red" }}>
          {index === 0 ? "用户点击了确定" : "用户点击了取消"}
        </Typography>}
      </Paper>
    </Box>
  );
};

export default ShowMessageBox;
