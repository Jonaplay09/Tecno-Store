// Navbar.jsx
import { Link } from 'react-router-dom';

import './Navbar.css'; // Asegúrate de crear este archivo CSS

const Navbar = ({ menuItems }) => {
  return (
    <nav className="navbar">
      {menuItems.map((item, index) => (
        <Link key={index} to={item.path} className="navbar__item">
          {item.label}
        </Link>
      ))}
    </nav>
  );
};


export default Navbar;
