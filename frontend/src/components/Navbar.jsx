import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react'; // <--- Import Lock Icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' }, // Changed to '/' so it works with routing
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <a 
          href="/" 
          className={`text-2xl font-serif font-bold tracking-wider transition-all duration-300 ${
            scrolled ? 'text-stone-dark scale-95' : 'text-stone-dark md:text-white scale-100'
          }`}
        >
          AS INTERIOR
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm uppercase tracking-widest font-medium hover:text-accent-gold transition duration-300 ${
                scrolled ? 'text-stone-600' : 'text-white/90'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          <a 
            href="#contact" 
            className="px-6 py-2 bg-accent-gold text-white font-medium rounded-sm hover:bg-yellow-600 transition duration-300 shadow-md hover:shadow-lg"
          >
            Book Consult
          </a>

          {/* --- ADMIN BUTTON (Desktop) --- */}
          <a 
            href="/admin"
            className={`flex items-center text-xs uppercase tracking-widest font-bold border px-4 py-2 rounded-full transition duration-300 ${
              scrolled 
                ? 'border-stone-300 text-stone-600 hover:bg-stone-900 hover:text-white' 
                : 'border-white/30 text-white hover:bg-white hover:text-stone-900'
            }`}
          >
            <Lock size={14} className="mr-2" /> Admin
          </a>

        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden focus:outline-none transition-colors duration-300 relative z-50 ${
            isOpen || scrolled ? 'text-stone-dark' : 'text-stone-dark md:text-white'
          }`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-0 left-0 w-full h-screen bg-white flex flex-col justify-center items-center space-y-8 transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="text-2xl font-serif text-stone-800 hover:text-accent-gold transition duration-300"
            onClick={() => setIsOpen(false)} 
          >
            {link.name}
          </a>
        ))}
        
        <a 
          href="#contact" 
          className="px-10 py-4 bg-stone-900 text-white font-medium rounded-sm text-lg"
          onClick={() => setIsOpen(false)}
        >
          Book Consult
        </a>

        {/* --- ADMIN BUTTON (Mobile) --- */}
        <a 
          href="/admin" 
          className="px-10 py-4 bg-stone-100 text-stone-900 font-bold uppercase tracking-widest rounded-sm flex items-center"
          onClick={() => setIsOpen(false)}
        >
          <Lock size={20} className="mr-2" /> Admin Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;