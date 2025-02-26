import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Analytics component that initializes and manages Google Analytics and Facebook Pixel
 * 
 * Usage:
 * 1. Add this component to your App.jsx
 * 2. Call the tracking functions from other components
 * 
 * Example:
 * import { trackEvent } from './Analytics';
 * 
 * // Then in your component:
 * trackEvent('property_view', { property_id: '123', property_title: 'Beach House' });
 */

// Google Analytics Measurement ID and Facebook Pixel ID
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID;

// Check if analytics IDs are available
const isGAEnabled = GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXX';
const isFBPixelEnabled = FB_PIXEL_ID && FB_PIXEL_ID !== 'XXXXXXXXXX';

// Initialize Google Analytics
const initializeGA = () => {
  if (!isGAEnabled) {
    console.log('Google Analytics is disabled. Set VITE_GA_MEASUREMENT_ID in your .env file to enable it.');
    return;
  }

  if (!window.gtag) {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
    `;
    
    document.head.appendChild(script1);
    document.head.appendChild(script2);
  }
};

// Initialize Facebook Pixel
const initializeFBPixel = () => {
  if (!isFBPixelEnabled) {
    console.log('Facebook Pixel is disabled. Set VITE_FB_PIXEL_ID in your .env file to enable it.');
    return;
  }

  if (!window.fbq) {
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${FB_PIXEL_ID}');
    `;
    
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = `https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    
    document.head.appendChild(script);
    document.body.appendChild(noscript);
  }
};

// Track page views
export const trackPageView = (path) => {
  if (isGAEnabled && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  }
  
  if (isFBPixelEnabled && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Track custom events
export const trackEvent = (eventName, params = {}) => {
  if (isGAEnabled && window.gtag) {
    window.gtag('event', eventName, params);
  }
  
  if (isFBPixelEnabled && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

// Predefined events for real estate website
export const trackPropertyView = (property) => {
  if (!property) return;
  
  trackEvent('property_view', {
    property_id: property.id,
    property_title: property.title,
    property_price: property.price,
    property_location: property.location,
    property_type: property.propertyType
  });
};

export const trackContactFormSubmission = (formData) => {
  if (!formData) return;
  
  trackEvent('contact_form_submission', {
    form_type: 'contact',
    ...formData
  });
};

export const trackWhatsAppClick = (property) => {
  trackEvent('whatsapp_click', {
    property_id: property?.id || 'general',
    property_title: property?.title || 'general inquiry'
  });
};

export const trackSearch = (searchParams) => {
  if (!searchParams) return;
  
  trackEvent('property_search', searchParams);
};

// Analytics component to be included in App.jsx
const Analytics = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Initialize Google Analytics
    const initGA = () => {
      const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
      
      if (!gaMeasurementId) {
        console.warn('Google Analytics Measurement ID not found in environment variables');
        return;
      }
      
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
      document.head.appendChild(script);
      
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', gaMeasurementId);
      
      // Make gtag available globally
      window.gtag = gtag;
    };
    
    initGA();
  }, []);
  
  // Track page views when location changes
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
      console.log('Page view tracked:', location.pathname);
    }
  }, [location]);
  
  // Custom event tracking functions that can be exported
  const trackPropertyView = (propertyId, propertyTitle) => {
    if (window.gtag) {
      window.gtag('event', 'view_item', {
        event_category: 'Property',
        event_label: propertyTitle,
        property_id: propertyId
      });
    }
  };
  
  const trackSearch = (searchParams) => {
    if (window.gtag) {
      window.gtag('event', 'search', {
        search_term: JSON.stringify(searchParams)
      });
    }
  };
  
  const trackContactForm = () => {
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'Contact',
        event_label: 'Contact Form Submission'
      });
    }
  };
  
  // Expose tracking functions to window for use in other components
  useEffect(() => {
    window.trackPropertyView = trackPropertyView;
    window.trackSearch = trackSearch;
    window.trackContactForm = trackContactForm;
    
    return () => {
      // Cleanup
      delete window.trackPropertyView;
      delete window.trackSearch;
      delete window.trackContactForm;
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default Analytics; 