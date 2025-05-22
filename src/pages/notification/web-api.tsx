import React from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
} from "@mui/material";

export const NotificationWebApi = () => {
  const [permission, setPermission] = React.useState(Notification.permission);

  const requestNotificationPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  };

  const showBasicNotification = async () => {
    console.log(Notification.permission);
    
    if (permission !== 'granted') {
      const result = await requestNotificationPermission();
      if (result !== 'granted') {
        alert('通知权限被拒绝');
        return;
      }
    }
    
    const a = new Notification("基础通知", {
      body: "这是一个基本的通知",
      icon: "/electron-vite.svg",
    });

    a.onshow = (e) => {
      console.log(e);
    }
  };

  const showInteractiveNotification = async () => {
    if (permission !== 'granted') {
      const result = await requestNotificationPermission();
      if (result !== 'granted') {
        alert('通知权限被拒绝');
        return;
      }
    }
    
    const notification = new Notification("交互式通知", {
      body: "点击查看详情",
      icon: "/electron-vite.svg",
    });

    notification.onclick = () => {
      alert('您点击了通知');
    };

    notification.onclose = () => {
      alert('通知已关闭');
    };

    notification.onshow = () => {
      alert('通知已显示');
    };
  };

  const [delay, setDelay] = React.useState(5);

  const showDelayedNotification = async () => {
    if (permission !== 'granted') {
      const result = await requestNotificationPermission();
      if (result !== 'granted') {
        alert('通知权限被拒绝');
        return;
      }
    }
    
    setTimeout(() => {
      new Notification("定时通知", {
        body: `这是${delay}秒后显示的通知`,
      });
    }, delay * 1000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
      Web Notifications API 功能演示
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            基础通知
          </Typography>
          <Button variant="contained" onClick={showBasicNotification}>
            显示基础通知
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            交互式通知
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={showInteractiveNotification}
          >
            显示交互式通知
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            定时通知
          </Typography>
          <TextField
            type="number"
            label="延迟时间(秒)"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            sx={{ mr: 2, width: 150 }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={showDelayedNotification}
          >
            显示定时通知
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotificationWebApi;
