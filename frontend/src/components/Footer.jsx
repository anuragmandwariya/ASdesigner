import React from 'react';
import { Instagram, Linkedin, Facebook, ArrowUp } from 'lucide-react';

const Footer = () => {
  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-500 py-16 border-t border-stone-900">
      <div className="container mx-auto px-6">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          
          {/* Brand Identity */}
          <div className="mb-8 md:mb-0 text-center md:text-left group cursor-pointer" onClick={scrollToTop}>
            <h2 className="text-2xl font-serif font-bold text-white tracking-[0.2em]">AS INTERIOR.</h2>
            <p className="text-[10px] uppercase tracking-[0.4em] mt-2 text-stone-600 group-hover:text-stone-400 transition-colors">
              Elevating Spaces Since 2023
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[11px] uppercase tracking-[0.2em] font-bold">
            <a href="#home" className="hover:text-white transition-colors duration-300">Home</a>
            <a href="#about" className="hover:text-white transition-colors duration-300">Studio</a>
            <a href="#portfolio" className="hover:text-white transition-colors duration-300">Portfolio</a>
            <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
          </nav>
        </div>

        <div className="border-t border-stone-900 my-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          {/* Copyright & Info */}
          <div className="text-[11px] uppercase tracking-widest text-center md:text-left">
            <p className="mb-1 text-stone-600">
              &copy; {new Date().getFullYear()} AS Interior. All rights reserved.
            </p>
            <p className="text-stone-800">Designed & Developed with Precision</p>
          </div>

          {/* Social Presence */}
          <div className="flex items-center space-x-6">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-all transform hover:-translate-y-1 duration-300"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-all transform hover:-translate-y-1 duration-300"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-all transform hover:-translate-y-1 duration-300"
            >
              <Facebook size={18} />
            </a>
            
            {/* Back to Top Button */}
            <button 
              onClick={scrollToTop}
              className="ml-4 p-2 bg-stone-900 rounded-full hover:bg-white hover:text-stone-950 transition-all duration-500"
              title="Back to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;