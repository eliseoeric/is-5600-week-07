import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";

export default function App() {
  return (
    <div style={{padding:"20px"}}>
      <h1>Week 07 Shop</h1>

      <h2>Products</h2>
      <ProductList />

      <h2>Cart</h2>
      <Cart />

      <h2>Orders</h2>
      <Orders />
    </div>
  );
}
