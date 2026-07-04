import { useState } from "react";

import { listOrders } from "../services/ordersApi";

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

  return {
    adminOrders,
    adminOrdersStatus,
    loadAdminOrders,
  };
}
