import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import ImageStrip from './ImageStrip'; 
import UploadArea from './UploadArea';
import axios from 'axios';

const Hero: React.FC<{ session_id: string | null }> = ({ session_id }) => {
  const [images, setImages] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState('PNG');

  const handleUpload = (files: File[]) => {
    setImages([...images, ...files]);
  };

  const convertFormatHandler = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormat((event.target as HTMLInputElement).value);
  };

  const submitFormatForm = async () => {
    if (session_id) {
      const formData = new FormData();
      images.forEach((file) => formData.append('files', file));
      console.log(images)
      const response = await axios({
        method: 'post', 
        maxBodyLength: Infinity,
        url: `http://localhost:8000/api/change_format/${format.toLowerCase()}/${session_id}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData
      });
      console.log(response.data);
      handleClose();
    }
  };

  return (
    <div
      style={{ background: 'linear-gradient(135deg, #f0f4fd 0%, #d9e6ff 100%)'}} 
      className="flex flex-col items-center justify-center h-full">
      {/* Upload Group */}
      <div className="w-full h-[500px] m-auto flex flex-col mt-[100px]">
        {/* Upload Area */}
        <div className="p-4 mx-4 border-2 border-dashed border-gray-400 rounded-lg h-[100%]">
          <UploadArea onUpload={handleUpload} />
        </div>
        {/* Image Strip */}
        <div className="p-4">
          <ImageStrip images={images} setImages={setImages} />
        </div>
      </div>
      {/* Button Group */}
      <div className="flex space-x-4 justify-center items-center w-full pb-[16px] pt-[6px]">
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          disabled={images.length === 0}
          className={`px-6 py-3 text-lg font-semibold ${
            images.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={convertFormatHandler}
        >
          Convert Format
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={images.length === 0}
          className={`px-6 py-3 text-lg font-semibold ${
            images.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Change Background
        </Button>
      </div>
      
      {/* Popup for format selection */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Select Format
          <IconButton aria-label="close" onClick={handleClose} style={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
        <div className="flex flex-col items-start space-y-4 p-4 bg-gray-50 rounded-lg shadow-sm">
  <p className="text-gray-700 text-lg font-semibold mb-2">
    Mark the format in which you want to convert to:
  </p>
  <RadioGroup value={format} onChange={handleFormatChange} className="space-y-3">
    <FormControlLabel 
      value="PNG" 
      control={<Radio />} 
      label={
        <div className="flex flex-col">
          <span className="font-medium">PNG</span>
          <span className="text-sm text-gray-500">Ideal for images with transparency or requiring high quality with lossless compression, like logos or graphics.</span>
        </div>
      } 
      className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:bg-gray-100 transition-colors"
    />
    <FormControlLabel 
      value="JPG" 
      control={<Radio />} 
      label={
        <div className="flex flex-col">
          <span className="font-medium">JPG</span>
          <span className="text-sm text-gray-500">Best for photographs and images with complex color gradients due to good compression with minimal quality loss.</span>
        </div>
      } 
      className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:bg-gray-100 transition-colors"
    />
    <FormControlLabel 
      value="BMP" 
      control={<Radio />} 
      label={
        <div className="flex flex-col">
          <span className="font-medium">BMP</span>
          <span className="text-sm text-gray-500">Suitable for high-quality images in uncompressed format, but large file size.</span>
        </div>
      } 
      className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:bg-gray-100 transition-colors"
    />
    <FormControlLabel 
      value="WEBP" 
      control={<Radio />} 
      label={
        <div className="flex flex-col">
          <span className="font-medium">WEBP</span>
          <span className="text-sm text-gray-500">Optimal for web use.</span>
        </div>
      } 
      className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:bg-gray-100 transition-colors"
    />
    <FormControlLabel 
      value="ICO" 
      control={<Radio />} 
      label={
        <div className="flex flex-col">
          <span className="font-medium">ICO</span>
          <span className="text-sm text-gray-500">Best for icons, especially in Windows applications.</span>
        </div>
      } 
      className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:bg-gray-100 transition-colors"
    />
  </RadioGroup>
</div>

        </DialogContent>
        <DialogActions>
          <Button onClick={submitFormatForm} color="primary" variant="contained" endIcon={<ArrowForwardIcon />}>
            Convert
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Hero;
