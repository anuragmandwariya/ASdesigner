import React from 'react';
import { ChevronDown } from 'lucide-react'; // Import icon for scroll indicator

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      
      {/* Background Image with Parallax Effect */}
      {/* Note: 'bg-fixed' creates the parallax effect where the image stays still while scrolling */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2600&auto=format&fit=crop')" }}
      >
        {/* Dark Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-stone-900/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white animate-fade-in-up">
        <p className="text-sm md:text-base tracking-[0.4em] uppercase mb-4 text-accent-gold font-bold">
          Architecture & Interior Design
        </p>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-8 leading-tight">
          Curating Spaces <br /> That Inspire.
        </h1>
        
        <p className="text-lg md:text-xl text-stone-200 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
          We blend functionality with aesthetic perfection to create environments that reflect your unique identity.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a 
            href="#portfolio" 
            className="px-8 py-4 bg-white text-stone-900 font-medium tracking-widest uppercase text-sm hover:bg-accent-gold hover:text-white transition duration-300"
          >
            View Projects
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 border border-white text-white font-medium tracking-widest uppercase text-sm hover:bg-white hover:text-stone-900 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white/70 hover:text-white transition">
          <ChevronDown size={32} />
        </a>
      </div>

    </section>
  );
};

export default Hero;