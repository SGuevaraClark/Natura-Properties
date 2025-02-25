import React from "react";
import { FaBath, FaBed, FaHeart, FaRuler, FaHome, FaSearch } from "react-icons/fa";
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
    <section id="search-results" className="max-w-7xl mx-auto py-16 px-4">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 rounded-full bg-[#7dc138] flex items-center justify-center mr-4">
          <FaSearch className="text-white" />
        </div>
        <h2 className="text-3xl font-bold">Search Results</h2>
      </div>
      
      {/* Display search criteria */}
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-md border-l-4 border-[#7dc138]">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <span className="text-[#7dc138] mr-2">Search Criteria</span>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[#7dc138]/50 to-transparent"></div>
        </h3>
        <div className="flex flex-wrap gap-4">
          {searchParams.location && (
            <div className="flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full">
              <FaLocationDot className="text-[#7dc138] mr-2" />
              <span>{searchParams.location}</span>
            </div>
          )}
          {searchParams.propertyType && searchParams.propertyType !== 'All' && (
            <div className="flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full">
              <FaHome className="text-[#7dc138] mr-2" />
              <span>{searchParams.propertyType}</span>
            </div>
          )}
        </div>
      </div>
      
      {searchResults.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <FaSearch className="text-gray-400 text-2xl" />
          </div>
          <p className="text-xl font-medium text-gray-600">No properties found matching your search criteria</p>
          <p className="text-gray-500 mt-2">Try adjusting your search parameters</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">Found {searchResults.length} properties matching your criteria</p>
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
                    <FaLocationDot className="text-[#7dc138]" />
                    <p>{property.location || 'Location not specified'}</p>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaBed className="text-[#7dc138]" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaBath className="text-[#7dc138]" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaRuler className="text-[#7dc138]" />
                      <span>{property.m2} m2</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default SearchResults; 