import React from 'react';
import Slider from 'react-slick';

interface ImageCarouselProps {
  images: File[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div>
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((file, index) => (
            <div key={index} className="p-4">
              <img
                src={URL.createObjectURL(file)}
                alt={`Uploaded ${index}`}
                className="max-w-full h-[100px] object-cover"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-600">No images uploaded</p>
      )}
    </div>
  );
};

export default ImageCarousel;
