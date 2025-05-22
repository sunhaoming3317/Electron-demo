import React from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
} from "@mui/material";
export const ClipboardDemo = () => {
  // 文本操作状态
  const [textInput, setTextInput] = React.useState("");
  const [copiedText, setCopiedText] = React.useState("");
  
  // HTML操作状态
  const [htmlInput, setHtmlInput] = React.useState("");
  const [copiedHtml, setCopiedHtml] = React.useState("");
  
  // 图片操作状态
  const [imageData, setImageData] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState("");

  // 文本操作
  const handleCopyText = () => {
    window.electronApi.clipboard.writeText(textInput);
  };

  const handlePasteText = async () => {
    const text = await window.electronApi.clipboard.readText();
    setCopiedText(text);
  };

  // HTML操作
  const handleCopyHtml = () => {
    window.electronApi.clipboard.writeHTML(`<b>${htmlInput}</b>`);
  };

  const handlePasteHtml = async () => {
    const html = await window.electronApi.clipboard.readHTML();
    setCopiedHtml(html);
  };

  // 图片上传处理
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 图片操作
  const handleCopyImage = async () => {
    if (imagePreview) {
      await window.electronApi.clipboard.writeImage(selectedImage?.path || "");
    }
  };

  const handlePasteImage = async () => {
    const image = await window.electronApi.clipboard.readImage();
    setImageData(image.toDataURL());
  };

  // 清空剪贴板
  const handleClearClipboard = () => {
    window.electronApi.clipboard.clear();
    setCopiedText("");
    setCopiedHtml("");
    setImageData("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        剪贴板功能演示
      </Typography>
      
      {/* 文本操作卡片 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>文本操作</Typography>
          <TextField
            fullWidth
            label="输入要复制的文本"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={handleCopyText}>
              复制文本
            </Button>
            <Button variant="outlined" onClick={handlePasteText}>
              粘贴文本
            </Button>
          </Box>
          {copiedText && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">粘贴的文本内容:</Typography>
              <Typography>{copiedText}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
      
      {/* HTML操作卡片 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>HTML操作</Typography>
          <TextField
            fullWidth
            label="输入要复制的HTML"
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={handleCopyHtml}>
              复制HTML
            </Button>
            <Button variant="outlined" onClick={handlePasteHtml}>
              粘贴HTML
            </Button>
          </Box>
          {copiedHtml && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">粘贴的HTML内容:</Typography>
              <div dangerouslySetInnerHTML={{ __html: copiedHtml }} />
            </Box>
          )}
        </CardContent>
      </Card>
      
      {/* 图片操作卡片 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>图片操作</Typography>
          <Box sx={{ display: "flex", flexDirection: 'column', gap: 2 }}>
            <Button variant="contained" component="label">
              上传图片
              <input 
                type="file" 
                hidden 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
            
            {imagePreview && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">已上传图片:</Typography>
                <img src={imagePreview} alt="上传的图片" style={{ maxWidth: '100%', maxHeight: '200px' }} />
              </Box>
            )}
            
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button 
                variant="contained" 
                onClick={handleCopyImage}
                disabled={!selectedImage}
              >
                复制图片
              </Button>
              <Button variant="outlined" onClick={handlePasteImage}>
                粘贴图片
              </Button>
            </Box>
          </Box>
          {imageData && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">粘贴的图片:</Typography>
              <img src={imageData} alt="粘贴的图片" style={{ maxWidth: '100%' }} />
            </Box>
          )}
        </CardContent>
      </Card>
      
      {/* 剪贴板管理卡片 */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>剪贴板管理</Typography>
          <Button variant="outlined" color="error" onClick={handleClearClipboard}>
            清空剪贴板
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClipboardDemo;
