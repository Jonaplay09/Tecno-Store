import React, { useRef, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Button from './Button';
import './HomePage.css';
import laptop from './laptop.jpeg';
import speaker from './speaker.jpg';
import phone from './phone.jpg';
import logo from './tecnov.png';
import twitterIcon from './twitter.png';
import facebookIcon from './facebook.png';
import youtubeIcon from './youtube.png';

const HomePage = () => {
  const productsRef = useRef(null);
  const rol = localStorage.getItem('rol');
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error:', error));

    fetch('http://localhost:5000/api/categorias')
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error:', error));
  }, []);

  let menuItems = [
    { label: 'Inicio', path: '/HomePage' },
    { label: 'Cuenta', path: '/cuenta' },
    { label: 'Acerca de', path: '/acerca-de' },
  ];

  if (rol === 'admin') {
    menuItems.splice(1, 0, { label: 'Productos', path: '/productos' });
  }

  const scrollToProducts = () => {
    productsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const productosFiltrados = productos.filter(producto => !categoriaFiltro || producto.categoria_id === Number(categoriaFiltro));

  return (
    <div className="home-page">
      <div className="main-content">
        <header className="home-page__header">
          <img src={logo} alt="Logo" className="home-page__logo" />
          <Navbar menuItems={menuItems} />
        </header>
        <section className="home-page__banner">
          <h2 className="home-page__title">Tecnología al alcance de tu mano</h2>
          <p className="home-page__description">
            Descubre la última palabra en innovación en Tecno Store, tu destino definitivo para los gadgets más modernos y la tecnología de punta. Desde smartphones hasta sistemas de sonido, nuestra selección exclusiva está diseñada para enriquecer tu vida diaria y llevarte al siguiente nivel de la experiencia digital. Con Tecno Store, estás a un clic de lo extraordinario.
          </p>
          <a href="#productos-disponibles">
            <Button onClick={scrollToProducts}>Descubre nuestros productos</Button>
          </a>
        </section>
        <div className="home-page__products-section" ref={productsRef}>
          <div className="home-page__images">
            <img src={laptop} alt="Producto 1" className="home-page__product-image" />
            <img src={phone} alt="Producto 2" className="home-page__product-image" />
            <img src={speaker} alt="Producto 3" className="home-page__product-image" />
          </div>
        </div>
        <div className="home-page__products-section" id="productos-disponibles">
          <h2 className="home-page__products-title">Productos Disponibles</h2>
          <select onChange={(e) => setCategoriaFiltro(e.target.value)}>
            <option value="">Todas las categorías</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div className="product-item" key={producto.id}>
                <h3 className="product-item__nombre">{producto.nombre}</h3>
                <p className="product-item__precio">${producto.precio}</p>
                <p className="product-item__fabricante">{producto.fabricante}</p>
                <p className="product-item__descripcion">{producto.descripcion}</p>
                <Button>Comprar</Button>
              </div>
            ))
          ) : (
            <p className="no-productos">No existen productos en esta categoría</p>
          )}
        </div>
      </div>
      <footer className="home-page__footer">
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

export default HomePage;
