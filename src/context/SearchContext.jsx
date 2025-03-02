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
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch all properties once when the component mounts
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        setLoading(true);
        const records = await pb.collection('properties').getList(1, 50, {
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
        console.error('Error fetching properties:', error);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, []);

  // Function to scroll to search results
  const scrollToSearchResults = () => {
    // Add a small delay to ensure the component is rendered
    setTimeout(() => {
      const searchResultsElement = document.getElementById('search-results');
      if (searchResultsElement) {
        searchResultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

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
  const performSearch = async (params = searchParams) => {
    // If no search criteria provided, don't perform search
    if (!params.location && params.propertyType === 'All') {
      console.log('No search criteria provided, returning empty results');
      setSearchResults([]);
      setHasSearched(true);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      let filter = [];
      
      // Add location filter if provided
      if (params.location) {
        filter.push(`location ~ "${params.location}"`);
      }
      
      // Add property type filter if not "All"
      if (params.propertyType !== 'All') {
        filter.push(`propertyType = "${params.propertyType}"`);
      }
      
      // Combine filters with AND operator
      const filterString = filter.join(' && ');
      
      const records = await pb.collection('properties').getList(1, 100, {
        filter: filterString,
        sort: '-created',
        $autoCancel: false
      });
      
      if (records && records.items) {
        const propertiesWithImages = records.items.map(property => {
          // Create an array of image URLs, starting with the main image
          let allImages = [];
          
          // Add main image if it exists
          if (property.image) {
            allImages.push(pb.files.getURL(property, property.image));
          }
          
          // Add additional images if they exist
          if (property.images && Array.isArray(property.images)) {
            const additionalImages = property.images.map(img => pb.files.getURL(property, img));
            allImages = [...allImages, ...additionalImages];
          }
          
          // If no images at all, use placeholder
          if (allImages.length === 0) {
            allImages = ['https://placehold.co/600x400'];
          }
          
          return {
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
              ? pb.files.getURL(property, property.image) 
              : 'https://placehold.co/600x400',
            images: allImages
          };
        });
        
        setSearchResults(propertiesWithImages);
        console.log('Search results:', propertiesWithImages.length);
        
        // Scroll to search results after they're loaded
        scrollToSearchResults();
      }
    } catch (error) {
      console.error('Error performing search:', error);
      setError('Failed to perform search. Please try again.');
    } finally {
      setLoading(false);
      setHasSearched(true);
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
        allProperties,
        hasSearched
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

export default SearchProvider; 