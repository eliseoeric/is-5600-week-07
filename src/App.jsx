import { useEffect, useState } from "react";

function App() {
  // =====================
  // STATE
  // =====================
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // =====================
  // LOAD PRODUCTS
  // =====================
  useEffect(() => {
   fetch("https://studious-telegram-97964vxq76r9f99w4-3080.app.github.dev/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  // =====================
  // LOAD ORDERS
  // =====================
  useEffect(() => {
  fetch("https://studious-telegram-97964vxq76r9f99w4-3080.app.github.dev/products") 
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.log(err));
  }, []);

  // =====================
  // CART ACTIONS
  // =====================
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const clearCart = () => {
    setCart([]);
  };

  // =====================
  // PLACE ORDER
  // =====================
  const placeOrder = () => {
    fetch("https://studious-telegram-97964vxq76r9f99w4-3080.app.github.dev/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        buyerEmail: "test@example.com",
        products: cart,
        status: "CREATED"
      })
    })
      .then(res => res.json())
      .then(() => {
        clearCart();

        // refresh orders
        return fetch("https://studious-telegram-97964vxq76r9f99w4-3080.app.github.dev/products")
          .then(res => res.json())
          .then(data => setOrders(data));
      })
      .catch(err => console.log(err));
  };

  // =====================
  // UI
  // =====================
  return (
    <div style={{ padding: "20px" }}>
      
      <h1> Products</h1>

      {products.map(product => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}

      {/* CART */}
      <h2>Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item, index) => (
        <div key={index}>
          {item.name} - ${item.price}
        </div>
      ))}

      <button onClick={placeOrder} disabled={cart.length === 0}>
        Place Order
      </button>

      <button onClick={clearCart}>
        Clear Cart
      </button>

      {/* ORDERS */}
      <h2> Orders</h2>

      {orders.map(order => (
        <div
          key={order._id}
          style={{
            border: "1px solid green",
            margin: "10px",
            padding: "10px"
          }}
        >
          <p>Email: {order.buyerEmail}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}

    </div>
  );
}

export default App;