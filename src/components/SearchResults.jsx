import React, { useContext, useEffect } from 'react';
import { SearchContext } from '../context/SearchContext';
import PocketBase from 'pocketbase';
import { FaBath, FaBed, FaRuler } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const pb = new PocketBase('http://127.0.0.1:8090');

const SearchResults = ({ setSelectedProperty }) => {
  const { searchResults, loading, error, searchParams } = useContext(SearchContext);

  useEffect(() => {
    console.log('SearchResults component - searchResults:', searchResults?.length);
    console.log('SearchResults component - searchParams:', searchParams);
  }, [searchResults, searchParams]);

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

  // If no search has been performed yet (both location and propertyType are empty)
  if (!searchParams.location && searchParams.propertyType === 'All' && searchResults.length === 0 && !loading && !error) {
    return null; // Don't show anything if no search has been performed
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
      <div id="search-results" className="text-center py-10 text-red-500">
        <h2 className="text-3xl font-bold mb-8">Search Results</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!searchResults || searchResults.length === 0) {
    return (
      <div id="search-results" className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">Search Results</h2>
        <div className="text-center py-10 text-gray-500">
          No properties found matching your search criteria.
          {searchParams.location && <p className="mt-2">Location: {searchParams.location}</p>}
          {searchParams.propertyType !== 'All' && <p className="mt-2">Property Type: {searchParams.propertyType}</p>}
        </div>
      </div>
    );
  }

  return (
    <div id="search-results" className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8">Search Results</h2>
      <p className="mb-8 text-gray-600">Found {searchResults.length} properties matching your search criteria.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {searchResults.map((property) => (
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
                onError={(e) => {
                  e.target.src = 'https://placehold.co/600x400';
                  e.target.onerror = null;
                }}
              />
              {property.featured && (
                <div className="absolute top-4 left-4 bg-[#7dc138] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              )}
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

export default SearchResults; 