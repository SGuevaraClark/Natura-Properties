import React, { useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import { useSearch } from '../context/SearchContext';

const SearchPage = () => {
  const { performSearch } = useSearch();
  
  // Perform search when the page loads
  useEffect(() => {
    performSearch();
  }, [performSearch]);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Property</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Search Properties</h2>
        <SearchForm inlineForm={true} />
      </div>
      
      {/* The SearchResults component is rendered in App.jsx */}
    </div>
  );
};

export default SearchPage; 