import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import NaturaLogoBG from "./assets/naturalogoBG.png";
import { SearchProvider } from './context/SearchContext';
import SEO from './components/SEO';
import Analytics from './components/Analytics';
import ErrorBoundary from './components/ErrorBoundary';

// Eagerly loaded components (visible above the fold)
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";

// Lazily loaded components (below the fold or not immediately needed)
const PropertyModal = lazy(() => import("./components/PropertyModal"));
const FeaturedProperties = lazy(() => import("./components/FeaturedProperties"));
const AllProperties = lazy(() => import("./components/AllProperties"));
const SearchResults = lazy(() => import("./components/SearchResults"));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

// Loading fallbacks
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7dc138]"></div>
  </div>
);

// ScrollToTop component to restore scroll position on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const location = useLocation();

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
    <ErrorBoundary>
      <SearchProvider>
        <ScrollToTop />
        <Analytics />
        <div className="min-h-screen w-full bg-gray-50">
          {/* Default SEO for the home page */}
          {location.pathname === '/' && (
            <SEO 
              title="Natura Properties | Real Estate in Costa Rica"
              description="Find your dream property in Costa Rica with Natura Properties. Explore our exclusive listings of homes, lots, and investment opportunities."
            />
          )}
          
          {/* SEO for the privacy policy page */}
          {location.pathname === '/privacy-policy' && (
            <SEO 
              title="Privacy Policy | Natura Properties"
              description="Learn about how Natura Properties collects and protects your personal information."
            />
          )}
          
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </Suspense>

          {/* Only show these components on the home page */}
          {location.pathname === '/' && (
            <>
              <Suspense fallback={<LoadingSpinner />}>
                <FeaturedProperties setSelectedProperty={setSelectedProperty} />
              </Suspense>
              
              <Suspense fallback={<LoadingSpinner />}>
                <SearchResults setSelectedProperty={setSelectedProperty} />
              </Suspense>
              
              <Suspense fallback={<LoadingSpinner />}>
                <AllProperties setSelectedProperty={setSelectedProperty} />
              </Suspense>
            </>
          )}

          {/* Show these components on all pages */}
          <Contact />
          <Footer />

          {selectedProperty && (
            <Suspense fallback={<LoadingSpinner />}>
              <PropertyModal
                properties={[selectedProperty]}
                onClose={() => setSelectedProperty(null)}
              />
            </Suspense>
          )}
        </div>
      </SearchProvider>
    </ErrorBoundary>
  );
}

export default App;
