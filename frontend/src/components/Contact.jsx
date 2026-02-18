import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Linkedin, CheckCircle } from 'lucide-react';

const Contact = () => {
  // 1. State to store input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // 2. State to handle submission status
  const [status, setStatus] = useState('idle'); // Options: 'idle' | 'submitting' | 'success'

  // 3. Update state when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 4. Handle the Submit Logic (Real Backend Connection)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Sending data to our new Backend API
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' }); // Clear form
      } else {
        alert("Failed to send message.");
        setStatus('idle');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server. Make sure the backend is running on port 5000.");
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="py-20 bg-stone-dark text-white">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Contact Information */}
        <div>
          <h2 className="text-4xl font-serif mb-6">Let's Build Something Beautiful</h2>
          <p className="text-stone-400 mb-10 max-w-md">
            Ready to start your design journey? Contact us for a consultation or quote.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-stone-800 p-3 rounded-full mr-4 text-accent-gold">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="uppercase tracking-widest text-sm text-stone-400 mb-1">Studio</h4>
                <p className="text-lg">Janjeerwala Chouraha, Race Course Road,<br/> Indore, Madhya Pradesh 452003 </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-stone-800 p-3 rounded-full mr-4 text-accent-gold">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="uppercase tracking-widest text-sm text-stone-400 mb-1">Phone</h4>
                <p className="text-lg">+91 8435161766</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-stone-800 p-3 rounded-full mr-4 text-accent-gold">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="uppercase tracking-widest text-sm text-stone-400 mb-1">Email</h4>
                <p className="text-lg">asinterior@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-10">
            {[Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="p-3 border border-stone-700 rounded-full hover:bg-accent-gold hover:border-accent-gold transition duration-300">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="bg-white p-8 md:p-10 rounded-sm shadow-2xl text-stone-800 relative overflow-hidden">
          
          {/* Success Overlay (Visible only after sending) */}
          {status === 'success' && (
            <div className="absolute inset-0 bg-stone-100 flex flex-col justify-center items-center z-10 text-center p-8 animate-fade-in">
              <div className="bg-green-100 p-4 rounded-full text-green-600 mb-4">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-2xl font-serif text-stone-800 mb-2">Message Sent!</h3>
              <p className="text-stone-500 mb-6">Thank you for reaching out. We will get back to you within 24 hours.</p>
              <button 
                onClick={() => setStatus('idle')} 
                className="text-accent-gold font-bold uppercase text-xs tracking-widest hover:underline"
              >
                Send Another Message
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-accent-gold transition" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-accent-gold transition" 
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-accent-gold transition" 
              />
            </div>
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Message</label>
              <textarea 
                rows="4" 
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-accent-gold transition"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className={`w-full py-4 uppercase tracking-widest text-sm transition duration-300 font-bold ${
                status === 'submitting' 
                  ? 'bg-stone-400 cursor-not-allowed text-white' 
                  : 'bg-stone-900 hover:bg-accent-gold text-white'
              }`}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;