import React, { useState } from 'react';
import Navbar from './Navbar';
import Button from './Button';
import InputField from './InputField';
import './ProductPage.css'; // Importa el CSS de ProductPage
import logo from './tecnov.png';
import twitterIcon from './twitter.png';
import facebookIcon from './facebook.png';
import youtubeIcon from './youtube.png';

const DeleteProductPage = () => {
  const [nombre, setNombre] = useState('');

  const rol = localStorage.getItem('rol'); 

  let menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Cuenta', path: '/cuenta' },
    { label: 'Acerca de', path: '/acerca-de' },
  ];

  if (rol === 'admin') {
    menuItems.splice(1, 0, { label: 'Productos', path: '/productos' });
  }   

  const handleDelete = () => {

  };

  return (
    <div className="product-page">
      <header className="product-page__header">
        <img src={logo} alt="Logo" className="product-page__logo" />
        <Navbar menuItems={menuItems} />
      </header>
      <section className="product-page__banner">
        <h2 className="product-page__title">Eliminar Producto</h2>
        <InputField
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <Button onClick={handleDelete}>Eliminar producto</Button>
      </section>
      <footer className="product-page__footer">
        <div className="footer__brand">
          <h1>Tecno Store</h1>
        </div>
        <div className="footer__social-media">
          <h3>Nuestras Redes</h3>
          <img src={twitterIcon} alt="Twitter" className="social-icon" />
          <img src={facebookIcon} alt="Facebook" className="social-icon" />
          <img src={youtubeIcon} alt="YouTube" className="social-icon" />
        </div>
        <div className="footer__contact">
          <h3>Contáctanos</h3>
          <p>info@tecnostore.com</p>
          <p>+52 6743243651</p>
        </div>
      </footer>
    </div>
  );
};

export default DeleteProductPage;
