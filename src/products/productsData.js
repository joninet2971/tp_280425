// Datos iniciales de productos
const initialProducts = [
  {
    id: 1,
    name: 'Poción de Arcoíris',
    price: 299.99,
    stock: 15
  },
  {
    id: 2,
    name: 'Cuerno Mágico',
    price: 599.99,
    stock: 5
  },
  {
    id: 3,
    name: 'Cepillo para Crines',
    price: 49.99,
    stock: 30
  },
  {
    id: 4,
    name: 'Herradura Brillante',
    price: 129.99,
    stock: 12
  }
];

// Función para obtener productos del localStorage o usar los iniciales
export const getStoredProducts = () => {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  // Si no hay productos en localStorage, guardamos los iniciales y los retornamos
  localStorage.setItem('products', JSON.stringify(initialProducts));
  return initialProducts;
};

// Función para guardar productos en localStorage
export const saveProducts = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

export default initialProducts;
