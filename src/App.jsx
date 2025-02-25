import PropertyModal from "./components/PropertyModal";
import FeaturedProperties from "./components/FeaturedProperties";
import AllProperties from "./components/AllProperties";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import { useState } from "react";
import { SearchProvider } from "./context/SearchContext";
import NaturaLogoBG from '../public/NaturaLogoBG.png'

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <SearchProvider>
      <div className="min-h-screen w-full bg-gray-50">
        <Home />

        <FeaturedProperties setSelectedProperty={setSelectedProperty} />
        
        <AllProperties setSelectedProperty={setSelectedProperty} />

        <Contact />

        <Footer />

        {selectedProperty && (
          <PropertyModal
            properties={[selectedProperty]}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </div>
    </SearchProvider>
  );
}

export default App;
