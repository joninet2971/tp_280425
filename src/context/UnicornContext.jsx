import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://crudcrud.com/api/4aeb406040724232bd0a1e1e6fa059b1/unicorns';

const UnicornContext = createContext();

export const useUnicorns = () => {
  const context = useContext(UnicornContext);
  if (!context) {
    throw new Error('useUnicorns debe ser usado dentro de un UnicornProvider');
  }
  return context;
};

export const UnicornProvider = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUnicorns = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_ENDPOINT);
      setUnicorns(response.data);
      return response.data;
    } catch (err) {
      setError('Error al obtener los unicornios: ' + err.message);
      console.error('Error al obtener los unicornios:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createUnicorn = async (unicorn) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_ENDPOINT, unicorn);
      setUnicorns([...unicorns, response.data]);
      return response.data;
    } catch (err) {
      setError('Error al crear el unicornio: ' + err.message);
      console.error('Error al crear el unicornio:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editUnicorn = async (id, updatedUnicorn) => {
    setLoading(true);
    setError(null);
    try {
      // CRUDCRUD API doesn't accept _id in the body for PUT requests
      const { _id, ...unicornWithoutId } = updatedUnicorn;
      
      await axios.put(`${API_ENDPOINT}/${id}`, unicornWithoutId);
      
      // Update the local state
      setUnicorns(unicorns.map(unicorn => 
        unicorn._id === id ? { ...unicornWithoutId, _id: id } : unicorn
      ));
      
      return { ...unicornWithoutId, _id: id };
    } catch (err) {
      setError('Error al editar el unicornio: ' + err.message);
      console.error('Error al editar el unicornio:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUnicorn = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_ENDPOINT}/${id}`);
      setUnicorns(unicorns.filter(unicorn => unicorn._id !== id));
      return true;
    } catch (err) {
      setError('Error al eliminar el unicornio: ' + err.message);
      console.error('Error al eliminar el unicornio:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    unicorns,
    setUnicorns,
    loading,
    error,
    getUnicorns,
    createUnicorn,
    editUnicorn,
    deleteUnicorn
  };

  return (
    <UnicornContext.Provider value={value}>
      {children}
    </UnicornContext.Provider>
  );
};

export default UnicornContext;
