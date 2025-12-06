
import React from 'react';
import { Link } from "react-router-dom";
import { useCart } from '../state/CartProvider';

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="dt w-100 border-box pa3 ph5-ns items-center">
      
      <Link className="dtc v-mid mid-gray link w-25" to="/" title="Home">
        <img
          src="/home.png"
          className="dib w3 h3 br-100 grow transition-all"
          alt="Home"
        />
      </Link>

      
      <div className="dtc v-mid w-50 tc"></div>

      
      <div className="dtc v-mid w-25 tr">

        
        <Link
          to="/"
          title="Products"
          className="
            dib mr2 f6 fw6 pv2 ph3 br-pill white pointer
            bg-blue 
            shadow-1 
            grow
            hover-bg-dark-blue
          "
          style={{
            transition: "0.25s",
          }}
        >
          Products
        </Link>

        
        <Link
          to="/orders"
          title="Orders"
          className="
            dib mr2 f6 fw6 pv2 ph3 br-pill white pointer
            bg-purple 
            shadow-1 
            grow
            hover-bg-dark-purple
          "
          style={{
            transition: "0.25s",
          }}
        >
          Orders
        </Link>

        
        <Link
          to="/cart"
          title="Cart"
          className="
            dib f6 fw6 pv2 ph3 br-pill white pointer
            bg-green 
            shadow-1 
            grow
            hover-bg-dark-green
          "
          style={{
            transition: "0.25s",
          }}
        >
          Cart{" "}
          <span
            className="ba b--white br-pill ph2 pv1 ml1 white"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            {totalItems}
          </span>
        </Link>

      </div>
    </nav>
  );
};

export default Header;
