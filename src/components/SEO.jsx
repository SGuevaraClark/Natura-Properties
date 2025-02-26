import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO component for dynamically updating meta tags
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.image - OG image URL (optional)
 * @param {string} props.type - OG type (optional, defaults to 'website')
 */
const SEO = ({ 
  title = 'Natura Properties | Real Estate in Costa Rica',
  description = 'Find your dream property in Costa Rica with Natura Properties. Explore our exclusive listings of homes, lots, and investment opportunities.',
  image = 'https://naturaproperties.com/og-image.jpg',
  type = 'website'
}) => {
  const location = useLocation();
  const url = `https://naturaproperties.com${location.pathname}`;
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const metaTags = {
      'meta[name="title"]': title,
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': description,
      'meta[property="og:image"]': image,
      'meta[property="og:url"]': url,
      'meta[property="og:type"]': type,
      'meta[property="twitter:title"]': title,
      'meta[property="twitter:description"]': description,
      'meta[property="twitter:image"]': image,
      'meta[property="twitter:url"]': url,
      'link[rel="canonical"]': url
    };
    
    // Update each meta tag
    Object.entries(metaTags).forEach(([selector, content]) => {
      const element = document.querySelector(selector);
      if (element) {
        if (selector.includes('link')) {
          element.href = content;
        } else {
          element.content = content;
        }
      }
    });
  }, [title, description, image, type, url]);
  
  // This component doesn't render anything
  return null;
};

export default SEO; 