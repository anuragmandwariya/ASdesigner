import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Tag } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams(); 
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p._id === id);
        setProject(found);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (loading) return <div className="h-screen flex justify-center items-center">Loading...</div>;
  if (!project) return <div className="h-screen flex justify-center items-center">Project not found</div>;

  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* Navbar Placeholder / Back Button */}
      <div className="bg-white p-6 shadow-sm flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="flex items-center text-stone-600 hover:text-stone-900 font-bold uppercase tracking-widest text-xs">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        <span className="font-serif text-xl font-bold">AS INTERIOR</span>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="bg-white shadow-2xl rounded-sm overflow-hidden">
          
          {/* 1. HERO IMAGE (Updated: Half Width & Centered) */}
          {/* 'md:w-1/2' makes it 50% width on desktop, 'mx-auto' centers it */}
          <div className="h-[60vh] w-full md:w-1/2 mx-auto bg-stone-100 relative mt-8 shadow-sm">
             {project.images && project.images.length > 0 ? (
                <img 
                  src={project.images[0]} 
                  alt={project.title} 
                  // Changed to object-cover so it fills the half-width box beautifully
                  className="w-full h-full object-cover" 
                />
             ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400">
                    No Image Available
                </div>
             )}
          </div>

          <div className="p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
              
              {/* Category & Location Tags */}
              <div className="flex space-x-6 text-accent-gold uppercase tracking-widest text-xs font-bold mb-6">
                <span className="flex items-center"><Tag size={14} className="mr-2" /> {project.category}</span>
                <span className="flex items-center"><MapPin size={14} className="mr-2" /> {project.location}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-8">{project.title}</h1>
              
              <div className="w-20 h-1 bg-accent-gold mb-10"></div>

              <p className="text-stone-600 leading-loose text-lg mb-12">
                This project represents our commitment to blending modern aesthetics with functional living. 
                Every detail, from the lighting fixtures to the material selection, was carefully curated to 
                create a space that feels both luxurious and inviting. The {project.category.toLowerCase()} design 
                focuses on open spaces, natural light, and a harmonious color palette.
              </p>

              {/* 2. GALLERY GRID (Shows remaining images) */}
              {project.images && project.images.length > 1 && (
                  <div className="mb-16">
                    <h3 className="text-2xl font-serif text-stone-900 mb-6">Project Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Slice(1) skips the first image because it's already shown at the top */}
                        {project.images.slice(1).map((img, index) => (
                            <div key={index} className="overflow-hidden shadow-md hover:shadow-xl transition duration-500 rounded-sm">
                                <img 
                                    src={img} 
                                    alt={`Gallery ${index}`} 
                                    className="w-full h-80 object-cover hover:scale-105 transition duration-700"
                                />
                            </div>
                        ))}
                    </div>
                  </div>
              )}

              {/* Inquiry Button */}
              <div className="border-t border-stone-200 pt-10 text-center">
                <h3 className="text-2xl font-serif mb-4 text-stone-800">Interested in a similar design?</h3>
                <Link to="/#contact" className="inline-block bg-stone-900 text-white px-10 py-4 uppercase tracking-widest text-sm hover:bg-accent-gold transition duration-300 font-bold rounded-sm">
                  Book a Consultation
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;