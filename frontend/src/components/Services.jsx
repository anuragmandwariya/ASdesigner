import React from 'react';
import { ArrowRight, Layout, Home, Briefcase } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Residential Design",
      desc: "Full-service interior design for homes, apartments, and villas focusing on comfort and style. We create spaces that tell your unique story.",
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
      icon: <Home size={20} />
    },
    {
      title: "Commercial Spaces",
      desc: "Office, retail, and hospitality design that elevates brand identity. We balance professional aesthetics with modern workflow efficiency.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
      icon: <Briefcase size={20} />
    },
    {
      title: "Virtual E-Design",
      desc: "Remote design services including mood boards, shopping lists, and layout guides for clients who want to implement designs at their own pace.",
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
      icon: <Layout size={20} />
    }
  ];

  return (
    <section id="services" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-4 italic">Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">Our Expertise</h2>
          <div className="w-12 h-1 bg-stone-900 mx-auto mb-8"></div>
          <p className="text-stone-500 leading-relaxed text-lg font-light">
            Tailored design solutions for every stage of your lifestyle journey. 
            From a single-room refresh to full-scale architectural renovations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {services.map((service, index) => (
            <div key={index} className="group flex flex-col h-full">
              
              {/* Image Container with Zoom & Lift Effect */}
              <div className="overflow-hidden mb-8 h-80 rounded-sm shadow-lg relative bg-stone-200">
                {/* Floating Icon Badge */}
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-sm text-stone-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {service.icon}
                </div>
                
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-all z-10 duration-700"></div>
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-2xl font-serif text-stone-900 mb-4 group-hover:italic transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-stone-500 mb-8 leading-relaxed text-base font-light flex-grow">
                  {service.desc}
                </p>
                
                {/* CTA Link */}
                <div>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center text-stone-900 uppercase text-[10px] tracking-[0.2em] font-bold border-b border-stone-200 pb-2 hover:border-stone-900 transition-all duration-300"
                  >
                    Inquire Service <ArrowRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;