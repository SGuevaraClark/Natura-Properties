import React, { useEffect, useState } from "react";
import { pb } from '../lib/pocketbase';
import { FaBath, FaBed, FaHeart, FaRuler } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const FeaturedProperties = ({ setSelectedProperty }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const records = await pb.collection('properties').getList(1, 50, {
          sort: '-created',
          $autoCancel: false,
        });
        
        const propertiesWithImages = records.items.map(property => ({
          id: property.id,
          title: property.title || 'No Title',
          price: property.price || 'Price not set',
          location: property.location || 'Location not set',
          beds: property.beds || 0,
          baths: property.baths || 0,
          sqft: property.sqft || 0,
          description: property.description || 'No description',
          image: property.image 
            ? pb.getFileUrl(property, property.image) 
            : 'https://placehold.co/600x400',
          images: property.images 
            ? property.images.map(img => pb.getFileUrl(property, img))
            : []
        }));

        setProperties(propertiesWithImages);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-xl">Loading properties...</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl">No properties found</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-2xl drop-shadow-lg overflow-hidden hover:drop-shadow-xl hover:scale-105 transition-all duration-300 relative group cursor-pointer"
            onClick={() => setSelectedProperty(property)}
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x400';
                e.target.onerror = null;
              }}
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{property.price}</h3>
                  <h4 className="text-lg">{property.title}</h4>
                </div>
                <button className="text-gray-500 hover:text-red-500 transition-colors">
                  <FaHeart className="text-xl" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <FaLocationDot />
                <p>{property.location}</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <div className="flex items-center gap-1">
                  <FaBed />
                  <span>{property.beds} Beds</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaBath />
                  <span>{property.baths} Baths</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaRuler />
                  <span>{property.sqft} sqft</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
