import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUnicorns } from '../context/UnicornContext';
import { exportToPdf } from '../utils/ExportToPdf';

const UnicornsView = () => {
  const { unicorns, getUnicorns, deleteUnicorn } = useUnicorns();

  useEffect(() => {
    getUnicorns();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUnicorn(id);
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const handleExportPdf = () => {
    const columns = ['Nombre', 'Edad', 'Color'];
    const data = unicorns.map(unicorn => [
      unicorn.name,
      unicorn.age,
      unicorn.color
    ]);
    exportToPdf(data, 'Unicornios', columns);
  };

  return (
    <div className="unicorns-view">
      <h1>Lista de Unicornios</h1>
      <Link to="/unicornios/crear" className="btn btn-primary mb-3 me-2">
        Crear Nuevo Unicornio
      </Link>
      <button onClick={handleExportPdf} className="btn btn-success mb-3">
        Exportar a PDF
      </button>
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
    </div>
  );
};

export default UnicornsView;
