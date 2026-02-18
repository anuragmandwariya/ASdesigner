import React from 'react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-stone-500 py-12 border-t border-stone-900">
      <div className="container mx-auto px-6">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          
          {/* Brand Name Changed Here */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-serif font-bold text-white tracking-wider">AS INTERIOR.</h2>
            <p className="text-xs uppercase tracking-widest mt-2 text-stone-600">Interior Design Studio</p>
          </div>

          <div className="flex space-x-8 text-sm uppercase tracking-wider">
            <a href="#home" className="hover:text-accent-gold transition duration-300">Home</a>
            <a href="#portfolio" className="hover:text-accent-gold transition duration-300">Work</a>
            <a href="#about" className="hover:text-accent-gold transition duration-300">Studio</a>
            <a href="#contact" className="hover:text-accent-gold transition duration-300">Contact</a>
          </div>
        </div>

        <div className="border-t border-stone-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          
          {/* Copyright Changed Here */}
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AS Interior All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition transform hover:-translate-y-1 duration-300">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-white transition transform hover:-translate-y-1 duration-300">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-white transition transform hover:-translate-y-1 duration-300">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;