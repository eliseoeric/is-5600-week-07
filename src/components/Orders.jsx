import React, { useState, useEffect } from 'react'; // Import React and necessary hooks (useState, useEffect)
import { BASE_URL } from '../config'; // Import the base URL for API calls from a configuration file

/**
 * Orders Component:
 * This component fetches and displays a list of orders from the backend API. 
 * It displays order details such as order ID, buyer email, products, and order status in a table format.
 */
const Orders = () => {
  // Initialize state to store the list of orders
  const [orders, setOrders] = useState([]);

  /**
   * fetchOrders:
   * Fetches the list of orders from the server and updates the orders state.
   * Makes a GET request to the `/orders` endpoint and sets the response data to the `orders` state.
   */
  const fetchOrders = () => {
    fetch(`${BASE_URL}/orders`) // API call to fetch orders from the database
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        setOrders(data); // Update the `orders` state with the fetched data
      });
  };

  /**
   * useEffect:
   * Fetches the orders data when the component is mounted.
   * This hook runs once when the component is rendered to fetch all orders.
   */
  useEffect(() => {
    fetchOrders(); // Call fetchOrders to retrieve data from the API when the component mounts
  }, []); // The empty dependency array ensures this only runs once, on initial render

  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2> {/* Header for the Orders section */}

        {/* Table to display the list of orders */}
        <table className="w-100">
          <thead>
            <tr>
              <th className="tl pv2">Order ID</th> {/* Column for Order ID */}
              <th className="tl pv2">Buyer Email</th> {/* Column for Buyer Email */}
              <th className="tl pv2">Products</th> {/* Column for Products in the order */}
              <th className="tl pv2">Status</th> {/* Column for Order Status */}
            </tr>
          </thead>
          <tbody>
            {/* Map through the orders and render each order in a table row */}
            {orders && orders.map((order) => (
              <tr key={order._id}> {/* Use order._id as the unique key for each row */}
                <td className="tl pv2">{order._id}</td> {/* Display Order ID */}
                <td className="tl pv2">{order.buyerEmail}</td> {/* Display Buyer Email */}
                <td className="tl pv2">
                  {order.products.join(', ')} {/* Display the list of products in the order, joined by commas */}
                </td>
                <td className="tl pv2">{order.status}</td> {/* Display the current status of the order */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;