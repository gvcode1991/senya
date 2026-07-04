import React, { useMemo, useState } from "react";
import { Edit3, Trash2 } from "lucide-react";

import { adminContent } from "../../config/storeConfig";
import { formatter } from "../../utils/formatters";
import { stockTotal } from "../../utils/stock";

const productsPerPage = 6;

export function AdminProductsList({ editProduct, products, removeProduct }) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return products;

    return products.filter((product) => [
      product.id,
      product.name,
      product.category,
      product.badge,
      ...(product.colors || []),
      ...(product.tags || []),
    ].join(" ").toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery, products]);
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
  const safePage = Math.min(page, pageCount);
  const visibleProducts = filteredProducts.slice((safePage - 1) * productsPerPage, safePage * productsPerPage);

  function updateQuery(value) {
    setQuery(value);
    setPage(1);
  }

  return (
    <div className="admin-products" aria-live="polite">
      <label className="admin-list-search">
        <span>Buscar productos</span>
        <input value={query} onChange={(event) => updateQuery(event.target.value)} type="search" placeholder={adminContent.productsSearchPlaceholder} />
      </label>

      {visibleProducts.map((product) => (
        <article className="admin-product-row" key={`admin-${product.id}`}>
          <img src={product.image} alt="" />
          <div>
            <strong>{product.name}</strong>
            <span>{product.category} - {formatter.format(product.price)} - Stock {stockTotal(product.stock)} - {product.colors?.length ? `Colores ${product.colors.join(", ")} - ` : ""}{product.active === false ? "Inactivo" : "Activo"}</span>
          </div>
          <div className="admin-actions">
            <button type="button" aria-label={`Editar ${product.name}`} onClick={() => editProduct(product)}><Edit3 size={18} /></button>
            <button type="button" aria-label={`Eliminar ${product.name}`} onClick={() => removeProduct(product.id)}><Trash2 size={18} /></button>
          </div>
        </article>
      ))}
      {!visibleProducts.length && <p className="empty-state">{adminContent.productsEmpty}</p>}
      {pageCount > 1 && (
        <div className="admin-pagination">
          <button type="button" onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))} disabled={safePage === 1}>{adminContent.paginationPrevious}</button>
          <span>{safePage} / {pageCount}</span>
          <button type="button" onClick={() => setPage((currentPage) => Math.min(pageCount, currentPage + 1))} disabled={safePage === pageCount}>{adminContent.paginationNext}</button>
        </div>
      )}
    </div>
  );
}
