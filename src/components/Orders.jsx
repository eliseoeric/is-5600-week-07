@@ -1,4 +1,5 @@
import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
@@ -10,6 +11,21 @@ const Orders = () => {
   * 2. Using the `useEffect` hook, update the existing `orders` state object when `fetchOrders` is complete
   **/ 

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, [])

  const fetchOrders = () => {
    fetch('${BASE_URL}/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
  }



  return (
    <div className="center mw7 ba mv4">
