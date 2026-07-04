import { productFallbackImages } from "./images";

export const appVersion = "2.0.0";

export const storageKeys = {
  cart: "senya-cart",
  userToken: "senya-user-token",
  adminToken: "senya-admin-token",
};

export const storeInfo = {
  name: "Senya",
  legalName: "Senya",
  slogan: "Moda urbana, simple y con estilo",
  shortDescription: "Descubri ropa, zapatillas y accesorios seleccionados para acompanar tu dia a dia.",
  contactEmail: "hola@senya.com",
  whatsappFallback: "5490000000000",
  instagramUrl: "https://www.instagram.com/",
  facebookUrl: "https://www.facebook.com/",
  storeLocationText: "Tienda online con envios y entregas a coordinar",
};

export const heroContent = {
  eyebrow: "Nueva temporada",
  title: storeInfo.slogan,
  description: storeInfo.shortDescription,
  primaryAction: "Ver productos",
  secondaryAction: "Ver ofertas",
};

export const categories = ["Todos", "Ropa", "Zapatillas", "Accesorios", "Nuevos ingresos", "Ofertas"];
export const visibleCategoryShortcuts = [
  { label: "Catalogo completo", value: "Todos" },
  { label: "Ropa", value: "Ropa" },
  { label: "Zapatillas", value: "Zapatillas" },
  { label: "Accesorios", value: "Accesorios" },
  { label: "Ofertas", value: "Ofertas" },
];

export const showcaseCategories = [
  { label: "Ropa", value: "Ropa", imageKey: "apparel", featured: true },
  { label: "Zapatillas", value: "Zapatillas", imageKey: "sneakers" },
  { label: "Accesorios", value: "Accesorios", imageKey: "accessories" },
  { label: "Nuevos ingresos", value: "Nuevos ingresos", imageKey: "featured" },
];

export const introHighlights = [
  { number: "01", title: "Prendas versatiles", text: "Looks comodos para entrenar, viajar o usar todos los dias." },
  { number: "02", title: "Stock claro", text: "Cada producto muestra talles, colores y disponibilidad antes de comprar." },
  { number: "03", title: "Compra simple", text: "Carrito, datos de contacto y confirmacion listos para coordinar tu pedido." },
];

export const shippingTickerItems = ["Envios a coordinar", "Pagos flexibles", "Nuevos ingresos", "Atencion por WhatsApp"];

export const homeCarouselContent = {
  eyebrow: "Nuevos ingresos",
  title: "Productos destacados",
  viewAllText: "Ver todo",
};

export const catalogContent = {
  eyebrow: "Catalogo",
  title: "Productos",
  emptyMessage: "No encontramos productos con esos filtros.",
};

export const contactSection = {
  eyebrow: "Envios",
  title: "Coordinamos tu pedido",
  description: "Confirmamos stock, metodo de pago y forma de entrega para que recibas tu compra sin vueltas.",
  note: "Tambien podes consultar por WhatsApp antes de comprar.",
};

export const currencyConfig = {
  locale: "es-AR",
  currency: "ARS",
};

export const availableSizes = ["4", "6", "8", "10", "12", "14", "S", "M", "L", "XL"];
export const freeShippingThreshold = 60000;
export const shippingCost = 4500;

export const deliveryMethods = ["Retiro en tienda", "Envio a domicilio", "Coordinar entrega"];
export const paymentMethods = ["Efectivo", "Transferencia", "Mercado Pago", "Coordinar"];
export const paymentHelpText = {
  Transferencia: "Al confirmar, guardamos el pedido y te pasamos los datos de transferencia.",
  "Mercado Pago": "Dejamos el pedido reservado y te enviamos el link de Mercado Pago para completar el pago.",
  Efectivo: "Pagas al retirar o al coordinar la entrega.",
  Coordinar: "Te contactamos para elegir el metodo de pago mas comodo.",
};

export const checkoutDefaults = {
  delivery: deliveryMethods[0],
  payment: paymentMethods[0],
};

export const checkoutContent = {
  fields: {
    name: { label: "Nombre", placeholder: "Nombre y apellido" },
    phone: { label: "Telefono", placeholder: "Telefono de contacto" },
    email: { label: "Email registrado", placeholder: "tu@email.com" },
    delivery: { label: "Entrega" },
    address: { label: "Direccion", placeholder: "Calle, numero, localidad" },
    payment: { label: "Pago" },
    notes: { label: "Comentarios", placeholder: "Talle, color o cualquier detalle del pedido" },
  },
  notifyLabel: "Enviarme confirmacion y novedades al email",
};

export const cartContent = {
  eyebrow: "Compra",
  title: "Carrito",
  closeLabel: "Cerrar carrito",
  steps: ["1. Productos", "2. Datos", "3. Confirmar"],
  sizeLabel: "Talle",
  colorLabel: "Color",
  chooseOption: "Elegir",
  subtractLabel: "Restar",
  addLabel: "Sumar",
  emptyMessage: "Tu carrito esta vacio.",
  clearLabel: "Vaciar carrito",
  reviewTitle: "Revisar pedido",
  summary: {
    subtotal: "Subtotal",
    shipping: "Envio",
    total: "Total",
    freeShippingMessage: "Te faltan {amount} para envio gratis.",
    freeShippingValue: "Sin cargo",
  },
  whatsappLabel: "Consultar por WhatsApp",
  previousStep: "Volver",
  nextStep: "Continuar",
  finish: "Finalizar compra",
  loading: "Enviando pedido...",
};

export const orderMessages = {
  createError: "No pudimos crear el pedido.",
  success: "Pedido recibido: {orderId}. Carrito vaciado y stock actualizado.",
  apiErrorSuffix: "Revisa que la API este corriendo.",
};

export const accountContent = {
  register: {
    eyebrow: "Cuenta",
    title: "Crear cuenta",
    note: "Registrate para recibir el email de activacion. Necesitas activar la cuenta antes de comprar.",
    marketingLabel: "Recibir novedades por email",
    submitLabel: "Crear cuenta y enviar confirmacion",
    pendingTitle: "Activacion por email",
    pendingText: `Despues de registrarte, abri el email de ${storeInfo.name} y confirma tu cuenta para habilitar compras.`,
    activeStatus: "Cuenta activa",
    pendingStatus: "Pendiente de activacion",
    waitingStatus: "Esperando registro",
  },
  account: {
    eyebrow: "Mi cuenta",
    title: "Administracion de cuenta",
    note: "Inicia sesion para consultar tus preferencias, favoritos y compras.",
    loginTitle: "Iniciar sesion",
    emailLabel: "Email registrado",
    passwordLabel: "Contrasena",
    loginButton: "Entrar",
    emptyTitle: "Cuenta",
    emptyText: "Ingresa con tu email y contrasena para ver tus compras y preferencias.",
    activeState: "activa",
    pendingState: "pendiente de confirmacion",
    emailDetail: "Email",
    nameDetail: "Nombre",
    phoneDetail: "Telefono",
    resendConfirmationLabel: "Reenviar email de confirmacion",
    notificationsLabel: "Recibir notificaciones al mail",
    favoritesLabel: "Favoritos",
    purchasesLabel: "Compras realizadas",
    orderStatusLabels: {
      pending: "Pendiente",
      confirmed: "Confirmado",
      delivered: "Entregado",
      cancelled: "Cancelado",
    },
  },
};

export const footerContent = {
  navigationTitle: "Navegacion",
  contactTitle: "Contactanos",
  description: "Tienda online de ropa, zapatillas y accesorios.",
  copyright: `Copyright ${storeInfo.legalName} - 2026. Todos los derechos reservados.`,
  poweredBy: "powered by villamayorlabs",
  poweredByLogo: "https://res.cloudinary.com/villamayorlabs/image/upload/v1783051354/logoSF_zva2f0.png",
};

export const adminContent = {
  panelEyebrow: "Gestion",
  panelTitle: "Panel admin",
  panelNote: "Alta, baja y modificacion de productos del catalogo.",
  newProductButton: "Nuevo producto",
  accessTitle: "Acceso admin",
  emailLabel: "Email admin",
  emailPlaceholder: "admin@example.com",
  passwordLabel: "Contrasena admin",
  passwordPlaceholder: "Contrasena privada",
  unlockButton: "Desbloquear panel",
  ordersTitle: "Pedidos recientes",
  ordersEmpty: "Todavia no hay pedidos.",
  ordersRefresh: "Actualizar pedidos",
  ordersStatusLabels: {
    pending: "Pendiente",
    confirmed: "Confirmado",
    delivered: "Entregado",
    cancelled: "Cancelado",
  },
  product: {
    tagsPlaceholder: "Producto destacado, Categoria, Marca",
    imagePlaceholder: "URL de imagen principal",
    galleryPlaceholder: "Una URL por linea. El panel las agrega automaticamente.",
    uploadFormats: "JPG, PNG o WebP hasta 5 MB.",
    uploadButton: "Subir imagen",
    uploadLoading: "Subiendo...",
    descriptionPlaceholder: "Descripcion corta para el catalogo",
  },
};

export const fallbackProducts = [
  { id: "remera-senya", name: "Remera Senya", category: "Ropa", tags: ["Basicos", "Urbano"], description: "Remera liviana de uso diario con calce comodo.", price: 24900, image: productFallbackImages.basicTShirt, badge: "Nuevo" },
  { id: "zapatillas-urbanas", name: "Zapatillas urbanas", category: "Zapatillas", tags: ["Calzado", "Urbano"], description: "Zapatillas comodas para acompanar todos tus recorridos.", price: 74900, image: productFallbackImages.sneakers, badge: "Oferta" },
  { id: "accesorio-diario", name: "Accesorio diario", category: "Accesorios", tags: ["Accesorios"], description: "Complemento practico para sumar a cualquier look.", price: 19900, image: productFallbackImages.dailyAccessory, badge: "Accesorio" },
  { id: "campera-senya", name: "Campera Senya", category: "Nuevos ingresos", tags: ["Abrigos", "Urbano"], description: "Campera liviana con presencia premium para media estacion.", price: 54900, image: productFallbackImages.urbanJacket, badge: "Nuevo" },
].map((product) => ({
  ...product,
  images: product.images || [product.image],
  stock: [
    { size: "S", quantity: 3 },
    { size: "M", quantity: 3 },
    { size: "L", quantity: 3 },
  ],
  colors: [],
}));
