import { useEffect, useState } from "react";
import CardList from "./components/CardList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then(setProducts);

    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  return (
    <div className="pa4">
      <h1 className="f2">Fullstack Prints</h1>
      <CardList products={products} />
      <Cart onOrderPlaced={(newOrder) => setOrders([...orders, newOrder])} />
      <Orders orders={orders} />
    </div>
  );
}

export default App;
