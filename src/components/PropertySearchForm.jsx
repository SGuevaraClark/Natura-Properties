import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PropertySearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get search params from URL
  const locationParam = searchParams.get("location");
  const propertyTypeParam = searchParams.get("propertyType");

  // Set states with URL params if available
  const [location, setLocation] = useState(locationParam || "");
  const [propertyType, setPropertyType] = useState(propertyTypeParam || "All");

  // Update state when URL params change
  useEffect(() => {
    setLocation(locationParam || "");
    setPropertyType(propertyTypeParam || "All");
  }, [locationParam, propertyTypeParam]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create query string
    const params = new URLSearchParams();
    
    // Only add params to URL if they have values
    if (location) params.append("location", location);
    if (propertyType && propertyType !== "All") params.append("propertyType", propertyType);

    // Construct the URL with query parameters
    const queryString = params.toString();
    const url = queryString ? `/properties/search?${queryString}` : "/properties/search";

    router.push(url);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 mx-auto flex flex-col md:flex-row items-center"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          type="text"
          id="location"
          placeholder="Enter Keywords or Location (City, State, Zip, etc)"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="w-full md:w-2/5 md:px-2">
        <label htmlFor="property-type" className="sr-only">
          Property Type
        </label>
        <select
          id="property-type"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Loft">Loft</option>
          <option value="Room">Room</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default PropertySearchForm; 