import { BASE_URL } from '../config';

const handleResponse = async (response) => {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.message || `API request failed with status ${response.status}`;
    throw new Error(message);
  }
  return data;
};

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return handleResponse(response);
};

export const fetchOrders = async () => {
  const response = await fetch(`${BASE_URL}/orders`);
  return handleResponse(response);
};

export const submitOrder = async (order) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  return handleResponse(response);
};
