// src/components/Button.js
import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick} style={{ padding: '10px', border: 'none', cursor: 'pointer' }}>
      <img src="https://thumbs.dreamstime.com/b/smart-phone-cartoon-thumb-up-white-background-48227025.jpg" alt="Button Icon" width="20" height="20" />
      {label}
    </button>
  );
};

export default Button;
