import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';

interface ImageStripProps {
  images: File[];
  setImages: (images: File[]) => void;
}

const ImageStrip: React.FC<ImageStripProps> = ({ images, setImages }) => {

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);
    setImages(reorderedImages);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <div className="w-full h-[120] flex items-center overflow-x-auto space-x-4 bg-gray-100 p-2 rounded-lg">
      {images.length === 0 ? (
        <div className="w-full h-[100px] flex items-center justify-center text-gray-400">
          No images added yet
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="imageStrip" direction="horizontal">
            {(provided:any) => (
              <div
                className="flex gap-[16px]"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {images.map((image, index) => (
                  <Draggable key={index} draggableId={image.name} index={index}>
                    {(provided:any) => (
                      <div
                        className="relative flex-shrink-0 w-24 h-full bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`upload-${index}`}
                          className="object-cover w-full h-full"
                          style={{height:"100px"}}
                        />
                        <IconButton
                          size="small"
                          className="absolute top-1 right-1 text-red-500"
                          onClick={() => removeImage(index)}
                        >
                          <CancelIcon />
                        </IconButton>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default ImageStrip;
