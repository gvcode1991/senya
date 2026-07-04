const orders = [];

export function listMemoryOrders() {
  return orders;
}

export function createMemoryOrder(orderData) {
  const order = {
    id: `order-${Date.now()}`,
    status: "received",
    createdAt: new Date().toISOString(),
    ...orderData,
  };

  orders.push(order);
  return order;
}

export function updateMemoryOrderStatus(orderId, status, adminComment = "") {
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return null;
  }

  order.status = status;
  order.adminComment = adminComment;
  order.updatedAt = new Date().toISOString();
  return order;
}
