import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 bg-fixed"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2600&auto=format&fit=crop')",
          backgroundAttachment: 'fixed' // Ensures parallax on most browsers
        }}
      >
        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/70"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white">
        {/* Subtitle with extra tracking */}
        <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6 text-stone-300 font-bold animate-fade-in">
          Architecture & Bespoke Interiors
        </p>
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-medium mb-8 leading-[1.1] tracking-tight">
          Curating Spaces <br /> 
          <span className="italic font-light">That Inspire.</span>
        </h1>
        
        {/* Description */}
        <p className="text-base md:text-lg text-stone-300 mb-12 font-light max-w-xl mx-auto leading-relaxed">
          At <span className="text-white font-normal">AS Interior</span>, we blend functionality with aesthetic perfection to reflect your unique identity.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href="#portfolio" 
            className="group relative px-10 py-4 bg-white text-stone-900 overflow-hidden transition-all duration-300 hover:bg-stone-100"
          >
            <span className="relative z-10 font-bold uppercase tracking-widest text-[10px]">View Projects</span>
          </a>
          
          <a 
            href="#contact" 
            className="px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-stone-900 transition-all duration-500"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <span className="text-[9px] uppercase tracking-[0.3em] text-white vertical-text mb-2">Scroll</span>
        <a href="#about" className="animate-bounce">
          <ChevronDown size={20} className="text-white" />
        </a>
      </div>

      {/* Side Decorative Line */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 h-32 w-[1px] bg-white/20 hidden lg:block"></div>

    </section>
  );
};

export default Hero;