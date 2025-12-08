import { useCart } from "../state/CartProvider";

const Header = () => {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <nav className="dt w-100 pa3">
      <span> {totalItems}</span>
    </nav>
  );
};

export default Header;
