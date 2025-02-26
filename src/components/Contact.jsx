import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon
import PocketBase from 'pocketbase';
import { trackContactFormSubmission, trackWhatsAppClick } from './Analytics';

const pb = new PocketBase(import.meta.env.VITE_API_URL);

const Contact = () => {
  const phoneNumber = "50688664708"; // Remove the + for the URL
  const defaultMessage = "Hello, I'm interested in learning more about your properties."; // Optional default message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      // Create form data
      const formData = {
        name,
        email,
        message: userMessage,
        timestamp: new Date().toISOString()
      };
      
      // Track the form submission
      trackContactFormSubmission(formData);
      
      // Submit to PocketBase or your backend
      const record = await pb.collection('contact_messages').create(formData);
      
      // Reset form
      setName('');
      setEmail('');
      setUserMessage('');
      
      // Show success message
      setSubmitStatus({ success: true, message: 'Message sent successfully!' });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        success: false, 
        message: 'Failed to send message. Please try again later.' 
      });
    } finally {
      setSubmitting(false);
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
  };

  return (
    <section className="bg-[#7dc138] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Your Vision, Our Expertise
        </h2>
        <p className="mb-8">Let's find the perfect property for your next big move</p>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-2 bg-white text-[#7dc138] px-8 py-3 rounded-3xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 transform"
        >
          <FaWhatsapp className="text-xl" />
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default Contact;
