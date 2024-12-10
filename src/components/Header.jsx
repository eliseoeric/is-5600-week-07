import React, {useContext} from 'react';
import React, { useContext } from 'react';
import { Link } from "react-router-dom";

const Header = () => {


  // TODO: Update the total items to a value from the cart context
  const totalItems = 0;

  return (
@@ -16,8 +18,6 @@ const Header = () => {
        <Link className="link dim dark-gray f6 f5-ns dib" to="/cart" title="Cart">Cart <span class="ba b--black-20 br-pill pa2">{totalItems}</span></Link>
      </div>
    </nav>

  );
}

export default Header;