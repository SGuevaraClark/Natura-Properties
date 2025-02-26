import React, { createContext, useState, useContext, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { getImageUrl } from '../utils/imageUtils';

const pb = new PocketBase(import.meta.env.VITE_API_URL);

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
  const [error, setError] = useState(null);
  const [allProperties, setAllProperties] = useState([]);

  // Fetch all properties once when the component mounts
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        setLoading(true);
        const records = await pb.collection('properties').getList(1, 100, {
          sort: '-created',
          $autoCancel: false
        });
        
        if (records && records.items) {
          const propertiesWithImages = records.items.map(property => ({
            id: property.id,
            title: property.title || 'No Title',
            price: property.price || 'Price not set',
            location: property.location || 'Location not specified',
            beds: property.beds || 0,
            baths: property.baths || 0,
            m2: property.m2 || 0,
            featured: property.featured || false,
            description: property.description || 'No description',
            propertyType: property.propertyType || '',
            type: property.type || 'Not specified',
            image: property.image 
              ? getImageUrl(pb, property, property.image)
              : 'https://placehold.co/600x400',
            images: property.images && Array.isArray(property.images)
              ? property.images.map(img => getImageUrl(pb, property, img))
              : []
          }));
          
          setAllProperties(propertiesWithImages);
          console.log('Fetched all properties:', propertiesWithImages.length);
        }
      } catch (error) {
        console.error('Error fetching all properties:', error);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, []);

  // Update search params and perform search
  const updateSearchParams = (newParams) => {
    console.log('Updating search params:', newParams);
    
    // Normalize parameters
    const updatedParams = {
      location: newParams.location || '',
      propertyType: newParams.propertyType === 'All' ? 'All' : 
                   (newParams.propertyType || '').toLowerCase()
    };
    
    setSearchParams(updatedParams);
    performSearch(updatedParams);
  };

  // Perform search using the cached properties
  const performSearch = (params = searchParams) => {
    console.log('Performing search with params:', params);
    setLoading(true);
    setError(null);
    
    try {
      // If no search criteria, return empty results
      if (!params.location && (!params.propertyType || params.propertyType === 'All')) {
        console.log('No search criteria provided, returning empty results');
        setSearchResults([]);
        setLoading(false);
        return;
      }
      
      // Filter properties based on search params
      const filtered = allProperties.filter(property => {
        // Match location (if provided)
        let locationMatch = true;
        
        if (params.location && params.location.trim() !== '') {
          const searchLocation = params.location.trim().toLowerCase();
          
          // Check if property location contains the search term
          locationMatch = property.location && 
                         property.location.toLowerCase().includes(searchLocation);
        }
        
        // Match property type (if not 'All')
        let typeMatch = true;
        
        if (params.propertyType && params.propertyType !== 'All') {
          typeMatch = property.propertyType && 
                     property.propertyType.toLowerCase() === params.propertyType.toLowerCase();
        }
        
        return locationMatch && typeMatch;
      });
      
      console.log('Search results:', filtered.length);
      setSearchResults(filtered);
    } catch (error) {
      console.error('Error performing search:', error);
      setError('An error occurred while searching. Please try again.');
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
        error,
        updateSearchParams, 
        performSearch,
        allProperties
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

export default SearchProvider; 