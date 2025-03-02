import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LazyImage from './LazyImage';

const PropertyCarousel = ({ images, title, featured = false, onClick = () => {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // If no images or empty array, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="relative h-64 overflow-hidden">
        <LazyImage 
          src="https://placehold.co/600x400" 
          alt={title || "Property"} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {featured && (
          <div className="absolute top-4 left-4 bg-[#7dc138] text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
        
        {/* Property title at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-xl font-bold relative inline-block">
            {title}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7dc138] transition-all duration-300 group-hover:w-full"></span>
          </h3>
        </div>
      </div>
    );
  }
  
  // If only one image, show it without carousel controls
  if (images.length === 1) {
    return (
      <div className="relative h-64 overflow-hidden">
        <LazyImage 
          src={images[0]} 
          alt={title || "Property"} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {featured && (
          <div className="absolute top-4 left-4 bg-[#7dc138] text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
        
        {/* Property title at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-xl font-bold relative inline-block">
            {title}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7dc138] transition-all duration-300 group-hover:w-full"></span>
          </h3>
        </div>
      </div>
    );
  }
  
  // Handle navigation
  const goToPrevious = (e) => {
    e.stopPropagation(); // Prevent triggering parent onClick
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = (e) => {
    e.stopPropagation(); // Prevent triggering parent onClick
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  return (
    <div className="relative h-64 overflow-hidden group">
      {/* Current slide */}
      <LazyImage 
        src={images[currentIndex]} 
        alt={`${title || "Property"} - Image ${currentIndex + 1}`} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 left-4 bg-[#7dc138] text-white px-3 py-1 rounded-full text-sm font-medium z-10">
          Featured
        </div>
      )}
      
      {/* Image counter */}
      <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded-md text-xs font-medium z-10">
        {currentIndex + 1}/{images.length}
      </div>
      
      {/* Left Arrow */}
      <div 
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        onClick={goToPrevious}
      >
        <FaChevronLeft size={14} />
      </div>
      
      {/* Right Arrow */}
      <div 
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        onClick={goToNext}
      >
        <FaChevronRight size={14} />
      </div>
      
      {/* Property title at the bottom (replacing dot indicators) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-10">
        <h3 className="text-white text-xl font-bold relative inline-block">
          {title}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7dc138] transition-all duration-300 group-hover:w-full"></span>
        </h3>
      </div>
    </div>
  );
};

export default PropertyCarousel; 