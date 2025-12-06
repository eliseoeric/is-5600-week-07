import React from 'react';

export default function Button({ text, handleClick, disabled }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault(); 
        if (!disabled) handleClick();
      }}
      className={`f5 no-underline black inline-flex items-center pa3 ba border-box mr4 
        ${disabled ? 'bg-light-gray black pointer-events-none' : 'bg-animate hover-bg-black hover-white'}`}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <span className="pl1">{text}</span>
    </a>
  );
}
