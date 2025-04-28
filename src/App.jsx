import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { UnicornProvider } from './context/UnicornContext';
import UnicornsRoutes from './unicorns';
import ProductsRoutes from './products';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Unicornios & Productos</Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/unicornios">Unicornios</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/productos">Productos</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          {/* Ruta principal redirige a unicornios */}
          <Route path="/" element={<Navigate to="/unicornios" replace />} />
          
          {/* Rutas de Unicornios envueltas en UnicornProvider */}
          <Route 
            path="/unicornios/*" 
            element={
              <UnicornProvider>
                <UnicornsRoutes />
              </UnicornProvider>
            } 
          />
          
          {/* Rutas de Productos (sin contexto) */}
          <Route path="/productos/*" element={<ProductsRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
