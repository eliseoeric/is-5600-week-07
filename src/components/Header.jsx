import { Link, NavLink } from "react-router-dom";
import { useCart } from "../state/CartProvider.jsx";

export default function Header() {
  const { cartItems } = useCart();
  const total = cartItems.reduce((a, b) => a + b.quantity, 0);

  return (
    <header className="w-100 bg-white bb b--black-10">
      <div className="container pv3 flex items-center justify-between">
        <Link to="/" className="fw6 link black">
          Fullstack Prints
        </Link>
        <nav className="flex items-center gap3">
          <NavLink className="link dim mr3" to="/">Products</NavLink>
          <NavLink className="link dim mr3" to="/cart">Cart ({total})</NavLink>
          <NavLink className="link dim" to="/orders">Orders</NavLink>
        </nav>
      </div>
    </header>
  );
}
