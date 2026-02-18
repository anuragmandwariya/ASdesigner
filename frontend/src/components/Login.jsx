import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
// 1. Config file ko import karein
import API_BASE_URL from '../config'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 2. Localhost ki jagah API_BASE_URL ka use karein
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        alert('Login Successful!');
        navigate('/admin/dashboard'); 
      } else {
        alert('❌ Invalid Credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Server Error: Connection failed');
    }
  };

  return (
    <div className="h-screen bg-stone-100 flex justify-center items-center">
      <form onSubmit={handleLogin} className="bg-white p-10 shadow-xl rounded-sm w-96">
        <div className="flex justify-center mb-6 text-stone-900">
          <div className="bg-stone-200 p-3 rounded-full">
             <Lock size={30} />
          </div>
        </div>
        <h2 className="text-2xl font-serif text-center mb-6 text-stone-800">Admin Access</h2>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full p-3 border border-stone-300 outline-none focus:border-accent-gold"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border border-stone-300 outline-none focus:border-accent-gold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-stone-900 text-white py-3 hover:bg-accent-gold transition font-bold uppercase tracking-widest text-sm">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;