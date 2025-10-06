@@ -1,6 +1,7 @@
import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';


const Orders = () => {
  const [orders, setOrders] = useState([]);

@@ -11,6 +12,20 @@ const Orders = () => {
   **/ 




  const fetchOrders = () => {
  fetch(`${BASE_URL}/orders`)
    .then((res) => res.json())
    .then((data) => {
      setOrders(data);
    })
};
  useEffect(() => {
  fetchOrders();
}, []);


  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
