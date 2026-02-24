import axios from 'axios'

const API_URL = 'http://localhost:8080/api/actividades'

class ActividadService {

    obtenerTodos(){
        return axios.get(API_URL)
    }

    obtenerPorId(id){
        return axios.get(`${API_URL}/${id}`)
    }

    guardar(actividad){
        return axios.post(API_URL, actividad)
    }

    borrar(id){
        return axios.delete(`${API_URL}/${id}`)
    }


}

export default new ActividadService()