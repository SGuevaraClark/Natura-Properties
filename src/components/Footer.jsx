import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#142414] text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center text-center mb-12">
      
          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-6">
            <a 
              href="https://maps.app.goo.gl/37iUNGJF9zDXB6Jz7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-[#7dc138] transition-colors"
            >
              <FaLocationDot className="text-[#7dc138] text-xl" />
              <span>Santa Ana, Costa Rica</span>
            </a>

            <a 
              href="mailto:naturaproperties@gmail.com"
              className="flex items-center gap-2 text-gray-400 hover:text-[#7dc138] transition-colors"
            >
              <FaEnvelope className="text-[#7dc138] text-xl" />
              <span>naturaproperties@gmail.com</span>
            </a>

            <a 
              href="tel:+50683382969"
              className="flex items-center gap-2 text-gray-400 hover:text-[#7dc138] transition-colors"
            >
              <FaPhone className="text-[#7dc138] text-xl" />
              <span>+506 8338 2969</span>
            </a>
          </div>

          {/* Social Media */}
          <div className="flex gap-4">
            <a 
              href="https://www.facebook.com/NaturaCRC"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-2 rounded-full hover:bg-[#7dc138]/20 transition-colors group"
            >
              <FaFacebook className="text-xl text-gray-400 group-hover:text-[#7dc138] transition-colors" />
            </a>
            <a 
              href="https://www.instagram.com/naturaproperties?igsh=MTBlenFoZzBjdTZxNQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-2 rounded-full hover:bg-[#7dc138]/20 transition-colors group"
            >
              <FaInstagram className="text-xl text-gray-400 group-hover:text-[#7dc138] transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="text-center pt-4 border-t border-gray-800">
          <p className="text-gray-400">
            Created by{" "}
            <a 
              href="https://www.instagram.com/vwio.ai?igsh=MW01bms5MnZoNWRkdQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7dc138] hover:text-[#7dc138]/80 transition-colors font-medium"
            >
              Vwio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
