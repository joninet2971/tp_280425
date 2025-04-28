import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredProducts, saveProducts } from './productsData';

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar productos desde localStorage
    const loadProducts = () => {
      try {
        const storedProducts = getStoredProducts();
        setProducts(storedProducts);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      saveProducts(updatedProducts);
    }
  };

  if (loading) return <div>Cargando productos...</div>;

  return (
    <div className="products-view">
      <h1>Lista de Productos</h1>
      <Link to="/productos/crear" className="btn btn-primary mb-3">
        Crear Nuevo Producto
      </Link>
      
      {products.length === 0 ? (
        <p>No hay productos disponibles. ¡Crea uno nuevo!</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock} unidades</td>
                <td>
                  <button 
                    onClick={() => handleDelete(product.id)} 
                    className="btn btn-sm btn-danger"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsView;
