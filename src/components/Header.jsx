import { Link } from "react-router-dom";
import { useCart } from "../state/CartProvider";

export default function Header() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <header className="pa4">
      <nav className="flex justify-between items-center">
        <Link to="/" className="link black f3">
          Fullstack Prints
        </Link>

        <div>
          <Link to="/" className="link black mr4">
            Products
          </Link>

          <Link to="/orders" className="link black mr4">
            Orders
          </Link>

          <Link to="/cart" className="link black">
            Cart {totalItems}
          </Link>
        </div>
      </nav>
    </header>
  );
}