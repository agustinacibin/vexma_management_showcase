import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import VehiculoService from "../services/VehiculoService";
import TitularService from "../services/TitularService";
import TitularModal from "./TitularModal";
import "../css/Form_css.css";

function VehiculoForm() {
  const [vehiculo, setVehiculo] = useState({
    patente: "",
    marca: "",
    modelo: "",
    anio: "",
    version: "",
    isNuevo: "",
    tipo: "",
    titular: null,
    precioCompra: "",
    precioLista: "",
    fechaIngreso: "",
    fechaEgreso: null,
  });

  const [listaTitulares, setListaTitulares] = useState([]);
  const [showTitularModal, setShowTitularModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    TitularService.obtenerTodos()
      .then((res) => setListaTitulares(res.data))
      .catch((error) => console.error("Error al cargar titulares", error));

    if (id) {
      VehiculoService.obtenerPorId(id)
        .then((res) => {
          const data = res.data;
          setVehiculo({
            ...data,
            isNuevo: data.isNuevo.toString(),
            titular: data.titular || null,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "patente") {
      setVehiculo({ ...vehiculo, [name]: value.toUpperCase() });
    } else {
      setVehiculo({ ...vehiculo, [name]: value });
    }
  };

  const handleTitularSelect = (e) => {
    const idSeleccionado = e.target.value;
    if (!idSeleccionado) {
      setVehiculo({ ...vehiculo, titular: null });
    } else {
      setVehiculo({ ...vehiculo, titular: { id: idSeleccionado } });
    }
  };

  const handleTitularCreado = (nuevoTitular) => {
    setListaTitulares([...listaTitulares, nuevoTitular]);
    setVehiculo({ ...vehiculo, titular: nuevoTitular });
    setShowTitularModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vehiculo.titular || !vehiculo.titular.id) {
      alert("Por favor, selecciona un Titular de la lista.");
      return;
    }
    if (vehiculo.isNuevo === "") {
      alert("Por favor, indica si el vehículo es Nuevo o Usado.");
      return;
    }
    if (vehiculo.tipo === "") {
      alert("Por favor, selecciona un Tipo de la lista.");
      return;
    }

    try {
      const datosAEnviar = { ...vehiculo };
      delete datosAEnviar.actividades;
      delete datosAEnviar.documentacion;

      if (datosAEnviar.titular && datosAEnviar.titular.id) {
        datosAEnviar.titular = { id: datosAEnviar.titular.id };
      }

      if (!datosAEnviar.fechaIngreso) datosAEnviar.fechaIngreso = null;
      datosAEnviar.isNuevo = vehiculo.isNuevo === "true";
      datosAEnviar.precioCompra = parseFloat(vehiculo.precioCompra);
      datosAEnviar.precioLista = parseFloat(vehiculo.precioLista);

      if (id) {
        await VehiculoService.actualizar(datosAEnviar);
        alert("Vehículo actualizado con éxito!");
        navigate(`/vehiculos/${id}`);
      } else {
        await VehiculoService.guardar(datosAEnviar);
        alert("Vehículo guardado con éxito!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Error al guardar.");
    }
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit} style={{marginTop:"5%"}}>
        
        {/* Header dentro del formulario */}
        <div className="form-header">
          <Link to={id ? `/vehiculos/${id}` : "/"} style={{ color: "royalblue", fontSize: "24px" }}>
            <SlArrowLeft />
          </Link>
          <h3>{id ? "Editar Vehículo" : "Nuevo Vehículo"}</h3>
        </div>

        {/* Patente */}
        <input
          className="styled-input"
          type="text"
          name="patente"
          placeholder="Patente"
          value={vehiculo.patente}
          onChange={handleChange}
          required
          maxLength="7"
        />

        {/* Marca y Modelo */}
        <div className="form-row">
          <input
            className="styled-input"
            type="text"
            name="marca"
            placeholder="Marca"
            value={vehiculo.marca}
            onChange={handleChange}
            required
            style={{ textTransform: "capitalize" }}
          />
          <input
            className="styled-input"
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={vehiculo.modelo}
            onChange={handleChange}
            required
            style={{ textTransform: "capitalize" }}
          />
        </div>

        {/* Año y Versión */}
        <div className="form-row">
          <input
            className="styled-input"
            type="number"
            name="anio"
            placeholder="Año"
            max={new Date().getFullYear()}
            value={vehiculo.anio}
            onChange={handleChange}
            required
          />
          <input
            className="styled-input"
            type="text"
            name="version"
            placeholder="Versión"
            value={vehiculo.version}
            onChange={handleChange}
            required
            style={{ textTransform: "capitalize" }}
          />
        </div>

        {/* Tipo y Estado */}
        <div className="form-row">
          <select
            className="styled-input"
            name="tipo"
            value={vehiculo.tipo}
            onChange={handleChange}
          >
            <option value="">Seleccione un Tipo</option>
            <option value="SEDAN_2P">Sedán 2P</option>
            <option value="SEDAN_3P">Sedán 3P</option>
            <option value="SEDAN_4P">Sedán 4P</option>
            <option value="SEDAN_5P">Sedán 5P</option>
            <option value="RURAL_5P">Rural 5P</option>
            <option value="SUV">Suv</option>
            <option value="PICKUP_CABINA_SIMPLE">Pick-Up Cabina Simple</option>
            <option value="PICKUP_CABINA_DOBLE">Pick-Up Cabina Doble</option>
            <option value="FURGON">Furgón</option>
            <option value="TODO_TERRENO">Todo Terreno</option>
            <option value="CAMION">Camión</option>
            <option value="OTRO">Otro</option>
          </select>

          <select
            className="styled-input"
            name="isNuevo"
            value={vehiculo.isNuevo}
            onChange={handleChange}
          >
            <option value="">Seleccione un Estado</option>
            <option value="true">Nuevo (0km)</option>
            <option value="false">Usado</option>
          </select>
        </div>

        {/* Precios */}
        <div className="form-row">
          <input
            className="styled-input"
            type="number"
            name="precioCompra"
            placeholder="Precio de Compra"
            value={vehiculo.precioCompra}
            step="any"
            min="0"
            onChange={handleChange}
          />
          <input
            className="styled-input"
            type="number"
            name="precioLista"
            placeholder="Precio de Lista"
            value={vehiculo.precioLista}
            step="any"
            min="0"
            onChange={handleChange}
          />
        </div>

        {/* Fecha Ingreso */}
        <input
          className="styled-input"

          type={vehiculo.fechaIngreso ? "date" : "text"}
          onFocus={(e) => e.target.type = 'date'}
          onBlur={(e) => {
            if (!vehiculo.fechaIngreso) e.target.type = 'text';
          }}

          name="fechaIngreso"
          placeholder="Fecha de Ingreso"
          value={vehiculo.fechaIngreso}
          onChange={handleChange}
          required
        />

        {/* Selección de Titular */}
        <div className="form-row">
          <select
            className="styled-input"
            onChange={handleTitularSelect}
            value={vehiculo.titular?.id || ""}
          >
            
            <option value="">Seleccione un Titular</option>
            {listaTitulares
              .sort((a, b) => a.apellido.localeCompare(b.apellido))
              .map((t) => (
                <option key={t.id} value={t.id}>
                  {t.apellido}, {t.nombre} - DNI | CUIL: {t.dni}
                </option>
              ))}
          </select>
          
          <button
            type="button"
            className="add-titular-btn"
            onClick={() => setShowTitularModal(true)}
            title="Crear Nuevo Titular"
          >
            + 
          </button>
        </div>

        {/* Botón Guardar */}
        <button type="submit" className="submit-btn">
          Guardar Vehículo
        </button>
      </form>

      {showTitularModal && (
        <TitularModal
          onClose={() => setShowTitularModal(false)}
          onTitularCreado={handleTitularCreado}
        />
      )}
    </div>
  );
}

export default VehiculoForm;