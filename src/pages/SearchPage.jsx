import React, { useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import { useSearch } from '../context/SearchContext';
import { FaBath, FaBed, FaHeart, FaRuler } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const SearchPage = () => {
  const { searchParams, searchResults, loading, performSearch } = useSearch();

  // Display properties based on search results
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Property</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <SearchForm />
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
        
        {loading ? (
          <div className="text-center py-10">Loading properties...</div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl">No properties found matching your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl drop-shadow-lg overflow-hidden hover:drop-shadow-xl transition-all duration-300"
              >
                <img
                  src={property.image || 'https://placehold.co/600x400'}
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
                    <p>{property.location}</p>
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
      </div>
    </div>
  );
};

export default SearchPage; 