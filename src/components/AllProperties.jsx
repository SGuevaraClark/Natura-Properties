import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { FaBath, FaBed, FaRuler } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import PropertyCarousel from './PropertyCarousel';

const pb = new PocketBase(import.meta.env.VITE_API_URL);

const AllProperties = ({ setSelectedProperty }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const records = await pb.collection('properties').getList(1, 100, {
          sort: '-created',
          $autoCancel: false
        });
        
        if (records && records.items) {
          const propertiesWithImages = records.items.map(property => {
            // Create an array of image URLs, starting with the main image
            let allImages = [];
            
            // Add main image if it exists
            if (property.image) {
              allImages.push(pb.files.getURL(property, property.image));
            }
            
            // Add additional images if they exist
            if (property.images && Array.isArray(property.images)) {
              const additionalImages = property.images.map(img => pb.files.getURL(property, img));
              allImages = [...allImages, ...additionalImages];
            }
            
            // If no images at all, use placeholder
            if (allImages.length === 0) {
              allImages = ['https://placehold.co/600x400'];
            }
            
            return {
              id: property.id,
              title: property.title || 'No Title',
              price: property.price || 'Price not set',
              location: property.location || 'Location not specified',
              beds: property.beds || 0,
              baths: property.baths || 0,
              m2: property.m2 || 0,
              featured: property.featured || false,
              description: property.description || 'No description',
              propertyType: property.propertyType || '',
              type: property.type || 'Not specified',
              // Keep the main image for compatibility
              image: property.image 
                ? pb.files.getURL(property, property.image) 
                : 'https://placehold.co/600x400',
              // Store all images for the carousel
              images: allImages
            };
          });
          
          setProperties(propertiesWithImages);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    // Track property view if analytics is available
    if (window.trackPropertyView) {
      window.trackPropertyView(property);
    }
  };

  // Function to format price correctly (remove $ if it already exists in the string)
  const formatPrice = (price) => {
    if (typeof price === 'string' && price.startsWith('$')) {
      // If price already has a dollar sign, just return it formatted
      return price;
    } else {
      // Otherwise add the dollar sign
      return `$${price.toLocaleString()}`;
    }
  };

  // Function to format property type with proper capitalization
  const formatPropertyType = (type) => {
    if (!type) return '';
    
    // Capitalize first letter of each word
    return type.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">All Properties</h2>
        <div className="flex justify-center">
          <div className="animate-pulse text-gray-500">Loading properties...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (properties.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">All Properties</h2>
        <div className="text-center py-10 text-gray-500">No properties found.</div>
      </div>
    );
  }

  // Filter out featured properties as they're already shown in the FeaturedProperties component
  const regularProperties = properties.filter(property => !property.featured);

  if (regularProperties.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8">All Properties</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularProperties.map((property) => (
          <div 
            key={property.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
            onClick={() => handlePropertyClick(property)}
          >
            {/* Property carousel with title included */}
            <PropertyCarousel 
              images={property.images} 
              title={property.title}
            />
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-[#7dc138]">{formatPrice(property.price)}</span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm font-medium">
                  {formatPropertyType(property.propertyType)}
                </span>
              </div>
              
              <div className="flex items-center mb-4 text-gray-600">
                <FaLocationDot className="mr-2 text-[#7dc138]" />
                <span className="hover:underline">{property.location}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <div className="flex items-center">
                  <FaBed className="mr-2 text-[#7dc138]" />
                  <span>{property.beds} Beds</span>
                </div>
                <div className="flex items-center">
                  <FaBath className="mr-2 text-[#7dc138]" />
                  <span>{property.baths} Baths</span>
                </div>
                <div className="flex items-center">
                  <FaRuler className="mr-2 text-[#7dc138]" />
                  <span>{property.m2} m²</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;