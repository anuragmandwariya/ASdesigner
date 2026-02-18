import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Tag, Loader2 } from 'lucide-react';
import API_BASE_URL from '../apiConfig'; 

const ProjectDetails = () => {
  const { id } = useParams(); 
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to get correct image URL
  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/800x600?text=No+Image';
    // Agar path already full URL hai (Cloudinary/S3), toh wahi return karo
    if (path.startsWith('http')) return path;
    // Agar relative path hai, toh use Backend URL ke 'uploads' folder se jodo
    // Note: API_BASE_URL usually ends with '/api', so we clean it to get the Root URL
    const rootURL = API_BASE_URL.replace('/api', '');
    return `${rootURL}/${path}`;
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/projects`);
        const data = await res.json();
        // Specific project find karein
        const found = data.find(p => p._id === id);
        setProject(found);
      } catch (err) {
        console.error("Error fetching project details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-stone-50">
        <Loader2 className="animate-spin text-stone-400 mb-4" size={40} />
        <p className="text-stone-500 uppercase tracking-widest text-xs">Loading Masterpiece...</p>
      </div>
    );
  }

  if (!project) return <div className="h-screen flex justify-center items-center">Project not found</div>;

  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* Navbar / Back Button */}
      <div className="bg-white p-6 shadow-sm flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="flex items-center text-stone-600 hover:text-stone-900 font-bold uppercase tracking-widest text-xs transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        <span className="font-serif text-xl font-bold tracking-tight text-stone-900">AS INTERIOR.</span>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="bg-white shadow-2xl rounded-sm overflow-hidden animate-fade-in">
          
          {/* 1. HERO IMAGE (Main Project View) */}
          <div className="h-[50vh] md:h-[70vh] w-full bg-stone-100 relative group overflow-hidden">
             {project.images && project.images.length > 0 ? (
                <img 
                  src={getImageUrl(project.images[0])} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                />
             ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400">
                    No Image Available
                </div>
             )}
          </div>

          <div className="p-8 md:p-16 lg:p-24">
            <div className="max-w-4xl mx-auto">
              
              {/* Category & Location Tags */}
              <div className="flex flex-wrap gap-6 text-stone-400 uppercase tracking-[0.2em] text-[10px] font-bold mb-8">
                <span className="flex items-center border border-stone-200 px-3 py-1 rounded-full">
                  <Tag size={12} className="mr-2" /> {project.category}
                </span>
                <span className="flex items-center border border-stone-200 px-3 py-1 rounded-full">
                  <MapPin size={12} className="mr-2" /> {project.location}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8 leading-tight">{project.title}</h1>
              
              <div className="w-16 h-1 bg-stone-900 mb-12"></div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Description Text */}
                <div className="lg:col-span-2 text-stone-600 leading-loose text-lg space-y-6">
                  <p>
                    This {project.category.toLowerCase()} transformation in {project.location} showcases our 
                    dedication to minimalist luxury. By optimizing {project.title === 'Residential' ? 'living space' : 'workflow'}, 
                    we created an environment that balances aesthetic appeal with daily functionality.
                  </p>
                  <p className="font-light italic">
                    "Design is not just what it looks like and feels like. Design is how it works."
                  </p>
                </div>

                {/* Project Brief / Specs */}
                <div className="bg-stone-50 p-8 rounded-sm h-fit border-l-4 border-stone-900">
                   <h4 className="font-serif text-lg mb-4 text-stone-900">Project Brief</h4>
                   <ul className="text-xs space-y-3 uppercase tracking-widest text-stone-500 font-bold">
                      <li>Client: Private</li>
                      <li>Type: {project.category}</li>
                      <li>Location: {project.location}</li>
                      <li>Year: 2026</li>
                   </ul>
                </div>
              </div>

              {/* 2. GALLERY GRID */}
              {project.images && project.images.length > 1 && (
                  <div className="mt-20 mb-16">
                    <div className="flex items-center gap-4 mb-10">
                       <h3 className="text-2xl font-serif text-stone-900">Visual Gallery</h3>
                       <div className="flex-grow h-[1px] bg-stone-100"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.images.slice(1).map((img, index) => (
                            <div key={index} className="overflow-hidden shadow-lg group rounded-sm bg-stone-100">
                                <img 
                                    src={getImageUrl(img)} 
                                    alt={`Detail ${index}`} 
                                    className="w-full h-80 md:h-96 object-cover hover:scale-110 transition duration-[1.5s] ease-out grayscale-[20%] hover:grayscale-0"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                  </div>
              )}

              {/* Call to Action */}
              <div className="border-t border-stone-100 pt-16 text-center mt-20">
                <h3 className="text-3xl font-serif mb-6 text-stone-900">Start Your Own Transformation</h3>
                <p className="text-stone-500 mb-10 max-w-lg mx-auto">
                  Every space has a story. Let us help you tell yours with precision and elegance.
                </p>
                <Link to="/#contact" className="inline-block bg-stone-900 text-white px-12 py-5 uppercase tracking-[0.3em] text-[10px] hover:bg-stone-700 transition duration-500 font-bold rounded-sm shadow-xl">
                  Book A Design Consultation
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