import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import { useCart } from '../state/CartProvider';

const Header = () => {
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="dt w-100 border-box pa3 ph5-ns">
      <a className="dtc v-mid mid-gray link dim w-25" href="/" title="Home">
        <img src="https://img.logoipsum.com/280.svg" className="dib w2 h2 br-100" alt="Site Name" />
      </a>
      <div className="dtc v-mid w-75 tr">
        <Link className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/" title="Products">Products</Link>
        <Link className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/orders" title="/orders">Orders</Link>
        <Link className="link dim dark-gray f6 f5-ns dib" to="/cart" title="Cart">Cart <span class="ba b--black-20 br-pill pa2">{totalItems}</span></Link>
      </div>
    </nav>

  );
}

export default Header;