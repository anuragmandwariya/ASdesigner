import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
// 1. Config file ko import karein
import API_BASE_URL from '../config'; 

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch Projects from Backend (Dynamic URL)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Localhost ki jagah API_BASE_URL use karein
        const response = await fetch(`${API_BASE_URL}/projects`);
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
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
    <section id="portfolio" className="py-20 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-dark">Selected Works</h2>
            <div className="w-16 h-1 bg-accent-gold mt-4 mb-6"></div>
            
            <div className="flex space-x-6">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                    activeFilter === filter 
                      ? 'text-stone-900 font-bold border-b-2 border-accent-gold pb-1' 
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <a href="#" className="hidden md:flex items-center text-stone-600 hover:text-accent-gold transition duration-300">
            View All Projects <ArrowRight size={18} className="ml-2" />
          </a>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20 text-stone-400 flex flex-col items-center">
            <Loader className="animate-spin mb-4" />
            <p>Loading Projects...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-stone-200">
            <p className="text-stone-500 text-lg">No projects found.</p>
            <p className="text-stone-400 text-sm mt-2">Use the Admin Upload form in the dashboard to add your first work.</p>
          </div>
        )}

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            
            <Link to={`/project/${project._id}`} key={project._id} className="block">
              <div className="relative group overflow-hidden shadow-lg cursor-pointer bg-black h-96"> 
                
                {/* Image Logic */}
                <img 
                  src={project.images && project.images.length > 0 ? project.images[0] : ''} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-60" 
                />
                
                {/* Hover Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                  <h3 className="text-2xl font-serif text-white mb-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500 ease-out">
                    {project.title}
                  </h3>
                  <p className="text-accent-gold uppercase tracking-widest text-xs translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500 delay-100 ease-out">
                    {project.location}
                  </p>
                  <div className="mt-6 scale-0 group-hover:scale-100 transition duration-500 delay-200">
                     <span className="border border-white text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition">
                       View Project
                     </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
           <a href="#" className="inline-flex items-center text-stone-900 font-medium border-b border-stone-900 pb-1">
            View All Projects <ArrowRight size={16} className="ml-2" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;