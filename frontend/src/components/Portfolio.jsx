import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config'; 

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const filters = ['All', 'Residential', 'Commercial'];

  return (
    <section id="portfolio" className="py-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold mb-4 italic">Discovery</p>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">Featured <br/> Portfolio</h2>
            <div className="w-12 h-1 bg-stone-900 mt-6"></div>
          </div>

          <div className="flex mt-10 md:mt-0 space-x-8">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-[11px] uppercase tracking-[0.2em] transition-all duration-500 font-bold ${
                  activeFilter === filter 
                    ? 'text-stone-900 border-b-2 border-stone-900 pb-1' 
                    : 'text-stone-300 hover:text-stone-500'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State with Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="animate-spin text-stone-300" size={40} />
            <p className="text-[10px] uppercase tracking-widest text-stone-400">Syncing Collection...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-32 border border-stone-100 bg-stone-50/50">
            <p className="font-serif text-2xl text-stone-400">The gallery is currently empty.</p>
            <p className="text-stone-400 text-sm mt-3 tracking-wide">Please check back soon for our latest interior transformations.</p>
          </div>
        )}

        {/* The Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, index) => (
            <Link 
              to={`/project/${project._id}`} 
              key={project._id} 
              className="group block animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-[4/5] bg-stone-100"> 
                
                {/* Image Component */}
                <img 
                  src={project.images && project.images.length > 0 ? project.images[0] : 'https://via.placeholder.com/800x1000'} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-110" 
                  loading="lazy"
                />
                
                {/* Minimal Overlay - Shows on Hover */}
                <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/70 mb-2 font-bold">{project.category}</p>
                    <h3 className="text-2xl font-serif text-white mb-6 leading-tight">{project.title}</h3>
                    <div className="flex items-center text-white/90 text-[10px] uppercase tracking-widest">
                        <MapPin size={12} className="mr-2" /> {project.location}
                    </div>
                  </div>
                </div>

                {/* Corner Decorative Element */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-8 h-8 border-t border-r border-white/50"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-16 text-center lg:hidden">
           <button className="text-[11px] uppercase tracking-[0.3em] font-bold border-b border-stone-900 pb-2 flex items-center mx-auto">
            Explore All Work <ArrowRight size={14} className="ml-2" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;