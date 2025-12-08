import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CardList from "./components/CardList";
import SingleView from "./components/SingleView";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import productsData from "./data/full-products.json";
export default function App() {
  return (
    <>
      <Header />
      <main className="pa4 sans-serif">
        <Routes>
          <Route path="/" element={<CardList data={productsData} />} />
          <Route path="/product/:id" element={<SingleView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </>
  );
}
