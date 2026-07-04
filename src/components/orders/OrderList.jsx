import React from "react";
import { accountContent } from "../../config/storeConfig";
import { formatter } from "../../utils/formatters";

export function OrderList({ purchases }) {
  const statusLabels = accountContent.account.orderStatusLabels;

  return (
    <div className="purchase-list">
      {(purchases || []).map((purchase) => (
        <article key={purchase.id || purchase._id || purchase.createdAt}>
          <div className="purchase-head">
            <span>{purchase.createdAt ? new Date(purchase.createdAt).toLocaleDateString("es-AR") : "Compra"}</span>
            <strong>{formatter.format(purchase.total || 0)}</strong>
            <small>{statusLabels[purchase.status] || purchase.status || statusLabels.pending}</small>
          </div>
          <div className="purchase-items">
            {(purchase.items || []).map((item) => (
              <div className="purchase-item" key={`${purchase.id || purchase._id}-${item.id}-${item.size}-${item.color}`}>
                {item.image && <img src={item.image} alt="" />}
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.description || item.category || "Producto comprado"}</p>
                  <span>Talle {item.size || "-"}{item.color ? ` - ${item.color}` : ""} x{item.quantity}</span>
                </div>
                <b>{formatter.format(item.subtotal || item.unitPrice * item.quantity || 0)}</b>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
