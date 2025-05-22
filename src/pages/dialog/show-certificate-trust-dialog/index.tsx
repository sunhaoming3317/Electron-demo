import { Button, Typography, Paper, Box } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const showCertificateTrustDialog = () => {
  const demoCertificate = {
    data: "-----BEGIN CERTIFICATE-----\nMIIF...\n-----END CERTIFICATE-----",
    issuerName: "Example CA",
    subjectName: "example.com",
    serialNumber: "00:01:02:03:04",
    validStart: Date.now() / 1000,
    validExpiry: Date.now() / 1000 + 86400,
    fingerprint: "SHA-1: A1:B2:C3:D4:E5",
    issuer: {
      commonName: "Example CA",
      country: "US",
      locality: "San Francisco",
      organizations: ["Example Org"],
      organizationUnits: ["Security"],
      state: "CA"
    },
    subject: {
      commonName: "example.com",
      country: "US",
      locality: "San Francisco",
      organizations: ["Example Inc"],
      organizationUnits: ["IT"],
      state: "CA"
    },
    issuerCert: {
      data: "-----BEGIN CERTIFICATE-----\nMIIF...\n-----END CERTIFICATE-----",
      issuerName: "Root CA",
      subjectName: "Example CA",
      serialNumber: "00:01:02:03:04",
      validStart: Date.now() / 1000,
      validExpiry: Date.now() / 1000 + 86400,
      fingerprint: "SHA-1: A1:B2:C3:D4:E5"
    }
  };

  const handleShowCertificate = async () => {
    await window.electronApi.showCertificateTrustDialog({
      certificate: demoCertificate as Electron.Certificate,
      message: "您要信任此证书吗？",
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          证书信任对话框
        </Typography>

        <Button
          variant="contained"
          startIcon={<VerifiedUserIcon />}
          onClick={handleShowCertificate}
          size="large"
          sx={{ mt: 2 }}
          color="primary"
        >
          验证证书
        </Button>

        <Typography variant="body1" sx={{ mt: 3 }}>
          这里仅展示该API的实现。
        </Typography>
      </Paper>
    </Box>
  );
};

export default showCertificateTrustDialog;
