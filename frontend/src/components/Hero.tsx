import React, { useState } from 'react';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ImageStrip from './ImageStrip'; 
import UploadArea from './UploadArea';

const Hero: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleUpload = (files: File[]) => {
    setImages([...images, ...files]);
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
    </div>
  );
};

export default Hero;
