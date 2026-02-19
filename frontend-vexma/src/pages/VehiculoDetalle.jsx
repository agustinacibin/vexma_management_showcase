import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import VehiculoService from '../services/VehiculoService'
import ActividadService from '../services/ActividadService'
import { SlArrowLeft } from 'react-icons/sl'
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import "../css/VehiculoDetalle-css.css"

function VehiculoDetalle() {

    const {id} = useParams()
    const navigate = useNavigate()

    const [vehiculo, setVehiculo] = useState(null)
    
    const [nuevaActividad, setNuevaActividad] = useState({
        descripcion:"", 
        gasto:"", 
        fecha:"",
        isPendiente:false
    })

    const [actividadAEditar, setActividadAEditar] = useState(null)

    const [descuento, setDescuento] = useState(2)
    const [rentabilidad, setRentabilidad] = useState(15)

    const [showVentaInput, setShowVentaInput] = useState(false)
    const [showReingresoInput, setShowReingresoInput] = useState(false)
    const [fechaVenta, setFechaVenta] = useState("")
    const [fechaReingreso, setFechaReingreso] = useState("")

    const cargarDatosVehiculo = () => {
        VehiculoService.obtenerPorId(id)
            .then(res => setVehiculo(res.data))
            .catch(err => console.error("Error al cargar el vehiculo", err))
    } 

    useEffect(() => {
        cargarDatosVehiculo()
    }, [])

    const handleGuardarActividad = async (e) => {
        e.preventDefault()
        if (!nuevaActividad.descripcion) return alert("Descripción requerida.")

        const actividadAEnviar = {
            ...nuevaActividad,
            gasto: parseFloat(nuevaActividad.gasto) || 0,
            fecha: nuevaActividad.fecha || new Date(), // Si está vacío, usa hoy
            vehiculo: {id: vehiculo.id}
        }

        try{
            await ActividadService.guardar(actividadAEnviar)
            setNuevaActividad({ descripcion:"", gasto:"", fecha:"", isPendiente:false})
            cargarDatosVehiculo()
        } catch (error) {
            alert("Error al guardar actividad", error);
        }
    }

    const abrirModalEditar = (actividad) => {
        let fechaFormat = "";
        if(actividad.fecha) {
            if(Array.isArray(actividad.fecha)) {
               const [y, m, d] = actividad.fecha;
               fechaFormat = `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            } else {
               fechaFormat = actividad.fecha.toString().split('T')[0];
            }
        }

        setActividadAEditar({
            ...actividad,
            fecha: fechaFormat,
            gasto: actividad.gasto 
        })
    }

    const handleActualizarActividad = async (e) => {
        e.preventDefault();
        try {
            const actividadUpdate = {
                ...actividadAEditar, 
                gasto: parseFloat(actividadAEditar.gasto) || 0,
                fecha: actividadAEditar.fecha || new Date().toISOString().split('T')[0], 
                vehiculo: { id: vehiculo.id } 
            };
                        
            await ActividadService.guardar(actividadUpdate);
            setActividadAEditar(null); 
            cargarDatosVehiculo(); 
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Error al actualizar la actividad: " + (error.response?.data || error.message));
        }
    }

    const borrarActividad = async (idActividad) => {
        if(window.confirm("¿Desea borrar la actividad?")) {
            await ActividadService.borrar(idActividad)
            cargarDatosVehiculo()
        }
    }


    const confirmarVenta = async () => {
        const fechaEnviar = fechaVenta || null
        if (fechaEnviar > new Date().getDate()){
            alert("La fecha enviada no puede ser mayor al día de hoy.")
        }
        try {
            await VehiculoService.vender(vehiculo.id, fechaEnviar)
            setShowVentaInput(false)
            setFechaVenta("")
            cargarDatosVehiculo()
        } catch (error) {
            console.error(error)
            alert("Error al registrar venta")
        }
    }

    const confirmarReingreso = async () => {
        const fechaEnviar = fechaReingreso || null
        try {
            await VehiculoService.reingresar(vehiculo.id, fechaEnviar)
            setShowReingresoInput(false)
            setFechaReingreso("")
            cargarDatosVehiculo()
        } catch (error) {
            console.error(error)
            alert("Error al reingresar")
        }
    }

    if (!vehiculo) return <div style={{padding:"20px"}}>Cargando datos del vehículo...</div>

    const gastoTotalCalculado = vehiculo.actividades 
        ? vehiculo.actividades
            .filter(a => !a.isPendiente && a.gasto)
            .reduce((acc, curr) => acc + curr.gasto, 0)
        : 0

    const precioMinimoVenta = (vehiculo.precioCompra || 0) + gastoTotalCalculado
    const precioContado = precioMinimoVenta * (1 + (rentabilidad/100))
    const precioDescuentoContado = precioContado * (1-(descuento/100))

    const actividadesCompletadas = vehiculo.actividades?.filter(a => !a.isPendiente) || [];
    const actividadesPendientes = vehiculo.actividades?.filter(a => a.isPendiente) || [];

    const verificarDocumentacion = (documentacion) => {
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

    const formularios = [
        { key: 'formulario08',         label: 'Formulario 08' },
        { key: 'cedulaVerde',          label: 'Cédula Verde' },
        { key: 'titulo',               label: 'Título del Automotor' },
        { key: 'verificacionPolicial', label: 'Verificación Policial' },
        { key: 'informeDominioRnpa',   label: 'Informe de Dominio' },
        { key: 'informeMultasRnpa',    label: 'Informe de Multas' },
        { key: 'estadoImpositivo',     label: 'Estado Impositivo' }
    ];

    const doc = vehiculo.documentacion || {}
    const tipos = [
        { key: 'SEDAN_2P', label: 'Sedán 2P' }, { key: 'SEDAN_3P', label: 'Sedán 3P' },
        { key: 'SEDAN_4P', label: 'Sedán 4P' }, { key: 'SEDAN_5P', label: 'Sedán 5P' },
        { key: 'RURAL_5P', label: 'Rural 5P' }, { key: 'SUV', label: 'SUV'},
        { key: 'PICKUP_CABINA_SIMPLE', label: 'Pick-Up Simple'}, { key: 'PICKUP_CABINA_DOBLE', label: 'Pick-Up Doble'},
        { key: 'FURGON', label: 'Furgón'}, { key: 'TODO_TERRENO', label: 'Todo Terreno'},   
        { key: 'CAMION', label: 'Camión'}, { key: 'TRANSPORTE_DE_PASAJEROS', label: 'Transporte Pasajeros'},
        { key: 'OTRO', label: 'Otro'}
    ]

    const fechaFormater = (fecha) => {
        if (!fecha) return ("-")
        const [anio, mes, dia] = fecha.toString().split("-")
        return (`${dia}/${mes}/${anio}`)
    }

    const formatearMoneda = (valor) => {
        if (!valor && valor !== 0) return "-";
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0, 
            maximumFractionDigits: 2
        }).format(valor);
    }

    return (
        <div className="detalle-container">
            
            {/* HEADER */}
            <header className="detalle-header">
                <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                    <Link to='/' className="btn-volver"> <SlArrowLeft/> </Link>
                    <div>
                        <h1 className="titulo-principal">{vehiculo.marca} {vehiculo.modelo} {vehiculo.anio} <span className='subtitulo-patente'>{vehiculo.patente}</span></h1>
                    </div>
                </div>
                
                <button 
                    onClick={() => navigate(`/vehiculos/${vehiculo.id}/editar`)}
                    className="btn-header-edit"
                >
                    Editar Datos <FaEdit/>
                </button>
            </header>

            <div className="detalle-grid">
                
                {/* COLUMNA 1: DATOS + ACTIVIDADES */}
                <div>
                    {/* 1. DATOS GENERALES */}
                    <div className="detalle-card">
                        <h3>Datos Generales</h3>
                        <div className="info-row"><span className="label">Versión:</span> <span className="valor">{vehiculo.version || "-"}</span></div>
                        <div className="info-row"><span className="label">Tipo:</span> <span className="valor">{tipos.find((t) => t.key === vehiculo.tipo)?.label || vehiculo.tipo || ""}</span></div>
                        <div className="info-row"><span className="label">Estado:</span> <span className="valor">{vehiculo.isNuevo ? "Nuevo 0km" : "Usado"}</span></div>
                        <div className="info-row"><span className="label">Titular:</span> <span className="valor">{vehiculo.titular ? `${vehiculo.titular.apellido}, ${vehiculo.titular.nombre}` : "Sin titular"}</span></div>
                        <div className="info-row"><span className="label">Ingreso:</span> <span className="valor">{fechaFormater(vehiculo.fechaIngreso)}</span></div>
                        {vehiculo.fechaEgreso && <div className="info-row" style={{background:'#fee2e2'}}><span className="label" style={{color:'#ef4444'}}>Vendido el:</span> <span className="valor" style={{color:'#ef4444'}}>{fechaFormater(vehiculo.fechaEgreso)}</span></div>}
                        
                        <div style={{marginTop: "20px"}}>
                           {!vehiculo.fechaEgreso ? (
                                !showVentaInput ? (
                                    <button onClick={() => setShowVentaInput(true)} className="btn-vender-principal">REGISTRAR VENTA</button>
                                ) : (
                                    <div style={{padding:'10px', background:'#f0fdf4', borderRadius:'8px', border:'1px solid #bbf7d0'}}>
                                        <small style={{color: 'green'}}>Confirmar Fecha (Vacío = Fecha Actual):</small>
                                        <div style={{display:'flex', gap:'5px', marginTop:'5px'}}>
                                            <input type="date" required placeholder="Fecha de Venta" value={fechaVenta} onChange={(e) => setFechaVenta(e.target.value)} className="input-actividad" style={{flex:1}}/>
                                            <button onClick={confirmarVenta} style={{background:'#10b981', color:'white', border:'none', borderRadius:'5px', padding:'0 10px', cursor:'pointer'}}><FaCheck/></button>
                                            <button onClick={() => setShowVentaInput(false)} style={{background:'#64748b', color:'white', border:'none', borderRadius:'5px', padding:'0 10px', cursor:'pointer'}}><FaTimes/></button>
                                        </div>
                                    </div>
                                )
                            ) : (
                                !showReingresoInput ? (
                                    <button onClick={() => setShowReingresoInput(true)} className="btn-vender-principal" style={{background:'#f59e0b'}}>REINGRESAR VEHÍCULO</button>
                                ) : (
                                    <div style={{padding:'10px', background:'#fff7ed', borderRadius:'8px', border:'1px solid #fed7aa'}}>
                                        <small style={{color: 'orange'}}>Confirmar Reingreso (Vacío = Fecha Actual):</small>
                                        <div style={{display:'flex', gap:'5px', marginTop:'5px'}}>
                                            <input type="date" required placeholder="Fecha de Reingreso" value={fechaReingreso} onChange={(e) => setFechaReingreso(e.target.value)} className="input-actividad" style={{flex:1}}/>
                                            <button onClick={confirmarReingreso} style={{background:'#f97316', color:'white', border:'none', borderRadius:'5px', padding:'0 10px', cursor:'pointer'}}><FaCheck/></button>
                                            <button onClick={() => setShowReingresoInput(false)} style={{background:'#64748b', color:'white', border:'none', borderRadius:'5px', padding:'0 10px', cursor:'pointer'}}>X</button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* 2. ACTIVIDADES */}
                    <div className="detalle-card" style={{marginTop:'25px'}}>
                        <h3>Actividades</h3>
                        
                        <form onSubmit={handleGuardarActividad} className="form-actividad">
                            <input placeholder="Descripción..." className="input-actividad" value={nuevaActividad.descripcion} onChange={e => setNuevaActividad({...nuevaActividad, descripcion: e.target.value})} style={{width:'100%', boxSizing:'border-box'}}/>
                            <div className="actividad-inputs-row">
                                <input type="number" placeholder="Costo" className="input-actividad" style={{width:'80px'}} value={nuevaActividad.gasto} onChange={e => setNuevaActividad({...nuevaActividad, gasto: e.target.value})}/>
                                <input 
                                    type={nuevaActividad.fecha ? "date" : "text"}
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => {
                                        if (!nuevaActividad.fecha) e.target.type = 'text';
                                    }}
                                    placeholder='Fecha (Opcional)' 
                                    className={!nuevaActividad.fecha ? "input-actividad date-empty" : "input-actividad"}
                                    style={{flex:1}} 
                                    value={nuevaActividad.fecha} 
                                    onChange={e => setNuevaActividad({...nuevaActividad, fecha: e.target.value})} 
                                />
                            </div>
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                    <label className="container" style={{fontSize:'0.6em', display:'flex', alignItems:'center', gap:'5px'}}>
                                        <input type="checkbox" checked={!nuevaActividad.isPendiente} onChange={e => setNuevaActividad({...nuevaActividad, isPendiente: !e.target.checked})}/> 
                                            <span style={{fontSize: "1.5em", marginLeft:"5px", color:"#4f4949"}}>{nuevaActividad.isPendiente ? "Pendiente" : "Completada"}</span>
                                        <svg viewBox="0 0 64 64" height="2em" width="2em">
                                            <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className="path"></path>
                                        </svg>
                                </label>
                                <button type="submit" style={{background:'royalblue', color:'white', border:'none', padding:'5px 15px', borderRadius:'6px', cursor:'pointer'}}>+ Agregar</button>
                            </div>
                        </form>

                        {/* Lista REALIZADAS */}
                        <h4 style={{fontSize:'1.3rem', color:'#10b981', margin:'15px 0 5px 0', borderBottom:'1px solid #10b981'}}>Realizadas ({actividadesCompletadas.length})</h4>
                        {actividadesCompletadas.length > 0 ? (
                            <ul className="lista-actividades">
                                {actividadesCompletadas.map(act => (
                                    <li key={act.id} className="item-actividad">
                                        <div><span style={{display:'block', fontWeight:500, fontSize:"1.07em"}}>{act.descripcion}</span><small style={{color:'#94a3b8'}}>{fechaFormater(act.fecha)}</small></div>
                                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                            <strong style={{color:'#334155'}}>{formatearMoneda(act.gasto)}</strong>
                                            <FaEdit color="#35537c" style={{cursor:'pointer'}} onClick={() => abrirModalEditar(act)}/>
                                            <FaTrash color="#ef4444" style={{cursor:'pointer'}} onClick={() => borrarActividad(act.id)}/>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : <p style={{fontStyle:"italic", color:"#9d9d9d", fontSize:'0.8em'}}>No hay actividades realizadas.</p>}

                        {/* Lista PENDIENTES */}
                        <h4 style={{fontSize:'1.3rem', color:'#f59e0b', margin:'20px 0 5px 0', borderBottom:'1px solid #f59e0b'}}>Pendientes ({actividadesPendientes.length})</h4>
                        {actividadesPendientes.length > 0 ? (
                            <ul className="lista-actividades">
                                {actividadesPendientes.map(act => (
                                    <li key={act.id} className="item-actividad">
                                        <div>
                                            <span style={{display:'block', fontWeight:500, fontSize:"1.07em"}}>{act.descripcion}</span>
                                            <small style={{color:'#720000'}}>Pendiente - {fechaFormater(act.fecha)}</small>
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                            <strong style={{color:'#334155'}}>{formatearMoneda(act.gasto)}</strong>
                                            {/* Botón Editar */}
                                            <FaEdit color="#64748b" style={{cursor:'pointer'}} onClick={() => abrirModalEditar(act)}/>
                                            <FaTrash color="#ef4444" style={{cursor:'pointer'}} onClick={() => borrarActividad(act.id)}/>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : <p style={{fontStyle:"italic", color:"#9d9d9d", fontSize:'0.8em'}}>No hay actividades pendientes.</p>}
                    </div>
                </div>

                {/* COLUMNA 2 (DERECHA): PRECIOS + DOCUMENTACIÓN */}
                <div>
                    <div className="detalle-card">
                        <h3>Precios del Vehículo</h3>
                        <div className="info-row"><span className="label">Precio Compra:</span> <span className="valor">{formatearMoneda(vehiculo.precioCompra)}</span></div>
                        <div className="info-row"><span className="label">+ Gastos:</span> <span className="valor">{formatearMoneda(gastoTotalCalculado)}</span></div>
                        <hr style={{borderColor:'#f1f5f9'}}/>
                        <div className="info-row"><span className="label" style={{color:'#2c3e50'}}>Costo Total:</span> <span className="valor" style={{fontWeight:'bold'}}>{formatearMoneda(precioMinimoVenta)}</span></div>
                        <br />
                        <div className="info-row"><span className="label">Precio Lista:</span> <span className="valor" style={{fontSize: "1.2em"}}>{formatearMoneda(vehiculo.precioLista)}</span></div>
                        <div className="info-row" style={{background:"#f8fafc", padding:"5px", borderRadius:"5px", marginTop:"5px"}}>
                            <span className="label">Rentabilidad (%):</span>
                            <input type="number" value={rentabilidad} onChange={(e) => setRentabilidad(e.target.value)} className="input-pequeno"/>
                        </div>
                        <div className="precio-destacado">
                            <span style={{color:'#64748b', fontSize:'0.9rem'}}>Precio Sugerido:</span>
                            <span className="precio-grande">{formatearMoneda(precioContado.toFixed(2))}</span>
                        </div>
                        <div className="info-row" style={{background:"#f8fafc", padding:"5px", borderRadius:"5px"}}>
                            <span className="label">Descuento Contado (%):</span>
                            <input type="number" value={descuento} onChange={(e) => setDescuento(e.target.value)} className="input-pequeno"/>
                        </div>
                        <div className="info-row" style={{marginTop:'10px'}}>
                            <span className="label">Precio Final:</span>
                            <span className="valor" style={{color:'royalblue', fontSize:'1.2rem', fontWeight:'bold'}}>{formatearMoneda(precioDescuentoContado.toFixed(2))}</span>
                        </div>
                    </div>

                    <div className="detalle-card" style={{marginTop:'25px'}}>
                        <h3>Documentación</h3>
                        {verificarDocumentacion(vehiculo.documentacion) ? (
                            <div className="status-badge status-ok">✓ DOCUMENTACIÓN COMPLETA</div>
                        ) : (
                            <div>
                                <div className="status-badge status-error"> ⚠ INCOMPLETA </div> 
                                <ul className="lista-faltantes">
                                    {formularios.map(f => {
                                        if (!doc[f.key]) return <li key={f.key}>{f.label}</li>
                                        return null
                                    })}
                                </ul>
                            </div>
                        )}
                        <button onClick={() => navigate(`/vehiculos/${id}/documentacion`)} className="btn-editar-docs">Gestionar Documentación</button>
                    </div>
                </div>
            </div>

            {/* --- MODAL EDITAR ACTIVIDAD --- */}
            {actividadAEditar && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-titulo">Editar Actividad</h2>
                        
                        <form onSubmit={handleActualizarActividad} className="form-actividad" style={{background:'transparent', padding:0}}>
                            
                            <label style={{fontWeight:'bold', fontSize:'0.9em', color:'#161718'}}>Descripción:</label>
                            <input 
                                className="input-actividad" 
                                value={actividadAEditar.descripcion} 
                                onChange={e => setActividadAEditar({...actividadAEditar, descripcion: e.target.value})} 
                                style={{width:'100%', boxSizing:'border-box', marginBottom:'15px'}}
                            />

                            <div style={{display:'flex', gap:'10px', marginBottom:'15px'}}>
                                <div style={{flex:1}}>
                                    <label style={{fontWeight:'bold', fontSize:'0.9em', color:'#161718', display:'block'}}>Costo ($):</label>
                                    <input 
                                        type="number" 
                                        className="input-actividad" 
                                        style={{width:'100%', boxSizing:'border-box'}}
                                        value={actividadAEditar.gasto} 
                                        onChange={e => setActividadAEditar({...actividadAEditar, gasto: e.target.value})}
                                    />
                                </div>
                                <div style={{flex:1}}>
                                    <label style={{fontWeight:'bold', fontSize:'0.9em', color:'#161718', display:'block'}}>Fecha:</label>
                                    <input 
                                        type="date" 
                                        className="input-actividad" 
                                        style={{width:'100%', boxSizing:'border-box'}}
                                        value={actividadAEditar.fecha} 
                                        onChange={e => setActividadAEditar({...actividadAEditar, fecha: e.target.value})} 
                                    />
                                </div>
                            </div>

                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f8fafc', padding:'10px', borderRadius:'8px', border:'1px solid #e2e8f0'}}>
                                <span style={{fontWeight:'bold', color:'#334155'}}>Estado:</span>
                                <label className="container" style={{fontSize:'0.6em', display:'flex', alignItems:'center', gap:'5px', margin:0}}>
                                    <input 
                                        type="checkbox" 
                                        checked={!actividadAEditar.isPendiente} 
                                        onChange={e => setActividadAEditar({...actividadAEditar, isPendiente: !e.target.checked})}
                                    /> 
                                    <span style={{fontSize: "1.5em", marginLeft:"5px", color: "black", fontWeight:'500'}}>
                                        {actividadAEditar.isPendiente ? "Pendiente" : "Completada"}
                                    </span>
                                    <svg viewBox="0 0 64 64" height="2em" width="2em">
                                        <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className="path"></path>
                                    </svg>
                                </label>
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={() => setActividadAEditar(null)} className="btn-cancelar">Cancelar</button>
                                <button type="submit" className="btn-guardar">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export default VehiculoDetalle