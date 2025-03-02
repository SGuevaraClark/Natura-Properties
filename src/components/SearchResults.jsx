import React, { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import { FaBath, FaBed, FaRuler } from "react-icons/fa";
import { FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import PropertyCarousel from './PropertyCarousel';

const SearchResults = ({ setSelectedProperty }) => {
  const { searchResults, loading, error, hasSearched } = useContext(SearchContext);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    // Track property view if analytics is available
    if (window.trackPropertyView) {
      window.trackPropertyView(property);
    }
  };

  // Function to open WhatsApp with a predefined message
  const openWhatsApp = () => {
    const message = "Hello, I'm looking for a property in Costa Rica. Can you help me?";
    const whatsappUrl = `https://wa.me/50688767574?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
  if (!hasSearched) {
    return <div id="search-results"></div>; // Empty div with ID for scrolling
  }

  if (loading) {
    return (
      <div id="search-results" className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">Search Results</h2>
        <div className="flex justify-center">
          <div className="animate-pulse text-gray-500">Searching properties...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="search-results" className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">Search Results</h2>
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  // Display a helpful message when no results are found
  if (!searchResults || searchResults.length === 0) {
    return (
      <div id="search-results" className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">Search Results</h2>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">No properties found</h3>
          <p className="text-gray-600 mb-6">
            We're working hard to upload all our properties to our website. 
            Meanwhile, our agents can help you find exactly what you're looking for.
          </p>
          <button 
            onClick={openWhatsApp}
            className="inline-flex items-center px-6 py-3 bg-[#25D366] text-white font-medium rounded-md shadow-md hover:bg-[#20BD5C] transition-all duration-300 hover:shadow-lg"
          >
            <FaWhatsapp className="mr-2 text-xl" />
            Contact us on WhatsApp
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="search-results" className="max-w-7xl mx-auto py-16 px-4">
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