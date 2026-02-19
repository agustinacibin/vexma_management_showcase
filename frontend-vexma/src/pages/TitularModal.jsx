import { useState } from "react";
import TitularService from "../services/TitularService";
import "../css/Form_css.css"

function TitularModal({onClose, onTitularCreado}) {

    const [nuevoTitular, setNuevoTitular] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        fechaNacimiento: ""
    })

    const handleChange = (e) => {
        setNuevoTitular({...nuevoTitular, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try{
            const res = await TitularService.guardar(nuevoTitular)
            onTitularCreado(res.data)
            alert("Titular creado exitosamente!")
            onClose()
        } catch (err) {
            console.error(err)
            alert("Error al crear titular. Verifique sus datos y si el DNI ya existe.")
        }
    }


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                
                <div className="form-header" style={{marginBottom:'30px'}}>
                    <h3>Nuevo Titular</h3>
                    <button onClick={onClose} className="close-modal-btn">✕</button>
                </div>

                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                    
                    <div className="form-row">
                        <input
                            className="styled-input"
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={nuevoTitular.nombre}
                            onChange={handleChange}
                            required
                            style={{ textTransform: "capitalize" }}
                        />
                        <input
                            className="styled-input"
                            type="text"
                            name="apellido"
                            placeholder="Apellido"
                            value={nuevoTitular.apellido}
                            onChange={handleChange}
                            required
                            style={{ textTransform: "capitalize" }}
                        />
                    </div>

                    <input
                        className="styled-input"
                        type="number"
                        name="dni"
                        placeholder="DNI / CUIL"
                        value={nuevoTitular.dni}
                        onChange={handleChange}
                        maxLength={15}
                        required
                    />

                    <input
                        className="styled-input"
                        type={nuevoTitular.fechaNacimiento ? "date" : "text"}
                        onFocus={(e) => e.target.type = 'date'}
                        onBlur={(e) => {
                            if (!nuevoTitular.fechaNacimiento) e.target.type = 'text';
                        }}
                        name="fechaNacimiento"
                        placeholder="Fecha de Nacimiento"
                        value={nuevoTitular.fechaNacimiento}
                        onChange={handleChange}
                        required
                    />

                    <div className="modal-actions">
                        <button type="submit" className="submit-btn" style={{marginTop:0}}>Guardar</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default TitularModal