import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();
  const link = ({ isActive }) => "link dim black mr3 " + (isActive ? "b" : "");

  return (
    <header className="pa3 bb b--black-10 flex justify-between items-center">
      <Link to="/" className="link dim black f3 b">Site</Link>

      <nav className="flex items-center">
        <NavLink to="/" end className={link}>Products</NavLink>
        <NavLink to="/orders" className={link}>Orders</NavLink>
        <NavLink to="/cart" className={link}>
          Cart <span className="ba br-100 ph2 pv0 ml1">{totalItems}</span>
        </NavLink>
      </nav>
    </header>
  );
}
