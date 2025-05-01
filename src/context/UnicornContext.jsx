import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://crudcrud.com/api/1fdbc3b4c0c4404686062afd59ab0e9a/unicorns';

const UnicornContext = createContext();

export const useUnicorns = () => {
  const context = useContext(UnicornContext);
  return context;
};

export const UnicornProvider = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUnicorns = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setUnicorns(response.data);
      return response.data;
    } catch (err) {
      setError('Error al obtener los unicornios: ' + err.message);
      console.error('Error al obtener los unicornios:', err);
      return [];
    }
  };

  const createUnicorn = async (unicorn) => {
    try {
      const response = await axios.post(API_ENDPOINT, unicorn);
      setUnicorns([...unicorns, response.data]);
      return response.data;
    } catch (err) {
      setError('Error al crear el unicornio: ' + err.message);
      console.error('Error al crear el unicornio:', err);
      throw err;
    }
  };

  const editUnicorn = async (id, updatedUnicorn) => {
    try {
      const { _id, ...unicornWithoutId } = updatedUnicorn;
      
      await axios.put(`${API_ENDPOINT}/${id}`, unicornWithoutId);
      
      setUnicorns(unicorns.map(unicorn => 
        unicorn._id === id ? { ...unicornWithoutId, _id: id } : unicorn
      ));
      
      return { ...unicornWithoutId, _id: id };
    } catch (err) {
      setError('Error al editar el unicornio: ' + err.message);
      console.error('Error al editar el unicornio:', err);
      throw err;
    }
  };

  const deleteUnicorn = async (id) => {
    try {
      await axios.delete(`${API_ENDPOINT}/${id}`);
      setUnicorns(unicorns.filter(unicorn => unicorn._id !== id));
      return true;
    } catch (err) {
      setError('Error al eliminar el unicornio: ' + err.message);
      console.error('Error al eliminar el unicornio:', err);
      throw err;
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
