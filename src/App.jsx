import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CardList from "./components/CardList";
import SingleView from "./components/SingleView";
import Cart from "./components/Cart";
import { CartProvider } from "./state/CartProvider";

export default function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </CartProvider>
  );
}
