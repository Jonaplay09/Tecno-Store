import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './Login';
import HomePage from './HomePage'; 
import ProductPage from './ProductPage';
import DeleteProductPage from './DeleteProductPage';
import RegisterProductPage from './RegisterProductPage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/productos" element={<ProductPage />} /> 
        <Route path="/register-product" element={<RegisterProductPage/>} />
        <Route path="/delete-product" element={<DeleteProductPage/>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
