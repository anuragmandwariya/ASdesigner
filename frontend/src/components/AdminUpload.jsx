import React, { useState, useEffect } from 'react';
import { Upload, Plus, LogOut, ArrowLeft, Trash2, MapPin, Loader2 } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config'; 

const AdminUpload = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Residential');
  const [location, setLocation] = useState('');
  const [files, setFiles] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  
  const navigate = useNavigate();

  // Token verify karne ke liye logic
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    // Agar token nahi hai toh seedha login par bhej do
    if (!token) {
      navigate('/admin');
    } else {
      fetchProjects();
    }
  }, [token, navigate]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Security: Token header mein bhejein
        }
      });

      if (res.ok) {
        setProjects(projects.filter(p => p._id !== id));
      } else {
        alert("Error deleting project. Make sure you are logged in.");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please select at least one image");
    
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('location', location);
    
    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // Security: Token header mein bhejein
        },
        body: formData,
      });
      
      if (res.ok) {
        setTitle('');
        setLocation('');
        setFiles([]);
        fetchProjects(); 
        alert('✅ Project Uploaded Successfully!');
      } else {
        alert('❌ Upload failed. Check server logs.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-50 py-12 border-t-4 border-stone-900 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex justify-between items-center max-w-5xl mx-auto mb-10">
            <button onClick={() => navigate('/')} className="flex items-center text-stone-500 hover:text-stone-900 font-bold text-xs uppercase tracking-[0.2em] transition">
                <ArrowLeft size={16} className="mr-2" /> Back to Home
            </button>
            <h1 className="font-serif text-2xl hidden md:block">ADMIN DASHBOARD</h1>
            <button onClick={handleLogout} className="flex items-center text-red-600 hover:text-red-800 font-bold text-xs uppercase tracking-[0.2em] transition">
                <LogOut size={16} className="mr-2" /> Logout
            </button>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          {/* LEFT SIDE: Upload Form (40% width) */}
          <div className="lg:col-span-2 bg-white p-8 shadow-2xl rounded-sm h-fit sticky top-24">
            <div className="flex items-center mb-8 border-b border-stone-100 pb-4">
              <div className="bg-stone-900 p-2 rounded-sm text-white mr-4">
                <Upload size={20} />
              </div>
              <h2 className="text-xl font-serif text-stone-900">Add New Project</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Project Title</label>
                <input type="text" placeholder="e.g. Modern Villa" className="w-full p-3 border border-stone-200 outline-none focus:border-stone-900 transition" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Location</label>
                <input type="text" placeholder="e.g. Indore, MP" className="w-full p-3 border border-stone-200 outline-none focus:border-stone-900 transition" value={location} onChange={e => setLocation(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Category</label>
                <select className="w-full p-3 border border-stone-200 bg-white outline-none focus:border-stone-900" value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Office">Office Space</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Project Photos</label>
                <div className="border-2 border-dashed border-stone-200 p-6 text-center hover:border-stone-400 transition cursor-pointer relative">
                  <input type="file" multiple onChange={e => setFiles(e.target.files)} required accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Upload size={24} className="mx-auto text-stone-300 mb-2" />
                  <p className="text-xs text-stone-500">{files.length > 0 ? `${files.length} images selected` : 'Drop images or click to browse'}</p>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 bg-stone-900 text-white font-bold uppercase tracking-widest hover:bg-stone-700 transition flex justify-center items-center disabled:bg-stone-300">
                 {loading ? <Loader2 className="animate-spin" /> : <><Plus size={18} className="mr-2" /> Publish Project</>}
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: Manage Existing Projects (60% width) */}
          <div className="lg:col-span-3 bg-white p-8 shadow-2xl rounded-sm">
            <div className="flex justify-between items-center mb-8 border-b border-stone-100 pb-4">
                <h2 className="text-xl font-serif text-stone-900">Live Portfolio ({projects.length})</h2>
                <div className="w-10 h-1 bg-stone-900"></div>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              {projects.length === 0 && (
                <div className="text-center py-20 text-stone-300 italic">No projects found. Start by uploading one.</div>
              )}
              
              {projects.map((project) => (
                <div key={project._id} className="group flex items-center justify-between p-4 border border-stone-50 shadow-sm hover:shadow-md transition-all bg-stone-50 rounded-sm">
                  <div className="flex items-center space-x-4">
                    <div className="relative overflow-hidden w-16 h-16 bg-stone-200 rounded-sm">
                      <img 
                        src={project.images && project.images[0]} 
                        alt="thumb" 
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                      />
                    </div>
                    <div>
                      <h4 className="bold text-stone-900 text-sm font-bold uppercase tracking-tight">{project.title}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-[10px] bg-stone-200 px-2 py-0.5 rounded-full text-stone-600 mr-2 uppercase">{project.category}</span>
                        <p className="text-[10px] text-stone-400 flex items-center"><MapPin size={10} className="mr-1"/> {project.location}</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDelete(project._id)}
                    className="text-stone-300 hover:text-red-600 hover:bg-red-50 transition-all p-3 rounded-full"
                    title="Delete Project"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminUpload;