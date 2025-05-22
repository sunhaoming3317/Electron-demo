import {
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import UsbDeviceDemo from "./components/usb-device";
import BluetoothDeviceDemo from "./components/bluetooth-device";

const DeviceAccessDemo = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            访问USB设备
          </Typography>
          <UsbDeviceDemo />
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            访问蓝牙设备
          </Typography>
          <BluetoothDeviceDemo />
        </CardContent>
      </Card>
    </Box>
  );
};

export default DeviceAccessDemo;
