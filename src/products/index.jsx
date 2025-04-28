import { Routes, Route } from 'react-router-dom';
import ProductsView from './ProductsView';
import ProductForm from './ProductForm';

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsView />} />
      <Route path="/crear" element={<ProductForm />} />
    </Routes>
  );
};

export default ProductsRoutes;
