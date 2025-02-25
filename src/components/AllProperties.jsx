import React, { useEffect, useState } from "react";
import { pb } from '../lib/pocketbase';
import { FaBath, FaBed, FaHeart, FaRuler } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const AllProperties = ({ setSelectedProperty }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const records = await pb.collection('properties').getList(1, 100, {
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
          m2: property.m2 || 0,
          featured: property.featured || false,
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">All Properties</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                    <FaHeart className="text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <FaLocationDot className="text-[#7dc138]" />
                  <span>{property.location}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {property.title}
                </h3>
                <div className="text-2xl font-bold text-[#7dc138] mb-4">
                  {property.price}
                </div>

                <div className="flex justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <FaBed className="text-[#7dc138]" />
                    <span className="text-gray-600">{property.beds}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaBath className="text-[#7dc138]" />
                    <span className="text-gray-600">{property.baths}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaRuler className="text-[#7dc138]" />
                    <span className="text-gray-600">{property.m2} m²</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProperty(property)}
                  className="w-full bg-[#7dc138] text-white py-3 rounded-lg font-semibold hover:bg-[#7dc138]/90 transition-all duration-300 hover:scale-105 transform"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProperties;