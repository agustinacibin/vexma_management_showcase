import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { FaCar, FaUsers, FaPlus, FaFileArchive } from 'react-icons/fa';
import { useState } from "react";
import "./App.css";

// Importamos tus páginas existentes
import VehiculoList from "./pages/VehiculoList";
import VehiculoForm from "./pages/VehiculoForm";
import TitularForm from "./pages/TitularForm.jsx";
import VehiculoDetalle from "./pages/VehiculoDetalle.jsx";
import VehiculoDocumentacion from "./pages/VehiculoDocumentacion.jsx";
import TitularList from "./pages/TitularList.jsx";
import DocumentacionList from "./pages/DocumentacionList.jsx";

// Importamos lo nuevo de seguridad
import Login from "./pages/Login.jsx";
import PrivateRoute from "./pages/PrivateRoute.jsx";


// --- COMPONENTE LAYOUT PRIVADO ---
// Aquí movemos TODA tu lógica anterior (Sidebar, Header, Estados)
function LayoutPrivado() {
  const [agregarNuevo, setAgregarNuevo] = useState(true)
  const [mostrarBoton, setMostrarBoton] = useState(true)

  return (
    <>
      <div className="header-class">
        <header>VEXMA Management</header>
      </div>

      <div className="app-layout">
        <div className="sidebar-class">
          <nav>
            <ul>
              <li>
                <span style={{ marginLeft: "15px", marginBottom: "0px", fontSize: "28px", fontWeight: "500" }}>Menú</span>
                <NavLink to="/"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={() => { setAgregarNuevo(true), setMostrarBoton(true) }}>
                  <FaCar /> Vehículos
                </NavLink>
              </li>
              <li>
                <NavLink to="/titulares"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={() => { setAgregarNuevo(false), setMostrarBoton(true) }}>
                  <FaUsers /> Titulares
                </NavLink>
              </li>
              <li>
                <NavLink to="/documentacion"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  onClick={() => setMostrarBoton(false)}>
                  <FaFileArchive /> Documentación
                </NavLink>
              </li>

              {mostrarBoton && (
                <li id="agregar-contenido-item">
                  {agregarNuevo ? (
                    <NavLink to="/crear"
                      className={({ isActive }) => (isActive ? "active-link" : "")}>
                      <FaPlus /> Nuevo Vehículo
                    </NavLink>
                  ) : (
                    <NavLink to="/crear-titular"
                      className={({ isActive }) => (isActive ? "active-link" : "")}>
                      <FaPlus /> Nuevo Titular
                    </NavLink>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div
          className="main-content-container"
          style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
        >
          {/* RUTAS INTERNAS DEL SISTEMA */}
          <Routes>
            <Route path="/" element={<VehiculoList />} />
            <Route path="/crear" element={<VehiculoForm />} />
            <Route path="/vehiculos/:id" element={<VehiculoDetalle />} />
            <Route path="/vehiculos/:id/editar" element={<VehiculoForm />} />
            <Route path="/vehiculos/:id/documentacion" element={<VehiculoDocumentacion />} />
            <Route path="/documentacion" element={<DocumentacionList />} />
            <Route path="/titulares" element={<TitularList />} />
            <Route path="/crear-titular" element={<TitularForm />} />
            <Route path="/titulares/:id/editar" element={<TitularForm />} />
            {/* Si no encuentra ruta, volver al inicio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

// --- APP PRINCIPAL (ROUTER) ---
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA PÚBLICA: Login */}
        <Route path="/login" element={<Login />} />

        {/* RUTA PRIVADA: Todo lo demás (/*) */}
        <Route path="/*" element={
          <PrivateRoute>
            <LayoutPrivado />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;