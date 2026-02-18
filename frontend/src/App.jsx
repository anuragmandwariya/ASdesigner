import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Import Admin & Feature Components
import AdminUpload from './components/AdminUpload';
import Login from './components/Login';
import ProjectDetails from './components/ProjectDetails'; // <--- 1. NEW IMPORT

// 1. The Main Website Layout
const Home = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Services />
    <Portfolio />
    <Contact />
    <Footer />
  </>
);

// 2. The Security Guard Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

function App() {
  return (
    <div className="font-sans antialiased text-stone-800 selection:bg-accent-gold selection:text-white">
      <Routes>
        
        {/* Route 1: The Main Website (Public) */}
        <Route path="/" element={<Home />} />

        {/* Route 2: The Login Page (Public) */}
        <Route path="/admin" element={<Login />} />

        {/* Route 3: The Project Details Page (Public) */}
        {/* This ":id" part tells React to capture whatever ID is in the URL */}
        <Route path="/project/:id" element={<ProjectDetails />} /> 

        {/* Route 4: The Secret Dashboard (Protected) */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminUpload />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </div>
  );
}

export default App;