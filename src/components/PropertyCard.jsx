import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={property.imageUrl || '/default-property.jpg'} 
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">${property.price?.toLocaleString() || 'Price not available'}</span>
          <span className="bg-gray-200 px-2 py-1 rounded text-sm">{property.type}</span>
        </div>
        {property.beds && property.baths && (
          <div className="mt-2 text-gray-500 text-sm">
            <span>{property.beds} beds</span> • <span>{property.baths} baths</span>
            {property.sqft && <span> • {property.sqft} sqft</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard; 