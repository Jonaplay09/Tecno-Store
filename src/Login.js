import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Button from './Button';
import logo from './TECNO.png';
import eyeClosed from './eye_closed.png';
import eyeOpen from './eye_icon.png';
import swal from 'sweetalert';
import './Login.css';


const Login = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isPassVisible, setIsPassVisible] = useState(false);

  const togglePassVisibility = () => {
    setIsPassVisible(!isPassVisible);
  };

  const toggleFormType = () => {
    setFormType(formType === 'login' ? 'register' : 'login');
  };

  const validarCorreo = (correo) => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
  };

  const validarContraseña = (contraseña) => {
    const regexContraseña = /^(?=.*[a-zA-Z\d])(?=.*[@$!%*?&]?)[A-Za-z\d@$!%*?&\S]{8,}$/;
    return regexContraseña.test(contraseña);
  };


  const handleLogin = () => {
    if (!email || !pass) {
      swal('Error', 'Por favor, rellena todos los campos.', 'error');
      return;
    }
    if (!validarCorreo(email) || !validarContraseña(pass)) {
      swal('Error', 'Por favor, introduce un correo electrónico y una contraseña válidos.', 'error');
      return;
    }
    if (!validarCorreo(email) || !validarContraseña(pass)) {
      swal('Error', 'Por favor, introduce un correo electrónico y una contraseña válidos.', 'error');
      return;
    }

    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, pass })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          console.log(data.token); // Imprime el token en la consola
          localStorage.setItem('token', data.token);
          localStorage.setItem('rol', data.usuario.rol);
          swal('Éxito', 'Inicio de sesión exitoso.', 'success')
            .then(() => {
              navigate('/HomePage'); // Redirige al usuario a la página de inicio
            })
            .catch(error => {
              console.error('Error:', error);
            });
        } else {
          swal('Error', 'Inicio de sesión fallido. Por favor, verifica tus credenciales.', 'error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  const handleRegister = () => {

    if (!username || !email || !pass) {
      swal('Error', 'Por favor, rellena todos los campos.', 'error');
      return;
    }
    if (!validarCorreo(email) || !validarContraseña(pass)) {
      swal('Error', 'Por favor, introduce un correo electrónico y una contraseña válidos.', 'error');
      return;
    }
    if (!validarCorreo(email) || !validarContraseña(pass)) {
      swal('Error', 'Por favor, introduce un correo electrónico y una contraseña válidos.', 'error');
      return;
    }

    fetch('http://localhost:5000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, pass, rol: 'user' })
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          swal('Éxito', 'Registro exitoso. Ahora puedes iniciar sesión.', 'success')
            .then(() => {
              setFormType('login'); // Cambia a la pantalla de inicio de sesión
            });
        } else {
          swal('Error', 'Registro fallido. Por favor, intenta de nuevo.', 'error');
        }
      });
  };



  return (
    <div className="login">
      <div className="login__logo-container">
        <img src={logo} alt="Logo Tecno Store" className="login__logo" />
      </div>
      <h1 className="login__title">{formType === 'login' ? 'Iniciar Sesión' : 'Regístrate'}</h1>
      {formType === 'register' && (
        <InputField
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <InputField
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type={isPassVisible ? 'text' : 'password'}
        placeholder="Contraseña"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        icon={isPassVisible ? eyeOpen : eyeClosed}
        onIconClick={togglePassVisibility}
      />

      <Button onClick={formType === 'login' ? handleLogin : handleRegister}>
        {formType === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
      </Button>
      <p className="login__register">
        {formType === 'login' ? 'No tienes una cuenta?' : 'Ya tienes una cuenta?'}
        <span onClick={toggleFormType} className="login__register-link">
          {formType === 'login' ? 'Regístrate' : 'Iniciar Sesión'}
        </span>
      </p>
    </div>
  );
};

export default Login;
