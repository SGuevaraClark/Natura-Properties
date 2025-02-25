import React, { createContext, useState, useContext, useEffect } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

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
  const [allProperties, setAllProperties] = useState([]);

  // Fetch all properties once when the component mounts
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const records = await pb.collection('properties').getList(1, 100, {
          sort: '-created',
          $autoCancel: false
        });
        
        if (records && records.items) {
          const propertiesWithImages = records.items.map(property => ({
            id: property.id,
            title: property.title || 'No Title',
            price: property.price || 'Price not set',
            location: property.location || 'Location not set',
            beds: property.beds || 0,
            baths: property.baths || 0,
            m2: property.m2 || 0,
            featured: property.featured || false,
            description: property.description || 'No description',
            propertyType: property.propertyType || '',
            type: property.type || 'Not specified',
            image: property.image 
              ? pb.files.getURL(property, property.image) 
              : 'https://placehold.co/600x400',
            images: property.images && Array.isArray(property.images)
              ? property.images.map(img => pb.files.getURL(property, img))
              : []
          }));
          
          setAllProperties(propertiesWithImages);
        }
      } catch (error) {
        console.error('Error fetching all properties:', error);
      }
    };

    fetchAllProperties();
  }, []);

  // Update search params
  const updateSearchParams = (newParams) => {
    setSearchParams({ ...searchParams, ...newParams });
    performSearch({ ...searchParams, ...newParams });
  };

  // Perform search using the cached properties
  const performSearch = (params = searchParams) => {
    setLoading(true);
    
    try {
      // Filter properties based on search params
      const filtered = allProperties.filter(property => {
        // Match location (if provided)
        const locationMatch = !params.location || 
          property.location.toLowerCase().includes(params.location.toLowerCase());
        
        // Match property type (if not 'All')
        const typeMatch = params.propertyType === 'All' || 
          property.propertyType === params.propertyType;
        
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