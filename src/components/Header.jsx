import { Link } from "react-router-dom";
import { useCart } from "../state/CartProvider";

export default function Header() {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  return (
    <nav>
      <Link to="/">Home</Link>{" | "}
      <Link to="/cart">Cart ({total})</Link>{" | "}
      <Link to="/orders">Orders</Link>
    </nav>
  );
}