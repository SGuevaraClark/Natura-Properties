import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon

const Contact = () => {
  const phoneNumber = "50688664708"; // Remove the + for the URL
  const message = "Hello, I'm interested in learning more about your properties."; // Optional default message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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
