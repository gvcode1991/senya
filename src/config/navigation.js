import { storeInfo } from "./storeConfig";

export const mainNavLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Categorias", href: "#categorias" },
  { label: "Ofertas", href: "#ofertas" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export const headerActions = {
  account: "Mi cuenta",
  cart: "Carrito",
};

export const mobileMenuLinks = [
  { label: "Inicio", path: "/" },
  { label: "Productos", category: "Todos" },
  { label: "Ropa", category: "Ropa" },
  { label: "Zapatillas", category: "Zapatillas" },
  { label: "Accesorios", category: "Accesorios" },
  { label: "Ofertas", category: "Ofertas" },
  { label: "Registro", path: "/registro" },
  { label: "Mi cuenta", path: "/cuenta" },
];

export const footerNavigationLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Categorias", href: "#categorias" },
  { label: "Ofertas", href: "#ofertas" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Mi cuenta", path: "/cuenta" },
];

export const searchPlaceholders = {
  desktop: "Buscar ropa, zapatillas, accesorios...",
  mobile: "Buscar productos",
};
