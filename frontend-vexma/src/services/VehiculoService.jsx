import axios from 'axios'

const API_URL = 'http://localhost:8080/api/vehiculos'

class VehiculoService {
    obtenerTodos(){
        return axios.get(API_URL);
    }

    obtenerPorId(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    guardar(vehiculo) {
        return axios.post(API_URL, vehiculo);
    }

    borrar(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    actualizar(vehiculo){
        return axios.put(API_URL, vehiculo)
    }

    vender(id, fecha){
        let url = `${API_URL}/${id}/vender`;

        if(fecha){
            url += `?fecha=${fecha}`;
        }

        return axios.patch(url)
    }

    reingresar(id, fecha) {
        let url = `${API_URL}/${id}/reingresar`;

        if(fecha){
            url += `?fecha=${fecha}`;
        }

        return axios.patch(url);
    }
}

export default new VehiculoService();