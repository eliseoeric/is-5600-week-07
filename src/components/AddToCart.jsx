
import React, { useState } from "react";
import { useCart } from "../state/CartProvider";

export default function AddToCart({ product }) {
  const { addToCart } = useCart();

  const [popup, setPopup] = useState("");

  const handleClick = (p) => {
    addToCart(p);

    
    setPopup(`${p.title || p.description || "Item"} added to cart`);

    
    setTimeout(() => setPopup(""), 1800);
  };

  return (
    <>
      
      <button
        className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib"
        onClick={() => handleClick(product)}
      >
        Add to Cart
      </button>

      
      {popup && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",       
            left: "50%",          
            transform: "translateX(-50%)",
            background: "#4ade80",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.25)",
            fontWeight: "600",
            zIndex: 9999,
            opacity: popup ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {popup}
        </div>
      )}
    </>
  );
}
