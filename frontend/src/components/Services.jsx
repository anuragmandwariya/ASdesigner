import React from 'react';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Residential Design",
      desc: "Full-service interior design for homes, apartments, and villas focusing on comfort and style. We create spaces that tell your story.",
      // UPDATED IMAGE LINK BELOW
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Commercial Spaces",
      desc: "Office, retail, and hospitality design that elevates brand identity. We balance aesthetics with workflow efficiency.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Virtual E-Design",
      desc: "Remote design services including mood boards, shopping lists, and layout guides for clients who want to implement the design themselves.",
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h4 className="text-accent-gold uppercase tracking-widest text-xs font-bold mb-2">What We Do</h4>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-dark mb-4">Our Expertise</h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mb-6"></div>
          <p className="text-stone-500 leading-relaxed">
            Tailored design solutions for every stage of your journey. From single-room refresh to full-scale renovation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="group cursor-pointer">
              
              {/* Image Container with Zoom Effect */}
              <div className="overflow-hidden mb-6 h-64 rounded-sm shadow-sm relative">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition z-10 duration-500"></div>
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition duration-700 ease-in-out group-hover:scale-110"
                />
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-serif text-stone-dark mb-3 group-hover:text-accent-gold transition duration-300">
                {service.title}
              </h3>
              
              <p className="text-stone-500 mb-6 leading-relaxed text-sm">
                {service.desc}
              </p>
              
              {/* Link */}
              <a 
                href="#contact" 
                className="inline-flex items-center text-stone-900 uppercase text-xs tracking-widest font-bold border-b border-stone-200 pb-1 hover:border-accent-gold hover:text-accent-gold transition duration-300"
              >
                Learn More <ArrowRight size={16} className="ml-2" />
              </a>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;