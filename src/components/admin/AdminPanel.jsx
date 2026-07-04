import React from "react";
import { AdminOrdersList } from "./AdminOrdersList";
import { AdminProductsList } from "./AdminProductsList";
import { ProductForm } from "./ProductForm";
import { adminContent } from "../../config/storeConfig";

export function AdminPanel({
  adminLogin,
  adminOrders,
  adminOrdersStatus,
  adminStatus,
  adminUnlocked,
  editingProductId,
  editProduct,
  imageUpload,
  onUpdateOrderStatus,
  productForm,
  products,
  refreshOrders,
  removeProduct,
  resetProductForm,
  submitProduct,
  unlockAdmin,
  updateAdminLogin,
  updateProductForm,
  updateProductImageFile,
  uploadProductImage,
}) {
  function startNewProduct() {
    resetProductForm();
    window.setTimeout(() => document.getElementById("admin-product-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }

  return (
    <section className="admin-section" id="admin">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{adminContent.panelEyebrow}</p>
          <h2>{adminContent.panelTitle}</h2>
          <p className="catalog-note">{adminContent.panelNote}</p>
        </div>
        {adminUnlocked && <button className="secondary-admin-button" type="button" onClick={startNewProduct}>{adminContent.newProductButton}</button>}
      </div>

      {!adminUnlocked && (
        <form className="admin-form admin-unlock" onSubmit={unlockAdmin}>
          <h3>{adminContent.accessTitle}</h3>
          <label>
            {adminContent.emailLabel}
            <input value={adminLogin.email} onChange={(event) => updateAdminLogin("email", event.target.value)} type="email" placeholder={adminContent.emailPlaceholder} />
          </label>
          <label>
            {adminContent.passwordLabel}
            <input value={adminLogin.password} onChange={(event) => updateAdminLogin("password", event.target.value)} type="password" placeholder={adminContent.passwordPlaceholder} />
          </label>
          {adminStatus.message && <p className={`checkout-message ${adminStatus.state}`}>{adminStatus.message}</p>}
          <button className="secondary-admin-button" type="submit">{adminContent.unlockButton}</button>
        </form>
      )}

      {adminUnlocked && (
        <div className="admin-dashboard">
          <section className="admin-card-section" id="admin-product-form">
            <div className="admin-section-title">
              <p className="eyebrow">{editingProductId ? adminContent.editProductTitle : adminContent.createProductTitle}</p>
              <h3>{editingProductId ? adminContent.editProductTitle : adminContent.createProductTitle}</h3>
            </div>
            <ProductForm
              adminStatus={adminStatus}
              adminUnlocked={adminUnlocked}
              editingProductId={editingProductId}
              imageUpload={imageUpload}
              productForm={productForm}
              submitProduct={submitProduct}
              updateProductForm={updateProductForm}
              updateProductImageFile={updateProductImageFile}
              uploadProductImage={uploadProductImage}
            />
          </section>

          <section className="admin-card-section">
            <div className="admin-section-title">
              <p className="eyebrow">{adminContent.editProductTitle}</p>
              <h3>{adminContent.productsTitle}</h3>
            </div>
            <AdminProductsList
              editProduct={editProduct}
              products={products}
              removeProduct={removeProduct}
            />
          </section>

          <AdminOrdersList
            onUpdateOrderStatus={onUpdateOrderStatus}
            orders={adminOrders}
            ordersStatus={adminOrdersStatus}
            refreshOrders={refreshOrders}
          />
        </div>
      )}
    </section>
  );
}
