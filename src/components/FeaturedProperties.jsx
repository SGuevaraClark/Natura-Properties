import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { FaBath, FaBed, FaHeart, FaRuler } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const pb = new PocketBase('http://127.0.0.1:8090');

const FeaturedProperties = ({ setSelectedProperty }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        // Fetch up to 6 featured properties instead of 3
        const records = await pb.collection('properties').getList(1, 6, {
          filter: 'featured = true',
          sort: '-created',
          $autoCancel: false
        });
        
        if (records && records.items) {
          const propertiesWithImages = records.items.map(property => ({
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
            image: property.image 
              ? pb.files.getURL(property, property.image) 
              : 'https://placehold.co/600x400',
            images: property.images && Array.isArray(property.images)
              ? property.images.map(img => pb.files.getURL(property, img))
              : []
          }));
          
          setProperties(propertiesWithImages);
        }
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
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
        <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
        <div className="flex justify-center">
          <div className="animate-pulse text-gray-500">Loading featured properties...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (properties.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div 
            key={property.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
            onClick={() => handlePropertyClick(property)}
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 bg-[#7dc138] text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white text-xl font-bold relative inline-block">
                  {property.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7dc138] transition-all duration-300 group-hover:w-full"></span>
                </h3>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-[#7dc138]">{formatPrice(property.price)}</span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm font-medium">
                  {formatPropertyType(property.propertyType)}
                </span>
              </div>
              
              <div className="flex items-center mb-4 text-gray-600">
                <FaLocationDot className="mr-2 text-[#7dc138]" />
                <span>{property.location}</span>
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

export default FeaturedProperties;
