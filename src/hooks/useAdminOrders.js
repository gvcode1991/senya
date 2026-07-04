import { useState } from "react";

import { listOrders, updateOrderStatus } from "../services/ordersApi";

export function useAdminOrders({ adminHeaders, adminUnlocked }) {
  const [adminOrders, setAdminOrders] = useState([]);
  const [adminOrdersStatus, setAdminOrdersStatus] = useState({ state: "idle", message: "" });

  async function loadAdminOrders() {
    if (!adminUnlocked) return;

    setAdminOrdersStatus({ state: "loading", message: "Cargando pedidos..." });

    try {
      const { response, data } = await listOrders({ headers: adminHeaders() });

      if (!response.ok) {
        throw new Error(data.message || "No pudimos cargar los pedidos.");
      }

      setAdminOrders(data.orders || []);
      setAdminOrdersStatus({ state: "success", message: `${(data.orders || []).length} pedidos cargados.` });
    } catch (error) {
      setAdminOrdersStatus({ state: "error", message: error.message });
    }
  }

  async function changeOrderStatus(orderId, status, adminComment = "") {
    setAdminOrdersStatus({ state: "loading", message: "Actualizando pedido..." });

    try {
      const { response, data } = await updateOrderStatus(orderId, { status, adminComment }, { headers: adminHeaders() });

      if (!response.ok) {
        throw new Error(data.message || "No pudimos actualizar el pedido.");
      }

      setAdminOrders((currentOrders) => currentOrders.map((order) => (order.id === data.order.id ? data.order : order)));
      setAdminOrdersStatus({ state: "success", message: "Pedido actualizado." });
    } catch (error) {
      setAdminOrdersStatus({ state: "error", message: error.message });
    }
  }

  return {
    adminOrders,
    adminOrdersStatus,
    changeOrderStatus,
    loadAdminOrders,
  };
}
