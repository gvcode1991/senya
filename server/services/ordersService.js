import { connectToDatabase } from "../db/mongo.js";
import { Order } from "../models/Order.js";
import { createMemoryOrder, listMemoryOrders, updateMemoryOrderStatus } from "../utils/ordersStore.js";

export async function listOrders() {
  const database = await connectToDatabase();

  if (!database.connected) {
    return { storage: "memory", orders: listMemoryOrders() };
  }

  const orders = await Order.find().sort({ createdAt: -1 });
  return { storage: "mongodb", orders: orders.map((order) => order.toJSON()) };
}

export async function createOrder(orderData) {
  const database = await connectToDatabase();

  if (!database.connected) {
    return { storage: "memory", order: createMemoryOrder(orderData) };
  }

  const order = await Order.create(orderData);
  return { storage: "mongodb", order: order.toJSON() };
}

export async function updateOrderStatus(orderId, status, adminComment = "") {
  const normalizedStatus = String(status || "").trim().toLowerCase();
  const validStatuses = ["received", "pending", "confirmed", "delivered", "cancelled", "rejected"];

  if (!validStatuses.includes(normalizedStatus)) {
    throw new Error("Estado de pedido invalido.");
  }

  if (normalizedStatus === "rejected" && !String(adminComment || "").trim()) {
    throw new Error("Indica el motivo para rechazar el pedido.");
  }

  const database = await connectToDatabase();

  if (!database.connected) {
    return updateMemoryOrderStatus(orderId, normalizedStatus, String(adminComment || "").trim());
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    { $set: { status: normalizedStatus, adminComment: String(adminComment || "").trim() } },
    { returnDocument: "after", runValidators: true },
  );

  return order ? order.toJSON() : null;
}
