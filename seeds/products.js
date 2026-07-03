export const sampleImages = {
  apparelPrimary: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  apparelSecondary: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  apparelTertiary: "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?auto=format&fit=crop&w=900&q=80",
  apparelFeatured: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
};

function product(data) {
  return {
    ...data,
    imageUrl: data.image,
    images: data.images || [data.image],
    active: true,
  };
}

export const products = [
  product({
    id: "remera-senya",
    name: "Remera Senya",
    category: "Ropa",
    tags: ["Basicos", "Urbano"],
    description: "Remera liviana de uso diario con calce comodo.",
    price: 24900,
    image: sampleImages.apparelPrimary,
    badge: "Nuevo",
    stock: 12,
  }),
  product({
    id: "zapatillas-urbanas",
    name: "Zapatillas urbanas",
    category: "Zapatillas",
    tags: ["Calzado", "Urbano"],
    description: "Zapatillas comodas para acompanar todos tus recorridos.",
    price: 74900,
    image: sampleImages.apparelSecondary,
    badge: "Oferta",
    stock: 8,
  }),
  product({
    id: "accesorio-diario",
    name: "Accesorio diario",
    category: "Accesorios",
    tags: ["Accesorios"],
    description: "Complemento practico para sumar a cualquier look.",
    price: 19900,
    image: sampleImages.apparelTertiary,
    badge: "Accesorio",
    stock: 10,
  }),
  product({
    id: "campera-senya",
    name: "Campera Senya",
    category: "Nuevos ingresos",
    tags: ["Abrigos", "Urbano"],
    description: "Campera liviana con presencia premium para media estacion.",
    price: 54900,
    image: sampleImages.apparelFeatured,
    badge: "Nuevo",
    stock: 8,
  }),
];
