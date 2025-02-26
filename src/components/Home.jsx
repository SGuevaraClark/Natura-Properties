import React, { useState } from "react";
import naturaLogoWide from "../assets/naturaLogoWide.png";
import backgroundVideo from "../assets/background-video.mp4";
import homeImage from "../assets/homeImage.jpg";
import SearchForm from "./SearchForm";
import { handleImageError } from "../utils/imageUtils";

const Home = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="relative h-[100vh]">
      <img 
        src={homeImage} 
        className={`w-full h-full object-cover absolute transition-opacity duration-500 ${
          isVideoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        alt="Natura Properties Background" 
        onError={(e) => handleImageError(e)}
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
            onError={(e) => handleImageError(e, 'https://placehold.co/800x200?text=Natura+Properties')}
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
            <SearchForm 
              heroStyle={true} 
              showLocationButtons={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
