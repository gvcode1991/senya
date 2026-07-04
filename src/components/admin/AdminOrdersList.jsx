import React, { useMemo, useState } from "react";

import { adminContent } from "../../config/storeConfig";
import { formatter } from "../../utils/formatters";

function buildCustomerWhatsApp(order) {
  const phone = String(order.customer?.phone || "").replace(/[^\d]/g, "");
  const text = encodeURIComponent(`Hola ${order.customer?.name || ""}, te escribimos de Senya por tu pedido ${order.id}.`);
  return phone ? `https://wa.me/${phone}?text=${text}` : "";
}

const ordersPerPage = 3;

export function AdminOrdersList({ onUpdateOrderStatus, orders, ordersStatus, refreshOrders }) {
  const statusLabels = adminContent.ordersStatusLabels;
  const [rejectReasons, setRejectReasons] = useState({});
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredOrders = useMemo(() => {
    if (!normalizedQuery) return orders;

    return orders.filter((order) => [
      order.id,
      order.status,
      statusLabels[order.status],
      order.customer?.name,
      order.customer?.email,
      order.customer?.phone,
      ...(order.items || []).flatMap((item) => [item.name, item.category, item.description, item.size, item.color]),
    ].join(" ").toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery, orders, statusLabels]);
  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / ordersPerPage));
  const safePage = Math.min(page, pageCount);
  const visibleOrders = filteredOrders.slice((safePage - 1) * ordersPerPage, safePage * ordersPerPage);

  function updateQuery(value) {
    setQuery(value);
    setPage(1);
  }

  function updateRejectReason(orderId, value) {
    setRejectReasons((currentReasons) => ({ ...currentReasons, [orderId]: value }));
  }

  return (
    <section className="admin-orders admin-card-section" id="admin-orders">
      <div className="admin-orders-header">
        <div>
          <h3>{adminContent.ordersTitle}</h3>
          {ordersStatus.message && <p className={`upload-message ${ordersStatus.state}`}>{ordersStatus.message}</p>}
        </div>
        <button className="secondary-admin-button" type="button" onClick={refreshOrders}>{adminContent.ordersRefresh}</button>
      </div>

      <label className="admin-list-search">
        <span>Buscar pedidos</span>
        <input value={query} onChange={(event) => updateQuery(event.target.value)} type="search" placeholder={adminContent.ordersSearchPlaceholder} />
      </label>

      {visibleOrders.length ? visibleOrders.map((order) => (
        <article className="admin-order-card" key={order.id || order.createdAt}>
          <div className="admin-order-top">
            <div>
              <strong>{order.customer?.name || "Cliente"}</strong>
              <span>{order.customer?.email} - {order.customer?.phone}</span>
            </div>
            <mark>{statusLabels[order.status] || order.status || statusLabels.pending}</mark>
          </div>

          <div className="admin-order-items">
            {(order.items || []).map((item) => (
              <div className="admin-order-item" key={`${order.id}-${item.id}-${item.size}-${item.color}`}>
                {item.image && <img src={item.image} alt="" />}
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.description || item.category || "Producto"}</span>
                  <small>Talle {item.size || "-"}{item.color ? ` - ${item.color}` : ""} x{item.quantity}</small>
                </div>
                <b>{formatter.format(item.subtotal || 0)}</b>
              </div>
            ))}
          </div>

          <div className="admin-order-foot">
            <span>{order.createdAt ? new Date(order.createdAt).toLocaleString("es-AR") : "Pedido nuevo"}</span>
            <strong>{formatter.format(order.total || 0)}</strong>
          </div>

          {order.adminComment && <p className="admin-order-comment">{order.adminComment}</p>}

          <div className="admin-order-contact">
            {buildCustomerWhatsApp(order) && <a href={buildCustomerWhatsApp(order)} target="_blank" rel="noreferrer">{adminContent.ordersWhatsapp}</a>}
            {order.customer?.email && <a href={`mailto:${order.customer.email}`}>{adminContent.ordersEmail}</a>}
          </div>

          {order.status !== "rejected" && (
            <div className="admin-order-actions">
              {order.status === "received" && (
                <button className="secondary-admin-button" type="button" onClick={() => onUpdateOrderStatus(order.id, "pending")}>
                  {adminContent.ordersAccept}
                </button>
              )}
              <label>
                {adminContent.ordersRejectReason}
                <textarea value={rejectReasons[order.id] || ""} onChange={(event) => updateRejectReason(order.id, event.target.value)} rows="2" />
              </label>
              <button className="secondary-admin-button danger" type="button" onClick={() => onUpdateOrderStatus(order.id, "rejected", rejectReasons[order.id] || "")}>
                {adminContent.ordersReject}
              </button>
            </div>
          )}
        </article>
      )) : <p className="empty-state">{adminContent.ordersEmpty}</p>}
      {pageCount > 1 && (
        <div className="admin-pagination">
          <button type="button" onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))} disabled={safePage === 1}>{adminContent.paginationPrevious}</button>
          <span>{safePage} / {pageCount}</span>
          <button type="button" onClick={() => setPage((currentPage) => Math.min(pageCount, currentPage + 1))} disabled={safePage === pageCount}>{adminContent.paginationNext}</button>
        </div>
      )}
    </section>
  );
}
