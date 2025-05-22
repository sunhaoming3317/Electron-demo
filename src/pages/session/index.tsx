import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
// 通过预加载脚本暴露的API访问session模块

const SessionDemo = () => {
  const [sessionInfo, setSessionInfo] = useState<{
    userAgent?: string;
    cookies?: Electron.Cookie[];
  }>();

  const [cacheKey, setCacheKey] = useState("");

  const [cacheValue, setCacheValue] = useState("");

  useEffect(() => {
    const fetchSessionData = async () => {
      const userAgent = await window.electronApi.session.getUserAgent();

      const cookies = await window.electronApi.session.getCookies({});

      setSessionInfo({
        userAgent,
        cookies,
      });
    };

    fetchSessionData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Session 模块演示
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Session 属性
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem>
            <ListItemText
              primary="User Agent"
              secondary={sessionInfo?.userAgent}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Cookies 数量"
              secondary={sessionInfo?.cookies?.length || 0}
            />
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          缓存管理
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            手动添加缓存
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="缓存键"
              value={cacheKey}
              onChange={(e) => setCacheKey(e.target.value)}
              size="small"
            />
            <TextField
              label="缓存值"
              value={cacheValue}
              onChange={(e) => setCacheValue(e.target.value)}
              size="small"
            />
            <Button
              variant="contained"
              onClick={async () => {
                const cookie = {
                  url: "http://localhost",
                  name: cacheKey,
                  value: cacheValue,
                  expirationDate: new Date().getTime() / 1000 + 3600, // 1小时后过期
                };
                await window.electronApi.session.setCookies(cookie);

                const cookies = await window.electronApi.session.getCookies({});

                setSessionInfo((prev) => ({ ...prev, cookies }));
              }}
            >
              添加缓存
            </Button>
          </Box>
          <Button
            variant="contained"
            size="small"
            sx={{ mb: 2 }}
            onClick={async () =>
              await window.electronApi.session.clearStorageData()
            }
          >
            清除缓存
          </Button>
          {sessionInfo?.cookies && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                缓存列表
              </Typography>
              <List dense>
                {sessionInfo.cookies.map((cookie, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${cookie.name} : ${cookie.value}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default SessionDemo;
