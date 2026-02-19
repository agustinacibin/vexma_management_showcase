import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Interceptor para manejar errores 403/401 (token expirado)
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
