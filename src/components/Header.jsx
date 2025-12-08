import React from 'react';

const Header = () => {
  return (
    <nav className="dt w-100 border-box pa3 ph5-ns">
      <a className="dtc v-mid mid-gray link dim w-25" href="/" title="Home">
        <img src="https://img.logoipsum.com/280.svg" className="dib w2 h2 br-100" alt="Site Name" />
      </a>
      <div className="dtc v-mid w-75 tr">
        <a className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="/" title="Products">Products</a>
        <a className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="/cart" title="Cart">Cart</a>
        <a className="link dim dark-gray f6 f5-ns dib" href="/contact" title="/contact">Contact</a>
      </div>
    </nav>

  );
}

export default Header;