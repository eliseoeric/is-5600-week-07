import React, { useState } from 'react';
import { BASE_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config'; // Ensure you have the correct base URL for your API

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orders, setOrders] = useState([]);  // State to store the orders
  const [loading, setLoading] = useState(true);  // To handle the loading state
  const [error, setError] = useState(null);  // To handle error state

  /**
   * TODO
   * 1. Create a `fetchOrders` function that retrieves all orders from the database
   * 2. Using the `useEffect` hook, update the existing `orders` state object when `fetchOrders` is complete
   **/ 
  useEffect(() => {
    fetchOrders(); // Call the fetch function when the component mounts
  }, []);

  const fetchOrders = () => {
    fetch(`${BASE_URL}/orders`) // Replace with your correct API endpoint
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch orders: ${res.statusText}`);
        }
        return res.json();  // Return JSON response
      })
      .then((data) => {
        console.log("Fetched data:", data); // Log fetched data for debugging
        setOrders(data);  // Set orders to state
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        setError(error.message); // Set error message in case of failure
        setLoading(false); // Set loading to false in case of failure
      });
  };

  // If the app is loading or if there was an error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Temporary: Display raw orders for debugging
  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
@@ -35,9 +71,14 @@ const Orders = () => {
            ))}
          </tbody>
        </table>
        <h2 className="f2 mb2">Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders available</p>
        ) : (
          <pre>{JSON.stringify(orders, null, 2)}</pre> // Show raw orders for debugging
        )}
      </div>
    </div>
  );
};

export default Orders; 
export default Orders;
