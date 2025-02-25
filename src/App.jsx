import PropertyModal from "./components/PropertyModal";
import FeaturedProperties from "./components/FeaturedProperties";
import AllProperties from "./components/AllProperties";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import { useState } from "react";
import NaturaLogoBG from "./assets/naturalogoBG.png";
import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties/search" element={<SearchPage />} />
      </Routes>

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
  );
}

export default App;
