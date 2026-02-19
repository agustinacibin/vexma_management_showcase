import {useState, useEffect} from "react";
import TitularService from "../services/TitularService";
import {FaEdit, FaTrash} from "react-icons/fa";
import { Link } from "react-router-dom";
import VehiculoService from "../services/VehiculoService";
import "../css/TitularList-css.css"
import { SlArrowLeft } from "react-icons/sl";


function TitularList(){

    const [titulares, setTitulares] = useState([])
    const [vehiculos, setVehiculos] = useState([])
    const [vehiculosPopUp, setVehiculosPopUp] = useState(null)

    const cargarTitulares = () => {
        TitularService.obtenerTodos()
                        .then(res => {
                            setTitulares(res.data)
                        })
                        .catch(err => console.log("Error al cargar los titulares.", err))
    }

    const cargarVehiculos = () => {
        VehiculoService.obtenerTodos()
                        .then(res => {
                            setVehiculos(res.data)
                        })
                        .catch(err => console.error("Error al cargar los vehiculos,", err))
    }

    useEffect(() => {
        cargarTitulares()
        cargarVehiculos()
    }, [])

    const handleVehiculos = (listaVehiculos) => {
        setVehiculosPopUp(listaVehiculos)
    }

    const cerrarPopup = () => {
        setVehiculosPopUp(null)
    }

    const borrarTitular = (id) => {
        if(window.confirm("Esta seguro que desea borrar el titular?")){
            TitularService.borrar(id)
                            .then(() => cargarTitulares())
                            .catch(err => {
                                alert("Error al eliminar el titular: posee vehículos a su nombre.")
                                console.error(err)
                            })
        }
    }

    const formatearFecha = (fecha) => {
        if (!fecha) return "-";
        const [anio, mes, dia] = fecha.toString().split('-');
        return `${dia}/${mes}/${anio}`;
    }

    return(
        <div className="titular-list-container">
            <h2>Listado de Titulares</h2>
        
            <table className="main-table">
                <thead>
                    <tr>
                        <th>DNI / CUIL</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Vehiculos a su Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {titulares.map(titular => {
                        const nombreVehiculos = vehiculos.filter(v => v.titular?.id === titular.id && !v.fechaEgreso)
                        const cantidadVehiculos = nombreVehiculos.length 

                        return (
                            <tr key={titular.id}>
                                <td>{titular.dni}</td>
                                <td>{titular.apellido}</td>
                                <td>{titular.nombre}</td>
                                <td>{formatearFecha(titular.fechaNacimiento)}</td>
                                
                                {/* COLUMNA DE VEHÍCULOS */}
                                <td>
                                    {cantidadVehiculos > 0 ? (
                                        <button 
                                            onClick={() => handleVehiculos(nombreVehiculos)}
                                            className="vehicle-count-badge"
                                            title="Ver detalle"
                                        >
                                            {cantidadVehiculos}
                                        </button>
                                    ) : (
                                        <span className="no-data">-</span>
                                    )}
                                </td>
                                <td>
                                    {/*Editar*/}
                                    <Link to={`/titulares/${titular.id}/editar`}>
                                        <button className="action-btn" title="Editar titular">
                                            <FaEdit color='rgb(153, 182, 255)'/>
                                        </button>
                                    </Link>

                                    {/*Borrar*/}
                                    <button onClick={() => borrarTitular(titular.id)} className="action-btn" title="Borrar titular">
                                        <FaTrash color='#e05656'/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* MODAL POPUP */}
            {vehiculosPopUp && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <div className="modal-header">
                            <button onClick={cerrarPopup} className="close-icon-btn"><SlArrowLeft/></button>
                            <h3>Vehículos a su Nombre</h3>
                        </div>
                        
                        <ul className="modal-vehicle-list">
                            {vehiculosPopUp.map(v => (
                                <li key={v.id} className="modal-vehicle-item">
                                    <strong>{v.marca} {v.modelo} {v.anio}</strong>
                                    <span className="modal-vehicle-details">
                                        Patente: {v.patente}
                                    </span>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            )}
        
        </div>
    )
}

export default TitularList