import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUnicorns } from '../context/UnicornContext';

const UnicornForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createUnicorn, editUnicorn, unicorns, getUnicorns } = useUnicorns();
  const [initialValues, setInitialValues] = useState({
    name: '',
    age: '',
    color: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      // If editing, we need to make sure we have the unicorns loaded
      const loadUnicorn = async () => {
        // Check if unicorns are already loaded
        if (unicorns.length === 0) {
          await getUnicorns();
        }
        
        const unicorn = unicorns.find(u => u._id === id);
        if (unicorn) {
          setInitialValues({
            name: unicorn.name,
            age: unicorn.age,
            color: unicorn.color
          });
        } else {
          alert('Unicornio no encontrado');
          navigate('/unicornios');
        }
      };
      
      loadUnicorn();
    }
  }, [id, unicorns, getUnicorns, navigate, isEditMode]);

  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
    age: Yup.number()
      .required('La edad es requerida')
      .positive('La edad debe ser mayor que 0')
      .integer('La edad debe ser un número entero'),
    color: Yup.string().required('El color es requerido')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    try {
      if (isEditMode) {
        await editUnicorn(id, values);
        alert('Unicornio actualizado con éxito');
      } else {
        await createUnicorn(values);
        resetForm();
        alert('Unicornio creado con éxito');
      }
      navigate('/unicornios');
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="unicorn-form">
      <h1>{isEditMode ? 'Editar Unicornio' : 'Crear Nuevo Unicornio'}</h1>
      
      <Formik
        enableReinitialize
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
              <label htmlFor="age" className="form-label">Edad</label>
              <Field 
                type="number" 
                id="age" 
                name="age" 
                className={`form-control ${errors.age && touched.age ? 'is-invalid' : ''}`} 
              />
              <ErrorMessage name="age" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="color" className="form-label">Color</label>
              <Field 
                type="text" 
                id="color" 
                name="color" 
                placeholder="rojo, verde, azul, etc." 
                className={`form-control ${errors.color && touched.color ? 'is-invalid' : ''}`} 
              />
              <ErrorMessage name="color" component="div" className="invalid-feedback" />
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
                onClick={() => navigate('/unicornios')}
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

export default UnicornForm;
