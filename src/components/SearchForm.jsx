import React, { useState, useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const SearchForm = () => {
  const { searchParams, updateSearchParams, performSearch } = useContext(SearchContext);
  // Initialize with current search params from context
  const [localParams, setLocalParams] = useState({
    location: searchParams.location || "",
    propertyType: searchParams.propertyType || "All"  // Default to "All" if empty
  });
  
  // State for alert message
  const [alertMessage, setAlertMessage] = useState("");

  // Popular locations for dropdown
  const popularLocations = ['San José', 'Guanacaste', 'Puntarenas', 'Alajuela', 'Heredia', 'Cartago', 'Limón'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalParams(prev => ({ ...prev, [name]: value }));
    // Clear any existing alert when user changes selection
    setAlertMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if both location and property type are empty/default
    if ((!localParams.location || localParams.location === "") && 
        (!localParams.propertyType || localParams.propertyType === "All")) {
      setAlertMessage("Please choose a location and property type");
      return;
    }
    
    // Clear any existing alert
    setAlertMessage("");
    
    // Make sure propertyType is never empty string
    const paramsToSubmit = {
      ...localParams,
      propertyType: localParams.propertyType || "All"
    };
    
    // Update context with local values
    updateSearchParams(paramsToSubmit);
    
    // Perform the search with local values
    performSearch(paramsToSubmit);
    
    // Track search if analytics is available
    if (window.trackSearch) {
      window.trackSearch(paramsToSubmit);
    }
  };

  return (
    <div className="bg-transparent p-4 rounded-lg max-w-4xl mx-auto">
      {alertMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
          <span className="block sm:inline">{alertMessage}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label htmlFor="location" className="block text-white text-lg font-medium mb-1">
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-500" />
              </div>
              <select
                id="location"
                name="location"
                value={localParams.location}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7dc138] focus:border-transparent bg-white text-gray-800 font-medium"
              >
                <option value="">All Locations</option>
                {popularLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="propertyType" className="block text-white text-lg font-medium mb-1">
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={localParams.propertyType || "All"}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7dc138] focus:border-transparent bg-white text-gray-800 font-medium"
            >
              <option value="All">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="lot">Lot</option>
              <option value="hotel">Hotel</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="bg-[#7dc138] text-white py-2 px-6 rounded-md font-medium 
                     transition-all duration-300 hover:bg-[#6aaf25] hover:shadow-lg 
                     transform hover:-translate-y-1 active:translate-y-0 active:shadow-md
                     flex items-center justify-center"
          >
            <FaSearch className="mr-2" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm; 