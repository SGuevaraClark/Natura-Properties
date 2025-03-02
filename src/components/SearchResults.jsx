import React, { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import { FaBath, FaBed, FaRuler } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import PropertyCarousel from './PropertyCarousel';

const SearchResults = ({ setSelectedProperty }) => {
  const { searchResults, loading, error } = useContext(SearchContext);

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

  // If there are no search results or they haven't searched yet, don't render anything
  if (!searchResults || searchResults.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">Search Results</h2>
        <div className="flex justify-center">
          <div className="animate-pulse text-gray-500">Searching properties...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">Search Results</h2>
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8">Search Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {searchResults.map((property) => (
          <div 
            key={property.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
            onClick={() => handlePropertyClick(property)}
          >
            {/* Property carousel with title included */}
            <PropertyCarousel 
              images={property.images} 
              title={property.title}
              featured={property.featured}
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

export default SearchResults; 