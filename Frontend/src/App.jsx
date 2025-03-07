import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path='/greatdesigns' element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
