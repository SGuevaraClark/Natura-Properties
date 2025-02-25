import React, { createContext, useState, useContext } from 'react';

// Create the context
export const SearchContext = createContext();

// Create the provider component
export const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: 'All'
  });

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update search params
  const updateSearchParams = (newParams) => {
    setSearchParams({ ...searchParams, ...newParams });
  };

  // Perform search
  const performSearch = async () => {
    setLoading(true);
    
    try {
      // Fetch all properties
      const res = await fetch('/api/properties');
      const properties = await res.json();
      
      // Filter properties based on search params
      const filtered = properties.filter(property => {
        // Match location (if provided)
        const locationMatch = !searchParams.location || 
          property.location.toLowerCase().includes(searchParams.location.toLowerCase());
        
        // Match property type (if not 'All')
        const typeMatch = searchParams.propertyType === 'All' || 
          property.propertyType === searchParams.propertyType;
        
        return locationMatch && typeMatch;
      });
      
      setSearchResults(filtered);
    } catch (error) {
      console.error('Error performing search:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider 
      value={{ 
        searchParams, 
        searchResults, 
        loading, 
        updateSearchParams, 
        performSearch 
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

export const useSearch = () => useContext(SearchContext); 