import axios from 'axios';

const API_URL = "http://localhost:8080/api/titulares"

class TitularService {

    obtenerTodos() {
        return axios.get(`${API_URL}`)
    }

    obtenerPorId(id) {
        return axios.get(`${API_URL}/${id}`)
    }

    guardar(titular) {
        return axios.post(`${API_URL}`, titular)
    }

    actualizar(titular){
        return axios.post(API_URL, titular)
    }

    borrar(id) {
        return axios.delete(`${API_URL}/${id}`)
    }

}

export default new TitularService();