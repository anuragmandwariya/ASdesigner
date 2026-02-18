import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react'; // Loader icon add kiya
import API_BASE_URL from '../config'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true); // Login start hote hi loading true

    try {
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
        alert(`❌ Error: ${data.message || 'Invalid Credentials'}`);
      }
    } catch (err) {
      console.error(err);
      // Render free tier par ye error aksar tab aata hai jab backend 'wake up' ho raha ho
      alert('Server is waking up or connection failed. Please try again in 30 seconds.');
    } finally {
      setIsLoggingIn(false); // Request khatam hone par loading false
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
            className="w-full p-3 border border-stone-300 outline-none focus:border-accent-gold transition-all"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoggingIn} // Loading ke waqt input disable
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border border-stone-300 outline-none focus:border-accent-gold transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggingIn}
            required
          />
          <button 
            type="submit" 
            disabled={isLoggingIn}
            className="w-full bg-stone-900 text-white py-3 hover:bg-accent-gold transition flex justify-center items-center font-bold uppercase tracking-widest text-sm disabled:bg-stone-400"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Verifying...
              </>
            ) : (
              'Login'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;