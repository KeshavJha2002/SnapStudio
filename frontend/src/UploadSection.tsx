import React from 'react';
import Button from '@mui/material/Button';

const UploadSection: React.FC = () => {
  return (
    <>
      <div className="border-dashed border-4 border-yellow-500 h-64 flex justify-center items-center">
        <p className="text-yellow-500 text-lg">Drop your image here</p>
      </div>
      <div className="flex justify-around mt-4">
        <Button variant="contained" color="primary">
          Convert
        </Button>
        <Button variant="contained" color="secondary">
          Change Background
        </Button>
    </div>
    </>
  );
};

export default UploadSection;
