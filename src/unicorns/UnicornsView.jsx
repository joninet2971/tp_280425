import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUnicorns } from '../context/UnicornContext';

const UnicornsView = () => {
  const { unicorns, loading, error, getUnicorns, deleteUnicorn } = useUnicorns();

  useEffect(() => {
    getUnicorns();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este unicornio?')) {
      try {
        await deleteUnicorn(id);
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  if (loading) return <div>Cargando unicornios...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="unicorns-view">
      <h1>Lista de Unicornios</h1>
      <Link to="/unicornios/crear" className="btn btn-primary mb-3">
        Crear Nuevo Unicornio
      </Link>
      
      {unicorns.length === 0 ? (
        <p>No hay unicornios disponibles. ¡Crea uno nuevo!</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Color</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {unicorns.map((unicorn) => (
              <tr key={unicorn._id}>
                <td>{unicorn.name}</td>
                <td>{unicorn.age}</td>
                <td>{unicorn.color}</td>
                <td>
                  <Link 
                    to={`/unicornios/editar/${unicorn._id}`} 
                    className="btn btn-sm btn-info me-2"
                  >
                    Editar
                  </Link>
                  <button 
                    onClick={() => handleDelete(unicorn._id)} 
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

export default UnicornsView;
