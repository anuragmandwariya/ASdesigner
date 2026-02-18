import React from 'react';
import { CheckCircle } from 'lucide-react';
// Ensure karein ki ye path sahi hai aur image 'src/assets' folder mein maujood hai
import aboutImg from '../assets/about_image.png'; 

const About = () => {
  // 2023 se experience calculate karne ke liye dynamic logic
  const yearsExperience = new Date().getFullYear() - 2023;

  return (
    <section id="about" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Image Composition */}
        <div className="relative group">
          <div className="overflow-hidden rounded-sm shadow-2xl">
            <img 
              src={aboutImg} 
              alt="AS Interior Studio" 
              className="w-full h-[450px] md:h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110"
              // Fallback agar image missing ho
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200'; }}
            />
          </div>

          {/* Experience Badge - Styled for luxury feel */}
          <div className="absolute -bottom-6 -right-2 md:-right-6 bg-white p-6 md:p-10 shadow-2xl border-l-4 border-stone-900 z-10">
            <p className="font-serif text-5xl md:text-6xl text-stone-900 leading-none">{yearsExperience}+</p>
            <p className="text-stone-500 uppercase text-[10px] md:text-xs tracking-[0.3em] mt-3 font-bold">
              Years of <br /> Excellence
            </p>
          </div>

          {/* Decorative Background Element */}
          <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-stone-200 -z-10 hidden md:block"></div>
        </div>

        {/* Right Side: Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-stone-400 uppercase tracking-[0.4em] text-xs font-bold italic">Since 2023</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 leading-tight">
              Redefining <br /> Modern Living
            </h2>
            <div className="w-20 h-1 bg-stone-900"></div>
          </div>
          
          <div className="space-y-6 text-stone-600 leading-loose text-lg font-light">
            <p>
              At <strong className="text-stone-900 font-semibold">AS Interior</strong>, we believe that design is not just about aesthetics—it is about creating spaces that reflect your soul. Our philosophy blends timeless elegance with modern functionality.
            </p>
            
            <p>
              From concept to completion, we handle every detail of your project. Whether you are looking for a complete home renovation or a single-room refresh, we bring artistry that transforms your vision into reality.
            </p>
          </div>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 py-4">
            {[
              'Space Planning', 
              'Concept Design', 
              '3D Visualization', 
              'Project Management'
            ].map((item) => (
              <li key={item} className="flex items-center text-stone-800 font-medium group cursor-default">
                <CheckCircle size={20} className="text-stone-900 mr-3 group-hover:scale-110 transition-transform" /> 
                <span className="tracking-wide uppercase text-xs">{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-6">
            <a 
              href="#portfolio" 
              className="inline-block text-stone-900 border-b-2 border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-300 transition-all duration-300 font-bold uppercase tracking-[0.3em] text-xs"
            >
              Explore Our Portfolio
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;