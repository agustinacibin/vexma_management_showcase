import { useState, useEffect } from "react";
import VehiculoService from "../services/VehiculoService";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaMoneyBillWave,
  FaUndo,
  FaFileArchive,
  FaCar,
  FaUsers,
  FaClock,     // Icono para el botón de stock
  FaArrowLeft  // Icono para volver en el modal
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/VehiculoList_css.css";
import { SlArrowLeft } from "react-icons/sl";

function VehiculoList() {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculosPopUp, setVehiculosPopUp] = useState(false);

  // Pide toda la lista de vehiculos
  const cargarVehiculos = () => {
    VehiculoService.obtenerTodos()
      .then((respuesta) => {
        setVehiculos(respuesta.data);
        console.log("Datos recibidos: ", respuesta.data);
      })
      .catch((error) => {
        console.error("Error al traer los vehiculos: ", error);
      });
  };

  useEffect(() => {
    cargarVehiculos();
  }, []);

  // Para borrar algun vehiculo
  const borrarVehiculo = (id) => {
    if (window.confirm("¿Seguro que desea borrar permanentemente el vehiculo?")) {
      VehiculoService.borrar(id)
        .then(() => {
          cargarVehiculos();
        })
        .catch((error) => console.error(error));
    }
  };

  // Filtro de vehículos en stock (sin fecha de egreso)
  const vehiculosActuales = vehiculos.filter((v) => !v.fechaEgreso);

  // Calculo de Capital Total
  let vehiculosCostoTotal = 0.0;
  vehiculosActuales.forEach((v) => {
    vehiculosCostoTotal += v.precioCompra;
    if (v.actividades) {
      vehiculosCostoTotal += v.actividades
        .filter((a) => !a.isPendiente && a.gasto)
        .reduce((acc, curr) => acc + curr.gasto, 0);
    }
  });

  const cerrarPopup = () => {
    setVehiculosPopUp(false);
  };

  // Función para calcular antigüedad en días
  const calcularDias = (fechaIngreso) => {
    if (!fechaIngreso) return 0;
    
    const [anio, mes, dia] = fechaIngreso.split('-');
    const ingreso = new Date(anio, mes - 1, dia); 

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const diferenciaTiempo = hoy - ingreso;
    
    const dias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24)); 
    
    return dias > 0 ? dias : 0; 
  }


  const fechaFormater = (fecha) => {
    if (!fecha) return "-"
    const [anio, mes, dia] = fecha.toString().split("-")
    return `${dia}/${mes}/${anio}`
  }




  return (
    <div className="vehiculo-list-container">
      
      {/* PANEL SUPERIOR DE MÉTRICAS */}
      <div className="vehiculos-agencia">
        
        {/* Card 1: Capital */}
        <div>
          <div className="vehiculos-agencia-numero">$ {vehiculosCostoTotal.toLocaleString()}</div>
          <div className="vehiculos-agencia-texto">Capital Total</div>
        </div>

        {/* Card 2: Cantidad */}
        <div>
          <div className="vehiculos-agencia-numero">{vehiculosActuales.length}</div>
          <div className="vehiculos-agencia-texto">
            {vehiculosActuales.length !== 1 ? "Vehículos en Agencia" : "Vehículo en Agencia"}
          </div>
        </div>

        {/* Card 3: Tiempo de Permanencia */}
        <div style={{cursor: 'pointer'}} onClick={() => setVehiculosPopUp(true)}>
          <div className="vehiculos-agencia-numero hover-effect">
             <FaClock size={40} color="#000000" />
          </div>
          <div className="vehiculos-agencia-texto">
            Tiempo de Permanencia
          </div>
        </div>
      </div>

      <div className="vehiculo-datos-lista-divisor"></div>

      <h2 className="vehiculo-list-container-h2">Listado de Vehículos</h2>

      {/* LISTA PRINCIPAL DE VEHÍCULOS */}
      {vehiculos.map((vehiculo) => (
        <div
          key={vehiculo.id}
          className="main-vehicle-container"
          style={
            vehiculo.fechaEgreso
              ? { backgroundColor: "rgba(240, 248, 255, 0.41)" }
              : { opacity: "100%" }
          }
        >
          <div className="vehiculo-container">
            <div
              className="vehiculo-informacion-container"
              style={
                vehiculo.fechaEgreso ? { opacity: "65%" } : { opacity: "100%" }
              }
            >
              <div id="main-car-info">
                <span style={{ whiteSpace: "normal" }}>
                  <strong>
                    {vehiculo.marca} {vehiculo.modelo} {vehiculo.version}{" "}
                    {vehiculo.anio}
                  </strong>
                </span>

                <div id="main-car-info-line-container">
                  <div id="main-car-info-line"></div>
                </div>

                <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                  {vehiculo.patente}
                </span>
              </div>
              <div id="car-owner">
                <strong>Titular:</strong>{" "}
                {vehiculo.titular
                  ? vehiculo.titular.apellido + ", " + vehiculo.titular.nombre
                  : "-"}
              </div>
            </div>

            <div className="vehiculo-estado-container">
              <p
                style={
                  vehiculo.fechaEgreso
                    ? { color: "#ff4040" }
                    : { color: "white" }
                }
              >
                {vehiculo.fechaEgreso ? "VENDIDO" : "EN AGENCIA"}
              </p>
            </div>
          </div>

          <div className="acciones-container">
            {/*Ver detalles*/}
            <Link to={`/vehiculos/${vehiculo.id}`}>
              <button style={{ marginRight: "5px" }} title="Ver detalles">
                <FaEye color="rgb(117, 227, 255)" />
              </button>
            </Link>

            {/* Ver Documentación Asociada */}
            <Link to={`/vehiculos/${vehiculo.id}/documentacion`}>
              <button style={{ marginRight: "5px" }} title="Ver documentación">
                <FaFileArchive color="white" />
              </button>
            </Link>

            {/*Borrar*/}
            <button
              onClick={() => borrarVehiculo(vehiculo.id)}
              style={{ marginRight: "5px" }}
              title="Borrar vehículo"
            >
              <FaTrash color="#fd4545" />
            </button>
          </div>
        </div>
      ))}

      {/* MODAL POPUP - ANTIGÜEDAD DE STOCK */}
      {vehiculosPopUp && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <button onClick={cerrarPopup} className="close-icon-btn">
                <SlArrowLeft />
              </button>
              <h3>Antigüedad de Vehículos</h3>
            </div>

            <ul className="modal-vehicle-list">
              {/* Filtramos solo los EN AGENCIA y Ordenamos por Fecha Ingreso (ASC) */}
              {vehiculosActuales
                .sort((a, b) => new Date(a.fechaIngreso) - new Date(b.fechaIngreso))
                .map((v) => {
                  const dias = calcularDias(v.fechaIngreso);
                  return (
                    <li key={v.id} className="modal-vehicle-row">
                      {/* IZQUIERDA: Datos del auto */}
                      <div className="vehicle-info-left">
                        <strong>
                          {v.marca} {v.modelo} {v.version} {v.anio}
                        </strong>
                        <span className="vehicle-sub-text">{v.patente}</span>
                      </div>

                      {/* DERECHA: Días */}
                      <div className="vehicle-days-right">
                        <strong>{dias} días</strong>
                        <small>desde {fechaFormater(v.fechaIngreso)}</small>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehiculoList;