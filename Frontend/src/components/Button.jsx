import React from 'react';
import './Button.css';

export default function Button({ children, onClick, type= 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
