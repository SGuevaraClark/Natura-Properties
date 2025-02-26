import React, { useState, useEffect, useRef } from 'react';
import { handleImageError } from '../utils/imageUtils';

/**
 * LazyImage component that loads images only when they enter the viewport
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {string} props.className - CSS classes for the image
 * @param {string} props.placeholderSrc - Placeholder image URL (optional)
 * @param {Function} props.onLoad - Callback function when image loads (optional)
 * @param {Object} props.style - Additional inline styles (optional)
 */
const LazyImage = ({
  src,
  alt,
  className,
  placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=',
  onLoad,
  style,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Create a new IntersectionObserver
    observerRef.current = new IntersectionObserver((entries) => {
      // Check if the image is intersecting with the viewport
      if (entries[0].isIntersecting) {
        // Start loading the actual image
        setCurrentSrc(src);
        // Disconnect the observer once the image starts loading
        observerRef.current.disconnect();
      }
    }, {
      // Start loading when the image is 200px from entering the viewport
      rootMargin: '200px 0px',
      threshold: 0.01
    });

    // Start observing the image element
    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-50'} transition-opacity duration-300`}
      onLoad={handleLoad}
      onError={(e) => handleImageError(e)}
      loading="lazy"
      style={{
        ...style,
        backgroundColor: isLoaded ? 'transparent' : '#f3f4f6'
      }}
      {...props}
    />
  );
};

export default LazyImage; 