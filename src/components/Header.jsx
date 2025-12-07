import { useCart } from "../state/CartProvider";

const Header = () => {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div>
      <h1>My Store</h1>
      <p>Cart Items: {totalItems}</p>
    </div>
  );
};

export default Header;
