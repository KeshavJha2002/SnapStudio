import React from 'react';
import Button from '@mui/material/Button';

const ToolsSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <Button variant="contained">Background</Button>
      <Button variant="contained">Effects</Button>
      <Button variant="contained">AI Enhancer</Button>
      <Button variant="contained">Add Filters</Button>
      <Button variant="contained" color="success">Download</Button>
    </div>
  );
};

export default ToolsSection;
