// InputField.jsx
import React from 'react';
import './InputField.css'; // Asegúrate de crear este archivo CSS

const InputField = ({ type, placeholder, value, onChange, icon, onIconClick }) => {
  return (
    <div className="input-field">
      <input
        type={type}
        className="input-field__input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {icon && (
        <img
          src={icon}
          alt="Icono"
          className="input-field__icon"
          onClick={onIconClick}
          style={{ opacity: type === 'text' ? '1' : '0.5' }}
        />
      )}
    </div>
  );
};

export default InputField;
