import React from "react";
import { Menu, PackageCheck, Search, ShoppingBag, UserRound } from "lucide-react";

export function Header({
  adminOrdersCount,
  adminUnlocked,
  cartQuantity,
  headerActions,
  storeLogo,
  mainNavLinks,
  navigateTo,
  navigateToSection,
  query,
  searchPlaceholders,
  setCartOpen,
  setMenuOpen,
  setQuery,
  storeInfo,
  userAccount,
}) {
  const hasActiveUser = Boolean(userAccount);
  const openNavLink = (event, link) => {
    if (link.external) return;

    event.preventDefault();

    if (link.path) {
      navigateTo(link.path);
      return;
    }

    if (link.href?.startsWith("#")) {
      const sectionId = link.href.slice(1);
      if (sectionId === "inicio") navigateTo("/");
      else navigateToSection("/", sectionId);
    }
  };

  return (
    <header className={`site-header${adminUnlocked ? " has-admin-orders" : ""}`}>
      <div className="header-main">
        <button className="icon-action menu-button" type="button" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>
          <Menu size={25} />
        </button>

        <button className="mobile-search-button" type="button" aria-label={searchPlaceholders.mobile} onClick={() => navigateToSection("/", "productos")}>
          <Search size={21} />
        </button>

        <a className="brand" href="/" aria-label={`${storeInfo.name} inicio`} onClick={(event) => { event.preventDefault(); navigateTo("/"); }}>
          <img className="brand-mark" src={storeLogo} alt="" />
          <span className="brand-name">{storeInfo.name}</span>
        </a>

        <label className="header-search">
          <Search size={24} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder={searchPlaceholders.desktop} />
        </label>

        <div className="header-actions" aria-label="Accesos rapidos">
          {adminUnlocked && (
            <a className="admin-order-action" href="/admin#admin-orders" aria-label="Pedidos para preparar" onClick={(event) => { event.preventDefault(); navigateToSection("/admin", "admin-orders"); }}>
              <PackageCheck size={23} />
              <span>Pedidos</span>
              <strong>{adminOrdersCount}</strong>
            </a>
          )}
          <a className={`account-action${hasActiveUser ? " is-active" : ""}`} href="/cuenta" aria-label={headerActions.account} onClick={(event) => { event.preventDefault(); navigateTo("/cuenta"); }}><UserRound size={23} /><span>{headerActions.account}</span></a>
          <button className="header-cart" type="button" aria-label="Abrir carrito" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={24} />
            <span>{headerActions.cart}</span>
            <strong>{cartQuantity}</strong>
          </button>
        </div>

        <button className={`mobile-account-button${hasActiveUser ? " is-active" : ""}`} type="button" aria-label={headerActions.account} onClick={() => navigateTo("/cuenta")}>
          <UserRound size={20} />
        </button>

        {adminUnlocked && (
          <button className="icon-action mobile-admin-orders" type="button" aria-label="Pedidos para preparar" onClick={() => navigateToSection("/admin", "admin-orders")}>
            <PackageCheck size={20} />
            <strong>{adminOrdersCount}</strong>
          </button>
        )}

        <button className="icon-action cart-button" type="button" aria-label="Abrir carrito" onClick={() => setCartOpen(true)}>
          <ShoppingBag size={20} />
          <strong>{cartQuantity}</strong>
        </button>
      </div>

      <nav className="main-nav" aria-label="Secciones">
        {mainNavLinks.map((link) => (
          <a
            href={link.path || link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            onClick={(event) => openNavLink(event, link)}
            key={`${link.label}-${link.path || link.href}`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
