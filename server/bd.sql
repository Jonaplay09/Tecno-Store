-- Crear la base de datos
DROP database TecnoStoreDB;
CREATE DATABASE TecnoStoreDB;


USE TecnoStoreDB;


CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    rol ENUM('user', 'admin') NOT NULL DEFAULT 'user'
);


CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);


CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);


-- cuenta admin por postman body raw http://localhost:5000/api/usuarios
/*
{
  "username": "admin",
  "email": "admin@gmail.com",
  "pass": "admin?123",
  "rol": "admin"
}

*/

INSERT INTO categorias (nombre) VALUES ('Celulares');
INSERT INTO categorias (nombre) VALUES ('Laptops');
INSERT INTO categorias (nombre) VALUES ('Tablets');
INSERT INTO categorias (nombre) VALUES ('Cámaras');
INSERT INTO categorias (nombre) VALUES ('Televisores');
INSERT INTO categorias (nombre) VALUES ('Audio');
INSERT INTO categorias (nombre) VALUES ('Videojuegos');
INSERT INTO categorias (nombre) VALUES ('Drones');
INSERT INTO categorias (nombre) VALUES ('Accesorios');



INSERT INTO productos (nombre, fabricante, descripcion, precio, categoria_id)
VALUES ('iPhone 13', 'Apple','El último modelo de iPhone.', 1000.00, 1);




