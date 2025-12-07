import React from 'react'

export default function Button({ text, handleClick, disabled }) {
  const baseClass =
    'f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4'
  const classes = disabled ? `${baseClass} o-50` : baseClass

  const onClick = (e) => {
    e.preventDefault()
    if (!disabled && handleClick) {
      handleClick()
    }
  }

  return (
    <a href="#" className={classes} onClick={onClick}>
      <span className="pl1">{text}</span>
    </a>
  )
}
