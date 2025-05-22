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

const BluetoothDeviceDemo = () => {
  const [isScanning] = useState(false);
  const [connectedDevice] = useState<BluetoothDevice[]>([]);
  const [error] = useState<string | null>(null);

  const handleScan = async () => {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    })

    console.log(device);
    
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
          "扫描蓝牙设备"
        )}
      </Button>

      {connectedDevice && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">已连接的蓝牙设备:</Typography>
          <List>
            {connectedDevice.map((device, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={device.name || "未知USB设备"}
                  secondary={`产品ID: ${device.id}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default BluetoothDeviceDemo;
