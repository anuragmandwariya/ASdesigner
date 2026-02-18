import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Agar routing use kar rahe ho

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect to change appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Studio', href: '/#about' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Contact', href: '/#contact' },
  ];

  // Logic to determine text color based on scroll and current page
  const isTransparentPage = location.pathname === '/';
  const navTextColor = scrolled || !isTransparentPage ? 'text-stone-900' : 'text-white';
  const navBgColor = scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${navBgColor}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link 
          to="/" 
          className={`text-2xl font-serif font-bold tracking-[0.2em] transition-all duration-300 ${navTextColor}`}
        >
          AS INTERIOR.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-[11px] uppercase tracking-[0.3em] font-bold hover:text-stone-400 transition duration-300 ${navTextColor}`}
            >
              {link.name}
            </a>
          ))}
          
          <div className="h-6 w-[1px] bg-stone-300 mx-2"></div>

          {/* ADMIN BUTTON (Desktop) */}
          <Link 
            to="/admin"
            className={`flex items-center text-[10px] uppercase tracking-[0.2em] font-bold border px-5 py-2 rounded-sm transition-all duration-300 ${
              scrolled || !isTransparentPage
                ? 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white' 
                : 'border-white/50 text-white hover:bg-white hover:text-stone-900'
            }`}
          >
            <Lock size={12} className="mr-2" /> Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`lg:hidden focus:outline-none transition-colors duration-300 z-50 ${
            isOpen || scrolled || !isTransparentPage ? 'text-stone-900' : 'text-white'
          }`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden fixed inset-0 w-full h-screen bg-white flex flex-col justify-center items-center space-y-10 transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <p className="text-[10px] uppercase tracking-[0.5em] text-stone-400 mb-4">Navigation</p>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="text-3xl font-serif text-stone-900 hover:italic transition-all"
            onClick={() => setIsOpen(false)} 
          >
            {link.name}
          </a>
        ))}
        
        <div className="w-10 h-[1px] bg-stone-200"></div>

        <Link 
          to="/admin" 
          className="text-xs uppercase tracking-[0.3em] font-bold flex items-center text-stone-500"
          onClick={() => setIsOpen(false)}
        >
          <Lock size={16} className="mr-2" /> Admin Access
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;