import React from 'react';
import { CheckCircle } from 'lucide-react';
// 1. IMPORT THE IMAGE HERE
// Make sure the file 'about_image.png' is in the 'src/assets' folder!
import aboutImg from '../assets/about_image.png'; 

const About = () => {
  return (
    <section id="about" className="py-20 bg-stone-light">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Image Composition */}
        <div className="relative group">
          <div className="overflow-hidden rounded-sm shadow-xl">
            {/* 2. USE THE IMPORTED IMAGE HERE */}
            <img 
              src={aboutImg} 
              alt="AS Interior Office" 
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Experience Badge */}
          <div className="absolute -bottom-6 -right-6 bg-white p-8 shadow-lg hidden md:block border-l-4 border-accent-gold">
            <p className="font-serif text-4xl text-stone-900">2+</p>
            <p className="text-stone-500 uppercase text-xs tracking-widest mt-1 font-bold">Years Experience</p>
          </div>
        </div>

        {/* Right Side: Content */}
        <div>
          <h2 className="text-4xl font-serif text-stone-dark mb-6">Redefining Modern Living</h2>
          <div className="w-16 h-1 bg-accent-gold mb-8"></div>
          
          <p className="text-stone-600 mb-6 leading-relaxed">
            At <strong>AS Interior</strong>, we believe that design is not just about aesthetics—it is about creating spaces that reflect your soul. Our philosophy blends timeless elegance with modern functionality.
          </p>
          
          <p className="text-stone-600 mb-8 leading-relaxed">
            From concept to completion, we handle every detail of your project. Whether you are looking for a complete home renovation or a single-room refresh, we bring a level of expertise and artistry that transforms your vision into reality.
          </p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              'Space Planning', 
              'Concept Design', 
              '3D Visualization', 
              'Project Management'
            ].map((item) => (
              <li key={item} className="flex items-center text-stone-700 font-medium">
                <CheckCircle size={18} className="text-accent-gold mr-2" /> 
                {item}
              </li>
            ))}
          </ul>

          <a href="#portfolio" className="text-stone-900 border-b border-stone-900 pb-1 hover:text-accent-gold hover:border-accent-gold transition font-bold uppercase tracking-widest text-xs">
            View Our Work
          </a>
        </div>

      </div>
    </section>
  );
};

export default About;