import { apiGet, apiPost, apiPut } from "./apiClient";

export function createOrder(orderData, options = {}) {
  return apiPost("/orders", orderData, options);
}

export function listOrders(options = {}) {
  return apiGet("/orders", options);
}

export function updateOrderStatus(orderId, data, options = {}) {
  return apiPut(`/orders/${encodeURIComponent(orderId)}/status`, data, options);
}
