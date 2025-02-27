import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Analytics component that initializes and manages Google Analytics and Facebook Pixel
 * 
 * Usage:
 * 1. Add this component to your App.jsx
 * 2. Call the tracking functions from other components
 * 
 * Example:
 * import { trackPropertyView, trackSearch } from './components/Analytics';
 * 
 * // Then in your component:
 * trackPropertyView({ id: '123', title: 'Beach House', price: '500000', location: 'Malibu', propertyType: 'House' });
 */

// Google Analytics Measurement ID and Facebook Pixel ID
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID;
const ENABLE_ANALYTICS = import.meta.env.VITE_ENABLE_ANALYTICS === 'true' || import.meta.env.MODE === 'production';

// Check if analytics IDs are available
const isGAEnabled = ENABLE_ANALYTICS && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXX';
const isFBPixelEnabled = ENABLE_ANALYTICS && FB_PIXEL_ID && FB_PIXEL_ID !== 'XXXXXXXXXX';

// Track last events to prevent duplicates
const lastEvents = {
  pageView: { path: null, time: 0 },
  propertyView: { id: null, time: 0 },
  search: { params: null, time: 0 },
  contact: { id: null, time: 0 },
  whatsApp: { id: null, time: 0 }
};

// Minimum time between duplicate events (in milliseconds)
const DEBOUNCE_TIME = 1000;

// Initialize Google Analytics
const initializeGA = () => {
  if (!isGAEnabled) {
    console.log('Google Analytics is disabled. Set VITE_GA_MEASUREMENT_ID in your .env file to enable it.');
    return;
  }

  // Check if already initialized
  if (window.gtag) {
    console.log('Google Analytics already initialized.');
    return;
  }

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
  
  console.log('Google Analytics initialized.');
};

// Initialize Facebook Pixel
const initializeFBPixel = () => {
  if (!isFBPixelEnabled) {
    console.log('Facebook Pixel is disabled. Set VITE_FB_PIXEL_ID in your .env file to enable it.');
    return;
  }

  // Check if already initialized
  if (window.fbq) {
    console.log('Facebook Pixel already initialized.');
    return;
  }

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
  
  console.log('Facebook Pixel initialized.');
};

// Check if an event should be tracked (to prevent duplicates)
const shouldTrackEvent = (eventType, identifier) => {
  const now = Date.now();
  const lastEvent = lastEvents[eventType];
  
  // If this is a new event or enough time has passed since the last one
  if (lastEvent.id !== identifier || (now - lastEvent.time) > DEBOUNCE_TIME) {
    lastEvents[eventType] = { id: identifier, time: now };
    return true;
  }
  
  return false;
};

// Track page views
export const trackPageView = (path) => {
  if (!shouldTrackEvent('pageView', path)) {
    return;
  }
  
  if (isGAEnabled && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
    console.log('GA Page view tracked:', path);
  }
  
  if (isFBPixelEnabled && window.fbq) {
    window.fbq('track', 'PageView');
    console.log('FB Pixel Page view tracked');
  }
};

// Track custom events
export const trackEvent = (eventName, params = {}) => {
  const eventId = `${eventName}_${JSON.stringify(params)}`;
  if (!shouldTrackEvent(eventName, eventId)) {
    return;
  }
  
  if (isGAEnabled && window.gtag) {
    window.gtag('event', eventName, params);
    console.log('GA Event tracked:', eventName, params);
  }
  
  if (isFBPixelEnabled && window.fbq) {
    window.fbq('track', eventName, params);
    console.log('FB Pixel Event tracked:', eventName, params);
  }
};

// Predefined events for real estate website
export const trackPropertyView = (property) => {
  if (!property) return;
  
  // Check for duplicate event
  if (!shouldTrackEvent('propertyView', property.id)) {
    return;
  }
  
  // Google Analytics - view_item event
  if (isGAEnabled && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'USD',
      value: property.price,
      items: [{
        item_id: property.id,
        item_name: property.title,
        item_category: property.propertyType,
        price: property.price,
        quantity: 1
      }]
    });
  }
  
  // Facebook Pixel - ViewContent event
  if (isFBPixelEnabled && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_type: 'product',
      content_ids: [property.id],
      content_name: property.title,
      content_category: property.propertyType,
      value: property.price,
      currency: 'USD'
    });
  }
  
  console.log('Property view tracked:', property.title);
};

export const trackContactFormSubmission = (formData) => {
  if (!formData) return;
  
  // Generate a unique ID for this submission
  const submissionId = `contact_${Date.now()}`;
  
  // Check for duplicate event
  if (!shouldTrackEvent('contact', submissionId)) {
    return;
  }
  
  // Google Analytics - generate_lead event
  if (isGAEnabled && window.gtag) {
    window.gtag('event', 'generate_lead', {
      form_type: 'contact',
      ...formData
    });
  }
  
  // Facebook Pixel - Lead event
  if (isFBPixelEnabled && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Contact Form',
      content_category: 'Contact',
      ...formData
    });
  }
  
  console.log('Contact form submission tracked');
};

export const trackWhatsAppClick = (property) => {
  const propertyId = property?.id || 'general';
  
  // Check for duplicate event
  if (!shouldTrackEvent('whatsApp', propertyId)) {
    return;
  }
  
  const eventParams = {
    property_id: propertyId,
    property_title: property?.title || 'general inquiry'
  };
  
  // Google Analytics - custom event
  if (isGAEnabled && window.gtag) {
    window.gtag('event', 'whatsapp_click', eventParams);
  }
  
  // Facebook Pixel - Contact event
  if (isFBPixelEnabled && window.fbq) {
    window.fbq('track', 'Contact', {
      content_type: 'product',
      content_ids: property?.id ? [property.id] : ['general'],
      content_name: property?.title || 'General Inquiry'
    });
  }
  
  console.log('WhatsApp click tracked:', eventParams.property_title);
};

export const trackSearch = (searchParams) => {
  if (!searchParams) return;
  
  // Generate a search ID based on the parameters
  const searchId = JSON.stringify(searchParams);
  
  // Check for duplicate event
  if (!shouldTrackEvent('search', searchId)) {
    return;
  }
  
  // Google Analytics - search event
  if (isGAEnabled && window.gtag) {
    window.gtag('event', 'search', {
      search_term: JSON.stringify(searchParams)
    });
  }
  
  // Facebook Pixel - Search event
  if (isFBPixelEnabled && window.fbq) {
    window.fbq('track', 'Search', {
      search_string: JSON.stringify(searchParams),
      content_category: 'Property Search'
    });
  }
  
  console.log('Search tracked:', searchParams);
};

// Analytics component to be included in App.jsx
const Analytics = () => {
  const location = useLocation();
  const initialized = useRef(false);
  
  // Initialize analytics only once
  useEffect(() => {
    if (initialized.current) {
      return;
    }
    
    if (ENABLE_ANALYTICS) {
      initializeGA();
      initializeFBPixel();
      console.log('Analytics initialized. GA:', isGAEnabled ? 'Enabled' : 'Disabled', 'FB Pixel:', isFBPixelEnabled ? 'Enabled' : 'Disabled');
      initialized.current = true;
    } else {
      console.log('Analytics disabled. Set VITE_ENABLE_ANALYTICS=true to enable.');
    }
  }, []);
  
  // Track page views when location changes
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  
  return null; // This component doesn't render anything
};

export default Analytics; 