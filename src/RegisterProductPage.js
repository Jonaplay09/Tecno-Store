import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Button from './Button';
import InputField from './InputField';
import './ProductPage.css';
import logo from './tecnov.png';
import twitterIcon from './twitter.png';
import facebookIcon from './facebook.png';
import youtubeIcon from './youtube.png';
import swal from 'sweetalert';

const RegisterProductPage = () => {
  const [nombre, setNombre] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria_id, setCategoriaId] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const rol = localStorage.getItem('rol'); 

  let menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Cuenta', path: '/cuenta' },
    { label: 'Acerca de', path: '/acerca-de' },
  ];

  if (rol === 'admin') {
    menuItems.splice(1, 0, { label: 'Productos', path: '/productos' });
  }   

  useEffect(() => {
    fetch('http://localhost:5000/api/categorias')
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleRegister = () => {
    if (!nombre || !fabricante || !descripcion || !precio || !categoria_id) {
      swal('Error', 'Por favor, rellena todos los campos y selecciona una categoría.', 'error');
      return;
    }
  
    if (isNaN(precio) || !Number(precio)) {
      swal('Error', 'Por favor, introduce un número válido para el precio.', 'error');
      return;
    }
  
    const producto = { nombre, fabricante, descripcion, precio, categoria_id };
  
    fetch('http://localhost:5000/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          console.log('Producto creado con éxito:', data);
          swal('Éxito', 'Producto creado con éxito.', 'success');
        } else {
          console.error('Error al crear el producto:', data);
          swal('Error', 'Error al crear el producto. Por favor, intenta de nuevo.', 'error');
        }
      })
      .catch(error => {
        console.error('Error de red:', error);
        swal('Error', 'Error de red. Por favor, verifica tu conexión a internet e intenta de nuevo.', 'error');
      });
  };

  return (
    <div className="product-page">
      <header className="product-page__header">
        <img src={logo} alt="Logo" className="product-page__logo" />
        <Navbar menuItems={menuItems} />
      </header>
      <section className="product-page__banner">
        <h2 className="product-page__title">Registrar Producto</h2>
        <InputField
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Fabricante"
          value={fabricante}
          onChange={(e) => setFabricante(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <InputField
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <select value={categoria_id} onChange={(e) => setCategoriaId(e.target.value)}>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        <Button onClick={handleRegister}>Registrar</Button>
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

export default RegisterProductPage;
