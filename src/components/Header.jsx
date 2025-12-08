// src/components/Header.jsx
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header({ onSearch }) {
  return (
    <div>
      <nav className="pa3 flex justify-center">
        <Link to="/" className="ph3 link dim black">Products</Link>
        <Link to="/orders" className="ph3 link dim black">Orders</Link>
        <Link to="/cart" className="ph3 link dim black">Cart</Link>
      </nav>

      <SearchBar onSearch={onSearch} />
    </div>
  );
}
