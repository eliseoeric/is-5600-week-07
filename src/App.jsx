import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";

export default function App() {
  return (
    <>
      <h1>Store App</h1>
      <ProductList />
      <Cart />
      <Orders />
    </>
  );
}
