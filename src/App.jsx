import { CartProvider } from "./state/CartProvider";
import CardList from "./components/CardList";
import Cart from "./components/Cart";

function App() {
  return (
    <CartProvider>
      <h1>Store</h1>
      <CardList />
      <Cart />
    </CartProvider>
  );
}

export default App;