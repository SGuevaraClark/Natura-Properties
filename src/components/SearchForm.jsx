import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

const SearchForm = ({ inlineForm = false }) => {
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
        }
      }, 300);
    }
  };

  // Common locations in Costa Rica that users might search for
  const commonLocations = [
    "Santa Ana", 
    "Escazú", 
    "Belén", 
    "Jacó", 
    "Nosara"
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className={`${inlineForm ? 'flex-row items-end' : 'mt-3 mx-auto flex flex-col md:flex-row items-center'}`}
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="location" className={inlineForm ? "block text-sm font-medium mb-1" : "sr-only"}>
          Location
        </label>
        <input
          type="text"
          id="location"
          placeholder="Enter location (Santa Ana, Nosara, etc)"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          list="common-locations"
        />
        <datalist id="common-locations">
          {commonLocations.map((loc, index) => (
            <option key={index} value={loc} />
          ))}
        </datalist>
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