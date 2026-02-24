import axios from 'axios'

const API_URL = "http://localhost:8080/api/documentaciones"

class DocumentacionService{

    obtenerTodos(){
        return axios.get(API_URL)
    }

    obtenerPorId(id){
        return axios.get(`${API_URL}/${id}`)
    }

    guardar(documentacion){
        return axios.post(API_URL, documentacion)
    }

    actualizar(documentacion){
        return axios.put(API_URL, documentacion)
    }

    borrar(id){
        return axios.delete(`${API_URL}/${id}`)
    }

}

export default new DocumentacionService()
