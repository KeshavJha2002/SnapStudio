/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UploadAreaProps {
  onUpload: (files: File[]) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onUpload }) => {
  const onDrop = (acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      toast.error('Unsupported file format!');
    } else {
      onUpload(acceptedFiles);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.tif', '.webp', '.ico'],
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`border-2 w-[90%] h-[100%] m-auto border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors flex flex-col justify-center items-center ${
          isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-400 bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <UploadFileIcon style={{ fontSize: 40, color: isDragActive ? '#3b82f6' : '#9ca3af' }} />
        {isDragActive ? (
          <p className="text-blue-400 text-center">Drop the files here...</p>
        ) : (
          <p className="text-gray-600 text-center">Drag and drop some files here, or click to select files</p>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default UploadArea;
