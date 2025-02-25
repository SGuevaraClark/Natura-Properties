import React, { useState } from "react";
import naturaLogoWide from "../assets/naturaLogoWide.png";
import backgroundVideo from "../assets/background-video.mp4";
import homeImage from "../assets/homeImage.jpg";
import { FaLocationDot } from "react-icons/fa6";

const Home = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="relative h-[100vh]">
      <img 
        src={homeImage} 
        className={`w-full h-full object-cover absolute transition-opacity duration-500 ${
          isVideoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        alt="" 
      />
      
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        onCanPlay={() => setIsVideoLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        preload="auto"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/50 flex items-center justify-center">
        <div className="text-center text-white max-w-5xl px-4">
          <img 
            src={naturaLogoWide} 
            alt="Natura Logo" 
            className="w-full max-w-xl mx-auto mb-4"
          />

          <p className="relative mb-12">
            <span className="text-xl md:text-3xl font-light tracking-wider block">
              Where Vision Meets Opportunity
            </span>
            <span className="text-lg md:text-2xl text-[#7dc138] font-medium mt-3 block italic">
              in Costa Rica
            </span>
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#7dc138] to-transparent"></span>
          </p>

          <div className="bg-white/30 p-8 rounded-3xl shadow-2xl backdrop-blur-md max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="Search by Location"
                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7dc138] hover:border-[#7dc138] hover:bg-[#7dc138]/5 focus:bg-white text-black transition-colors duration-200"
              />

              <select className="px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7dc138]">
                <option value="">Lots</option>
                <option value="">Houses</option>
                <option value="">Investment Opportunities</option>
              </select>

              <button className="bg-[#7dc138] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7dc138]/90 transition-colors">
                Search
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="flex flex-col p-3 items-center bg-slate-50/20 rounded-lg transition-transform hover:scale-105 cursor-pointer">
                <FaLocationDot className="text-[#7dc138] mb-2" />
                <span className="font-semibold text-white">San José</span>
              </div>

              <div className="flex flex-col p-3 items-center bg-slate-50/20 rounded-lg transition-transform hover:scale-105 cursor-pointer">
                <FaLocationDot className="text-[#7dc138] mb-2" />
                <span className="font-semibold text-white">Guanacaste</span>
              </div>

              <div className="flex flex-col p-3 items-center bg-slate-50/20 rounded-lg transition-transform hover:scale-105 cursor-pointer">
                <FaLocationDot className="text-[#7dc138] mb-2" />
                <span className="font-semibold text-white">Puntarenas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
