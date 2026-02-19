import {useState, useEffect} from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { SlArrowLeft } from "react-icons/sl";
import TitularService from '../services/TitularService'
import "../css/Form_css.css"

function TitularForm() {

    const [titular, setTitular] = useState({
        dni: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: ""
    })

    const navigate = useNavigate();

    const {id} = useParams()

    useEffect(() => {
        if (id) {
            TitularService.obtenerPorId(id)
                            .then(res => {
                                const data = res.data

                                setTitular({
                                    ...data
                                })
                            })
                            .catch(err => console.error(err))

        }
    }, [id])


    const handleChange = (e) => {
        const {name, value} = e.target;

        setTitular({...titular, [name]:value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{ 

            if (id) {
                await TitularService.actualizar(titular)
                alert("Titular actualizado con éxito!")
                navigate("/titulares")
            } else {
                await TitularService.guardar(titular);
                alert("Titular guardado con éxito!");
                navigate(-1);
            }
         
            
        } catch(error) {
            console.error(error)
            alert("Error al " + (id ? "guardar" : "actualizar") + " el titular.")
            console.error(error)
        }
    }


    const handleVolver = () => {
        navigate(-1);
    }


    return (

        <div className="form-container" style={{marginTop:"8%"}}>
            
            {/* HEADER CON FLECHA Y TÍTULO */}
            <div className="form-header">
                {id ? (
                    <Link to={"/titulares"}>
                        <SlArrowLeft />
                    </Link>
                ) : (
                    <a onClick={handleVolver} style={{cursor:"pointer"}}>
                        <SlArrowLeft />
                    </a>
                )}
                <h3>{id ? "Editar Titular" : "Nuevo Titular"}</h3>
            </div>

            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                
                {/* FILA 1: Nombre y Apellido */}
                <div className="form-row">
                    <input
                        className="styled-input"
                        type="text"
                        name='nombre'
                        placeholder="Nombre"
                        value={titular.nombre}
                        onChange={handleChange}
                        required
                        style={{ textTransform: "capitalize" }}
                    />
                    <input
                        className="styled-input"
                        type="text"
                        name='apellido'
                        placeholder="Apellido"
                        value={titular.apellido}
                        onChange={handleChange}
                        required
                        style={{ textTransform: "capitalize" }}
                    />
                </div>

                {/* FILA 2: DNI */}
                <input
                    className="styled-input"
                    type="number" 
                    name="dni"
                    placeholder="DNI / CUIL"
                    value={titular.dni}
                    onChange={handleChange}
                    maxLength={15}
                    required
                />

                {/* FILA 3: Fecha (Con el truco del CSS) */}
                <input
                    className="styled-input"
                    type={titular.fechaNacimiento ? "date" : "text"}
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => {
                        if (!titular.fechaNacimiento) e.target.type = 'text';
                    }}
                    name='fechaNacimiento'
                    placeholder="Fecha de Nacimiento"
                    value={titular.fechaNacimiento}
                    onChange={handleChange}
                    required
                />

                <button type='submit' className="submit-btn">
                    Guardar Titular
                </button>

            </form>
        </div>
    )
}

export default TitularForm;











