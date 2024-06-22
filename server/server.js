const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const expressJwt = require('express-jwt');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'TecnoStoreDB'
});
const claveSecreta = crypto.randomBytes(32).toString('hex');
console.log(claveSecreta);

const claveSecreta2 = crypto.randomBytes(32).toString('hex');
console.log(claveSecreta2);

// Ruta para obtener productos
app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM productos', (error, resultados) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
    res.json(resultados);
  });
});

// Ruta para crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre, fabricante, descripcion, precio, categoria_id } = req.body;
  const query = 'INSERT INTO productos (nombre,  fabricante, descripcion, precio, categoria_id) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, fabricante, descripcion, precio, categoria_id], (error, resultado) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
    res.json({ id: resultado.insertId, nombre, fabricante, descripcion, precio, categoria_id });
  });
});

// Ruta para actualizar un producto
app.put('/api/productos/:id', (req, res) => {
  const { nombre, fabricante, descripcion, precio, categoria_id } = req.body;
  const query = 'UPDATE productos SET nombre = ?, fabricante = ?, descripcion = ?, precio = ?, categoria_id = ? WHERE id = ?';
  db.query(query, [nombre, fabricante, descripcion, precio, categoria_id, req.params.id], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
    res.json({ id: req.params.id, nombre, fabricante, descripcion, precio, categoria_id });
  });
});

// Ruta para eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const query = 'DELETE FROM productos WHERE id = ?';
  db.query(query, [req.params.id], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
    res.json({ id: req.params.id });
  });
});

// Ruta para el registro de usuarios
app.post('/api/usuarios', (req, res) => {
    const { username, email, pass, rol } = req.body;
    // Hashea la contraseña antes de guardarla en la base de datos
    bcrypt.hash(pass, 10, (error, hash) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error });
      }
      const query = 'INSERT INTO usuarios (username, email, pass, rol) VALUES (?, ?, ?, ?)';
      db.query(query, [username, email, hash, rol], (error, resultado) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error });
        }
        res.json({ id: resultado.insertId, username, email, rol });
      });
    });
  });

  // Ruta para obtener categorías
app.get('/api/categorias', (req, res) => {
  db.query('SELECT * FROM categorias', (error, resultados) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
    res.json(resultados);
  });
});


app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM productos', (error, resultados) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
    res.json(resultados);
  });
});



  app.post('/api/login', (req, res) => {
    const { email, pass } = req.body;

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], (error, resultados) => {
      if (error || resultados.length === 0) {
        console.error(error);
        return res.status(401).json({ error: 'Autenticación fallida' });
      }
      bcrypt.compare(pass, resultados[0].pass, (error, result) => {
        if (error || !result) {
          console.error(error);
          return res.status(401).json({ error: 'Autenticación fallida' });
        }
        const token = jwt.sign(
          { id: resultados[0].id, email: resultados[0].email, rol: resultados[0].rol },
          claveSecreta,
          { expiresIn: '1h' }
        );
        console.log(token); 
        res.json({ token: token, usuario: { id: resultados[0].id, username: resultados[0].username, email: resultados[0].email, rol: resultados[0].rol } });
      });
    });
  });

const verificarToken = expressJwt({
    secret: claveSecreta2,
    algorithms: ['HS256'],
    userProperty: 'auth'
  });

  const verificarAdmin = (req, res, next) => {
    if (!req.auth || req.auth.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
  };

  app.delete('/api/productos/:id', verificarToken, verificarAdmin, (req, res) => {

  });
  app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
