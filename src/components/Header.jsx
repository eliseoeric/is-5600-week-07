import React, {useContext} from 'react';
// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  

  const totalItems = 0;

export default function Header() {
  return (
    <nav className="dt w-100 border-box pa3 ph5-ns">
      <a className="dtc v-mid mid-gray link dim w-25" href="/" title="Home">
@@ -17,6 +20,13 @@ const Header = () => {
      </div>
    </nav>

    <header>
      <h1>My Shop</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
      </nav>
      <hr />
    </header>
  );
}

