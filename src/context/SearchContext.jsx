import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: ''
  });

  const updateSearchParams = (newParams) => {
    setSearchParams(prev => ({ ...prev, ...newParams }));
  };

  return (
    <SearchContext.Provider value={{ searchParams, updateSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext); 