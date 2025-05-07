@@ -1,4 +1,4 @@
import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
@@ -9,8 +9,19 @@ const Orders = () => {
   * 1. Create a `fetchOrders` function that retrieves all orders from the database
   * 2. Using the `useEffect` hook, update the existing `orders` state object when `fetchOrders` is complete
   **/ 
  useEffect(() => {
    fetchOrders();
  }, [])


  const fetchOrders = () => {
    fetch(`${BASE_URL}/orders`)
    .then((res) => res.json())
    .then((data) => {
      setOrders(data);
    })
  }

  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">