import PropertyModal from "./components/PropertyModal";
import FeaturedProperties from "./components/FeaturedProperties";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import { useState } from "react";
import NaturaLogoBG from '../public/NaturaLogoBG.png'

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Home />

      <FeaturedProperties setSelectedProperty={setSelectedProperty} />

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
