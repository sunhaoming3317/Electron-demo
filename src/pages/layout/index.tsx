import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type MenuItem = {
  title: string;
  key: string;
  url: string;
  children?: MenuItem[];
};

const Layout = () => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const navigator = useNavigate();

  const items: MenuItem[] = [
    {
      title: "对话框【Dialog】",
      key: "dialog",
      url: "/dialog",
      children: [
        { title: "选择对话框", key: "dialog-1", url: "/dialog/1" },
        { title: "保存对话框", key: "dialog-2", url: "/dialog/2" },
        { title: "消息对话框", key: "dialog-3", url: "/dialog/3" },
        { title: "错误提示对话框", key: "dialog-4", url: "/dialog/4" },
        // { title: "证书信任对话框", key: "dialog-5", url: "/dialog/5" }, // 这个API暂时没有实现
      ],
    },
    {
      title: "通知【Notification】",
      key: "notification",
      url: "/notification",
      children: [
        {
          title: "Web Notifications API",
          key: "notification-web-api",
          url: "/notification/web-api",
        },
      ],
    },
    {
      title: "剪贴板【Clipboard】",
      key: "clipboard",
      url: "/clipboard",
      children: [
        {
          title: "demo演示",
          key: "clipboard-demo",
          url: "/clipboard/demo",
        },
      ],
    },
    {
      title: "Session Demo",
      key: "session-demo",
      url: "/session",
    },
    {
      title: "设备访问",
      key: "device-access",
      url: "/device-access",
      children: [
        {
          title: "demo演示",
          key: "device-access-demo",
          url: "/device-access/demo",
        },
      ],
    },
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.children) {
      setOpenKeys((prev) =>
        prev.includes(item.key)
          ? prev.filter((k) => k !== item.key)
          : [...prev, item.key],
      );
    }
    navigator(item.url);
  };

  const renderMenu = (items: MenuItem[]) => {
    return items.map((item) => (
      <div key={item.key}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick(item)}>
            <ListItemText primary={item.title} />
            {item.children &&
              (openKeys.includes(item.key) ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        {item.children && (
          <Collapse
            in={openKeys.includes(item.key)}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding sx={{ pl: 2 }}>
              {renderMenu(item.children)}
            </List>
          </Collapse>
        )}
      </div>
    ));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <List>{renderMenu(items)}</List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
