import { useEffect, useState } from "react"
import {  useNavigate } from "react-router-dom"
import VehiculoService from "../services/VehiculoService"
import { FaEye, FaCheckCircle, FaExclamationCircle } from "react-icons/fa"
import "../css/DocumentacionList-css.css" // <--- Importamos el nuevo CSS

function DocumentacionList() {

    const navigate = useNavigate()
    const [vehiculos, setVehiculos] = useState([])

    const cargarVehiculos = () => {
        VehiculoService.obtenerTodos()
                        .then(res => setVehiculos(res.data))
                        .catch(err => console.error("Error al cargar los vehiculos: ", err))
    }

    useEffect(() => {
        cargarVehiculos()
    }, [])

    const esDocumentacionCompleta = (documentacion) => {
        if (!documentacion) return false
        return (
            documentacion.formulario08 && 
            documentacion.cedulaVerde && 
            documentacion.titulo && 
            documentacion.verificacionPolicial && 
            documentacion.informeDominioRnpa && 
            documentacion.informeMultasRnpa && 
            documentacion.estadoImpositivo
        )
    }

    const vehiculosActivos = vehiculos.filter(v => !v.fechaEgreso);
    
    const docCompleta = vehiculosActivos.filter(v => esDocumentacionCompleta(v.documentacion));
    const docIncompleta = vehiculosActivos.filter(v => !esDocumentacionCompleta(v.documentacion));

    const total = vehiculosActivos.length;
    const porcentajeCompleto = total > 0 ? Math.round((docCompleta.length / total) * 100) : 0;
    
    const chartStyle = {
        background: `conic-gradient(#10b981 ${porcentajeCompleto}%, #ef4444 0)`
    };

    return (
        <div className="doc-list-container">
            
            <h2 className="page-title">Estado de Documentación</h2>

            {/* --- GRÁFICO (KPIs) --- */}
            <div className="chart-container">
                <div className="pie-chart-wrapper">
                    <div className="pie-chart" style={chartStyle}>
                        <div className="chart-center-text">
                            <span className="chart-number">{porcentajeCompleto}%</span>
                            <span className="chart-label">Completos</span>
                        </div>
                    </div>
                </div>

                <div className="chart-legend">
                    <div className="legend-item">
                        <span className="dot dot-green"></span> 
                        Completa: <strong>{docCompleta.length}</strong>
                    </div>
                    <div className="legend-item">
                        <span className="dot dot-red"></span> 
                        Incompleta: <strong>{docIncompleta.length}</strong>
                    </div>
                </div>
            </div>

            {/* ---  LISTAS --- */ }
            <div className="lists-grid">
                
                {/* TARJETA VERDE: COMPLETOS */}
                <div className="list-card">
                    <div className="list-header header-complete">
                        <span><FaCheckCircle/> Documentación Al Día</span>
                        <span className="badge-count">{docCompleta.length}</span>
                    </div>
                    <ul className="list-body">
                        {docCompleta.length > 0 ? (
                            docCompleta.map(vc => (
                                <li key={vc.id} className="list-item">
                                    <div className="item-info">
                                        <span className="item-title">{vc.marca} {vc.modelo} {vc.anio}</span>
                                        <span className="item-subtitle">{vc.patente}</span>
                                    </div>
                                    <button 
                                        className="btn-view"
                                        onClick={() => navigate(`/vehiculos/${vc.id}/documentacion`)} 
                                        title="Ver detalles"
                                    >
                                        <FaEye />
                                    </button>
                                </li>
                            ))
                        ) : (
                            <div className="empty-msg">No hay vehículos con documentación completa.</div>
                        )}
                    </ul>
                </div>

                {/* TARJETA ROJA: INCOMPLETOS */}
                <div className="list-card">
                    <div className="list-header header-incomplete">
                        <span><FaExclamationCircle/> Falta Documentación</span>
                        <span className="badge-count">{docIncompleta.length}</span>
                    </div>
                    <ul className="list-body">
                        {docIncompleta.length > 0 ? (
                            docIncompleta.map(vi => (
                                <li key={vi.id} className="list-item">
                                    <div className="item-info">
                                        <span className="item-title">{vi.marca} {vi.modelo} {vi.anio}</span>
                                        <span className="item-subtitle">{vi.patente}</span>
                                    </div>
                                    <button 
                                        className="btn-view"
                                        onClick={() => navigate(`/vehiculos/${vi.id}/documentacion`)} 
                                        title="Gestionar Papeles"
                                    >
                                        <FaEye />
                                    </button>
                                </li>
                            ))
                        ) : (
                            <div className="empty-msg">No hay vehículos con documentación pendiente.</div>
                        )}
                    </ul>
                </div>

            </div>

        </div>
    )
}

export default DocumentacionList