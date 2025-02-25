import React from "react";
import { FaBath, FaBed, FaHeart, FaRuler } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useSearch } from "../context/SearchContext";

const SearchResults = ({ setSelectedProperty }) => {
  const { searchParams, searchResults, loading } = useSearch();

  if (loading) {
    return <div className="text-center py-10">Loading search results...</div>;
  }

  // If no search has been performed yet, don't render the section
  if (!searchParams.location && (!searchParams.propertyType || searchParams.propertyType === 'All')) {
    return null;
  }

  return (
    <section id="search-results" className="max-w-7xl mx-auto py-16 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">Search Results</h2>
      
      {/* Display search criteria */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Search Criteria:</h3>
        <div className="flex flex-wrap gap-4">
          {searchParams.location && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              Location: {searchParams.location}
            </div>
          )}
          {searchParams.propertyType && searchParams.propertyType !== 'All' && (
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              Type: {searchParams.propertyType}
            </div>
          )}
        </div>
      </div>
      
      {searchResults.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <p className="text-xl">No properties found matching your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl drop-shadow-lg overflow-hidden hover:drop-shadow-xl hover:scale-105 transition-all duration-300 relative group cursor-pointer"
              onClick={() => setSelectedProperty(property)}
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/600x400';
                  e.target.onerror = null;
                }}
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{property.price}</h3>
                    <h4 className="text-lg">{property.title}</h4>
                  </div>
                  <button className="text-gray-500 hover:text-red-500 transition-colors">
                    <FaHeart className="text-xl" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <FaLocationDot />
                  <p>{property.location || 'Location not specified'}</p>
                </div>
                <div className="flex justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaBed />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBath />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRuler />
                    <span>{property.m2} m2</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchResults; 