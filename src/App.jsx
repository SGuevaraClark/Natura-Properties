import PropertyModal from "./components/PropertyModal";
import FeaturedProperties from "./components/FeaturedProperties";
import AllProperties from "./components/AllProperties";
import SearchResults from "./components/SearchResults";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import { useState, useEffect } from "react";
import NaturaLogoBG from "./assets/naturalogoBG.png";
import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { SearchProvider } from './context/SearchContext';

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Add favicon to the browser tab
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = NaturaLogoBG;
    } else {
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = NaturaLogoBG;
      document.head.appendChild(newFavicon);
    }
  }, []);

  return (
    <SearchProvider>
      <div className="min-h-screen w-full bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties/search" element={<SearchPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>

        <FeaturedProperties setSelectedProperty={setSelectedProperty} />
        
        <AllProperties setSelectedProperty={setSelectedProperty} />
        
        <SearchResults setSelectedProperty={setSelectedProperty} />

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
