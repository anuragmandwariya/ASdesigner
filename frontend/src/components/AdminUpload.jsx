import React, { useState, useEffect } from 'react';
import { Upload, Plus, LogOut, ArrowLeft, Trash2, MapPin } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
// 1. Config file ko import karein
import API_BASE_URL from '../config'; 

const AdminUpload = () => {
  // Upload State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Residential');
  const [location, setLocation] = useState('');
  const [files, setFiles] = useState([]); 
  const [loading, setLoading] = useState(false);

  // Manage Projects State
  const [projects, setProjects] = useState([]);
  
  const navigate = useNavigate();

  // Fetch Projects on Load
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // 2. Use API_BASE_URL
      const res = await fetch(`${API_BASE_URL}/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Delete Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      // 3. Use API_BASE_URL for Delete
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert("🗑️ Project Deleted");
        setProjects(projects.filter(p => p._id !== id));
      } else {
        alert("Error deleting project");
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
    setLoading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('location', location);
    
    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }

    try {
      // 4. Use API_BASE_URL for Upload
      const res = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        alert('✅ Project Uploaded Successfully!');
        setTitle('');
        setLocation('');
        setFiles([]);
        fetchProjects(); 
      } else {
        alert('❌ Upload failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-100 py-12 border-t-4 border-accent-gold min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
            <button onClick={() => navigate('/')} className="flex items-center text-stone-500 hover:text-stone-900 font-bold text-xs uppercase tracking-widest transition">
                <ArrowLeft size={16} className="mr-2" /> Back to Home
            </button>
            <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-700 font-bold text-xs uppercase tracking-widest transition">
                <LogOut size={16} className="mr-2" /> Logout
            </button>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT SIDE: Upload Form */}
          <div className="bg-white p-8 shadow-lg rounded-sm h-fit">
            <div className="flex items-center mb-6">
              <div className="bg-stone-900 p-2 rounded-full text-white mr-4">
                <Upload size={20} />
              </div>
              <h2 className="text-xl font-serif text-stone-900">Upload New</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Title" className="w-full p-3 border border-stone-300" value={title} onChange={e => setTitle(e.target.value)} required />
              <input type="text" placeholder="Location" className="w-full p-3 border border-stone-300" value={location} onChange={e => setLocation(e.target.value)} required />
              <select className="w-full p-3 border border-stone-300 bg-white" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
              </select>

              <div className="border-2 border-dashed border-stone-300 p-4 text-center">
                <input type="file" multiple onChange={e => setFiles(e.target.files)} required accept="image/*" className="w-full text-sm" />
                <p className="text-xs text-stone-400 mt-2">{files.length > 0 ? `${files.length} selected` : 'Select multiple photos'}</p>
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 bg-stone-900 text-white font-bold uppercase tracking-widest hover:bg-accent-gold transition">
                 {loading ? 'Uploading...' : <><Plus size={18} className="mr-2 inline" /> Add Project</>}
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: Manage Existing Projects */}
          <div className="bg-white p-8 shadow-lg rounded-sm">
            <h2 className="text-xl font-serif text-stone-900 mb-6">Manage Projects ({projects.length})</h2>
            
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {projects.length === 0 && <p className="text-stone-400 text-sm">No projects yet.</p>}
              
              {projects.map((project) => (
                <div key={project._id} className="flex items-center justify-between p-3 border border-stone-100 shadow-sm hover:shadow-md transition bg-stone-50">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={project.images && project.images[0]} 
                      alt="thumb" 
                      className="w-12 h-12 object-cover rounded-sm bg-stone-200"
                    />
                    <div>
                      <h4 className="font-bold text-stone-800 text-sm">{project.title}</h4>
                      <p className="text-xs text-stone-500 flex items-center"><MapPin size={10} className="mr-1"/> {project.location}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDelete(project._id)}
                    className="text-stone-400 hover:text-red-600 transition p-2"
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