import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Linkedin, CheckCircle, Loader2 } from 'lucide-react';
// 1. Config file ko import karein
import API_BASE_URL from '../config'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // 2. Localhost ki jagah dynamic API_BASE_URL use karein
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("Contact Error:", error);
      setStatus('error');
      alert("Server is waking up or connection failed. Please try again in a moment.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-stone-900 text-white">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Contact Information */}
        <div className="space-y-12">
          <div>
            <h2 className="text-5xl font-serif mb-6 leading-tight">Let's Build Something <span className="italic text-stone-400">Beautiful</span></h2>
            <div className="w-20 h-1 bg-white mb-8"></div>
            <p className="text-stone-400 text-lg max-w-md leading-relaxed">
              Ready to start your design journey? Contact us for a consultation or a custom quote for your space.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start group">
              <div className="bg-stone-800 p-4 rounded-sm mr-6 text-white group-hover:bg-white group-hover:text-stone-900 transition-colors duration-500">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="uppercase tracking-[0.2em] text-[10px] font-bold text-stone-500 mb-2">Studio Address</h4>
                <p className="text-lg text-stone-200">Janjeerwala Chouraha, Race Course Road,<br/> Indore, Madhya Pradesh 452003 </p>
              </div>
            </div>
            
            <div className="flex items-center group">
              <div className="bg-stone-800 p-4 rounded-sm mr-6 text-white group-hover:bg-white group-hover:text-stone-900 transition-colors duration-500">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="uppercase tracking-[0.2em] text-[10px] font-bold text-stone-500 mb-2">Call Us</h4>
                <p className="text-lg text-stone-200">+91 8435161766</p>
              </div>
            </div>

            <div className="flex items-center group">
              <div className="bg-stone-800 p-4 rounded-sm mr-6 text-white group-hover:bg-white group-hover:text-stone-900 transition-colors duration-500">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="uppercase tracking-[0.2em] text-[10px] font-bold text-stone-500 mb-2">Email Inquiry</h4>
                <p className="text-lg text-stone-200">asinterior@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-6 pt-6">
            {[Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="p-4 border border-stone-800 rounded-full hover:bg-white hover:text-stone-900 transition-all duration-500 transform hover:-translate-y-1">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="bg-white p-10 md:p-14 rounded-sm shadow-2xl text-stone-900 relative overflow-hidden">
          
          {/* Success Overlay */}
          {status === 'success' && (
            <div className="absolute inset-0 bg-stone-50 flex flex-col justify-center items-center z-20 text-center p-10 animate-fade-in">
              <div className="bg-stone-900 p-5 rounded-full text-white mb-6">
                <CheckCircle size={50} />
              </div>
              <h3 className="text-3xl font-serif text-stone-900 mb-4">Message Received</h3>
              <p className="text-stone-500 mb-8 leading-relaxed">Thank you for reaching out to AS Interior. We will review your inquiry and get back to you shortly.</p>
              <button 
                onClick={() => setStatus('idle')} 
                className="text-stone-900 font-bold uppercase text-xs tracking-widest border-b-2 border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-400 transition-all"
              >
                Send Another Message
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <input 
                  type="text" 
                  name="firstName"
                  required
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border-b border-stone-200 py-3 bg-transparent focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300" 
                />
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border-b border-stone-200 py-3 bg-transparent focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300" 
                />
              </div>
            </div>
            
            <div className="relative">
              <input 
                type="email" 
                name="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-stone-200 py-3 bg-transparent focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300" 
              />
            </div>

            <div className="relative">
              <textarea 
                rows="4" 
                name="message"
                required
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                className="w-full border-b border-stone-200 py-3 bg-transparent focus:outline-none focus:border-stone-900 transition-colors resize-none placeholder:text-stone-300"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full py-5 bg-stone-900 text-white uppercase tracking-[0.3em] text-xs transition-all duration-500 font-bold flex justify-center items-center hover:bg-stone-800 disabled:bg-stone-300"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Sending...
                </>
              ) : 'Send Message'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;