import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { USBDevice } from "electron";

const UsbDeviceDemo = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<USBDevice[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    try {
      setIsScanning(true);
      setError(null);

      // 获取已连接的USB设备
      const devices = await navigator.usb.getDevices();

      console.log("已连接设备:", devices);

      if (devices.length > 0) {
        setConnectedDevice(devices);
        return;
      }

      // 请求新设备
      const device = await navigator.usb
        .requestDevice({
          filters: [],
        })
        .catch((err) => {
          if (err.name === "NotFoundError") {
            throw new Error("请选择USB设备");
          }
          throw err;
        });

      setConnectedDevice(device);
      console.log("已连接USB设备:", device);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message.includes("No device selected")
            ? "请选择USB设备2"
            : err.message
          : "未知错误",
      );
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Box>
      {error && <Typography color="error">{error}</Typography>}

      <Button variant="contained" onClick={handleScan} disabled={isScanning}>
        {isScanning ? (
          <>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            扫描中...
          </>
        ) : (
          "扫描USB设备"
        )}
      </Button>

      {connectedDevice && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">已连接的USB设备:</Typography>
          <List>
            {connectedDevice.map((device, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={device.productName || "未知USB设备"}
                  secondary={`厂商ID: ${device.vendorId}, 产品ID: ${device.productId}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default UsbDeviceDemo;
