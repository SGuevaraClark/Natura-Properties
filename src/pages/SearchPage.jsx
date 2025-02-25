import React, { useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import { useSearch } from '../context/SearchContext';

const SearchPage = () => {
  const { searchParams, updateSearchParams } = useSearch();

  // When the search page loads, reset search results if coming from another page
  useEffect(() => {
    // Only reset if there's no active search
    if (!searchParams.location && (!searchParams.propertyType || searchParams.propertyType === 'All')) {
      updateSearchParams({ location: '', propertyType: 'All' });
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Property</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Use our search tool to find the perfect property that matches your needs.
          Enter a location and select a property type to get started.
        </p>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Search Properties</h2>
        <SearchForm inlineForm={true} />
      </div>
      
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold mb-4">Popular Searches</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {['Santa Ana', 'Escazú', 'Belén', 'Jacó', 'Nosara'].map((location) => (
            <button
              key={location}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors"
              onClick={() => {
                updateSearchParams({ location, propertyType: 'All' });
                // Navigate to home page to see results
                window.location.href = '/';
              }}
            >
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage; 