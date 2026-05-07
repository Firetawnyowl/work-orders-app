import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' }
});

export const fetchOrders = async ({ search = '', page = 1, limit = 5 }) => {
  const response = await api.get('/orders', {
    params: { search, page, limit }
  });
  return response.data;
};

export const fetchOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const updateOrder = async ({ id, data }) => {
  const response = await api.patch(`/orders/${id}`, data);
  return response.data;
};