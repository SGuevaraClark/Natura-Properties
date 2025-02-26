import React, { useState, useEffect } from "react";
import {
  FaBath,
  FaBed,
  FaChevronLeft,
  FaChevronRight,
  FaRuler,
  FaWhatsapp,
} from "react-icons/fa";
import { FaLocationDot, FaX } from "react-icons/fa6";
import { handleImageError } from "../utils/imageUtils";
import SEO from "./SEO";
import LazyImage from './LazyImage';
import { trackPropertyView, trackWhatsAppClick } from './Analytics';

const PropertyModal = ({ onClose, properties }) => {
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!properties || properties.length === 0) {
    return null;
  }

  const currentProperty = properties[currentPropertyIndex];
  const images = currentProperty.images && currentProperty.images.length > 0 
    ? currentProperty.images 
    : [currentProperty.image || 'https://placehold.co/600x400'];

  // Track property view when modal opens
  useEffect(() => {
    if (currentProperty) {
      trackPropertyView(currentProperty);
    }
  }, [currentProperty]);

  const phoneNumber = "50688664708";
  const message = `Hello, I'm interested in the property: ${currentProperty.title} - ${currentProperty.location}. Price: ${currentProperty.price}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(currentProperty);
  };

  // Create SEO title and description for the property
  const seoTitle = `${currentProperty.title} | Natura Properties`;
  const seoDescription = `${currentProperty.beds} bed, ${currentProperty.baths} bath, ${currentProperty.m2}m² property in ${currentProperty.location}. ${currentProperty.price}. ${currentProperty.description?.substring(0, 100)}...`;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* Dynamic SEO for the current property */}
      <SEO 
        title={seoTitle}
        description={seoDescription}
        image={images[0]}
        type="article"
      />
      
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full md:max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[300px] md:h-[400px]">
          <LazyImage
            src={images[currentImageIndex]}
            alt={currentProperty.title || "Property image"}
            className="w-full h-full object-cover"
          />

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <FaChevronRight size={20} />
          </button>

          <button
            onClick={onClose}
            className="absolute text-white top-10 right-5 -translate-y-1/2 bg-red-500 p-2 rounded-full"
          >
            <FaX size={20} />
          </button>

          <div className="absolute bottom-4 right-4">
            <div className="bg-black/50 text-white px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <FaLocationDot className="text-[#7dc138]" />
            <span>{currentProperty.location}</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentProperty.title}
          </h2>
          <div className="text-3xl font-bold text-[#7dc138] mb-4">
            {currentProperty.price}
          </div>

          <div className="flex gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <FaBed className="text-[#7dc138]" />
              <span className="text-gray-600">{currentProperty.beds} Beds</span>
            </div>

            <div className="flex items-center gap-2">
              <FaBath className="text-[#7dc138]" />
              <span className="text-gray-600">
                {currentProperty.baths} Baths
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaRuler className="text-[#7dc138]" />
              <span className="text-gray-600">{currentProperty.m2} m²</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{currentProperty.description}</p>
          </div>

          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="w-full bg-[#7dc138] text-white py-3 rounded-2xl font-semibold hover:bg-[#7dc138]/90 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 transform"
          >
            <FaWhatsapp className="text-xl" />
            Contact Agent
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
