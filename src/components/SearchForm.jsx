import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { FaLocationDot } from "react-icons/fa6";

const SearchForm = ({ 
  inlineForm = false, 
  heroStyle = false, 
  showLocationButtons = false,
  className = ""
}) => {
  const { updateSearchParams, searchParams } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All');

  // Sync form state with context when searchParams changes
  useEffect(() => {
    setSearchLocation(searchParams.location || '');
    setPropertyType(searchParams.propertyType || 'All');
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Search form submitted:', { searchLocation, propertyType });
    
    // Update search params in context
    updateSearchParams({ 
      location: searchLocation, 
      propertyType: propertyType 
    });
    
    // Scroll to search results section if on home page
    if (location.pathname === '/') {
      setTimeout(() => {
        const searchResultsSection = document.getElementById('search-results');
        if (searchResultsSection) {
          searchResultsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.error('Search results section not found');
        }
      }, 100);
    } else {
      // Navigate to home page if not already there
      navigate('/');
      // Need to wait for navigation to complete before scrolling
      setTimeout(() => {
        const searchResultsSection = document.getElementById('search-results');
        if (searchResultsSection) {
          searchResultsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.error('Search results section not found after navigation');
        }
      }, 300);
    }
  };

  const handleLocationClick = (locationName) => {
    setSearchLocation(locationName);
    
    // Update search params in context
    updateSearchParams({ 
      location: locationName, 
      propertyType: propertyType 
    });
    
    // Scroll to search results section
    setTimeout(() => {
      const searchResultsSection = document.getElementById('search-results');
      if (searchResultsSection) {
        searchResultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Common locations in Costa Rica that users might search for
  const commonLocations = [
    "All Locations",
    "Santa Ana", 
    "Escazú", 
    "Belén", 
    "Nosara",
    "San José",
    "Guanacaste",
    "Puntarenas"
  ];

  // Hero style form (for home page hero section)
  if (heroStyle) {
    return (
      <div className={`${className}`}>
        <div className="flex flex-col md:flex-row gap-3">
          <select
            className="flex-1 px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7dc138]"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {commonLocations.slice(1).map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>

          <select 
            className="px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7dc138]"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="lot">Lots</option>
            <option value="house">Houses</option>
            <option value="apartment">Apartments</option>
            <option value="hotel">Hotels</option>
          </select>

          <button 
            className="bg-[#7dc138] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7dc138]/90 transition-colors"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>

        {showLocationButtons && (
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div 
              className="flex flex-col p-3 items-center bg-slate-50/20 rounded-lg transition-transform hover:scale-105 cursor-pointer"
              onClick={() => handleLocationClick("San José")}
            >
              <FaLocationDot className="text-[#7dc138] mb-2" />
              <span className="font-semibold text-white">San José</span>
            </div>

            <div 
              className="flex flex-col p-3 items-center bg-slate-50/20 rounded-lg transition-transform hover:scale-105 cursor-pointer"
              onClick={() => handleLocationClick("Guanacaste")}
            >
              <FaLocationDot className="text-[#7dc138] mb-2" />
              <span className="font-semibold text-white">Guanacaste</span>
            </div>

            <div 
              className="flex flex-col p-3 items-center bg-slate-50/20 rounded-lg transition-transform hover:scale-105 cursor-pointer"
              onClick={() => handleLocationClick("Puntarenas")}
            >
              <FaLocationDot className="text-[#7dc138] mb-2" />
              <span className="font-semibold text-white">Puntarenas</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Standard form (for other parts of the app)
  return (
    <form
      onSubmit={handleSubmit}
      className={`${inlineForm ? 'flex-row items-end' : 'mt-3 mx-auto flex flex-col md:flex-row items-center'} ${className}`}
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="location" className={inlineForm ? "block text-sm font-medium mb-1" : "sr-only"}>
          Location
        </label>
        <select
          id="location"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {commonLocations.slice(1).map((loc, index) => (
            <option key={index} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-2/5 md:px-2">
        <label htmlFor="propertyType" className={inlineForm ? "block text-sm font-medium mb-1" : "sr-only"}>
          Property Type
        </label>
        <select
          id="propertyType"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="All">All Properties</option>
          <option value="house">House</option>
          <option value="lot">Lot</option>
          <option value="apartment">Apartment</option>
          <option value="hotel">Hotel</option>
        </select>
      </div>
      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm; 