import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import CardList from "./components/CardList.jsx";
import SingleView from "./components/SingleView.jsx";
import Cart from "./components/Cart.jsx";
import Orders from "./components/Orders.jsx";
import { CartProvider } from "./state/CartProvider.jsx";

export default function App() {
  return (
    <CartProvider>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </CartProvider>
  );
}
