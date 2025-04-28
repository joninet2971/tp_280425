import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getStoredProducts, saveProducts } from './productsData';

const ProductForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: '',
    price: '',
    stock: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
    price: Yup.number()
      .required('El precio es requerido')
      .positive('El precio debe ser mayor que 0'),
    stock: Yup.number()
      .required('El stock es requerido')
      .integer('El stock debe ser un número entero')
      .min(0, 'El stock no puede ser negativo')
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    try {
      // Obtener productos actuales
      const currentProducts = getStoredProducts();
      
      // Generar un nuevo ID (el máximo ID actual + 1)
      const maxId = currentProducts.reduce(
        (max, product) => Math.max(max, product.id), 0
      );
      const newProduct = {
        ...values,
        id: maxId + 1,
        // Asegurarse de que price y stock sean números
        price: parseFloat(values.price),
        stock: parseInt(values.stock, 10)
      };
      
      // Agregar el nuevo producto y guardar
      const updatedProducts = [...currentProducts, newProduct];
      saveProducts(updatedProducts);
      
      alert('Producto creado con éxito');
      resetForm();
      navigate('/productos');
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="product-form">
      <h1>Crear Nuevo Producto</h1>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="form">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <Field 
                type="text" 
                id="name" 
                name="name" 
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} 
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">Precio</label>
              <Field 
                type="number" 
                id="price" 
                name="price" 
                step="0.01"
                className={`form-control ${errors.price && touched.price ? 'is-invalid' : ''}`} 
              />
              <ErrorMessage name="price" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="stock" className="form-label">Stock</label>
              <Field 
                type="number" 
                id="stock" 
                name="stock" 
                className={`form-control ${errors.stock && touched.stock ? 'is-invalid' : ''}`} 
              />
              <ErrorMessage name="stock" component="div" className="invalid-feedback" />
            </div>

            <div className="d-flex gap-2">
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? 'Guardando...' : 'Guardar'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => navigate('/productos')}
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
