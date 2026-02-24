import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    // Nuevo estado para rastrear qué campo tiene el foco
    const [focusedField, setFocusedField] = useState(null); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/auth/login', credentials);
            const token = res.data.token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            navigate('/'); 
        } catch (error) {
            alert('Credenciales incorrectas o error de servidor.', error);
        }
    };

    const styles = {
        container: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f4f4f4'
        },
        card: {
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center'
        },
        input: (name) => ({ // Convertido a función para aplicar focus dinámico
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '5px',
            boxSizing: 'border-box',
            backgroundColor: "white",
            outline: 'none',
            color:"black",
            // Si el campo es el enfocado, cambia el borde y añade sombra
            border: focusedField === name ? '1px solid royalblue' : '1px solid #ddd',
            transition: 'all 0.2s ease'
        }),
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#565580',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={{marginBottom: '20px', color: '#333'}}>Acceso</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Usuario" 
                        value={credentials.username}
                        onChange={handleChange}
                        // Eventos para detectar el foco
                        onFocus={() => setFocusedField('username')}
                        onBlur={() => setFocusedField(null)}
                        style={styles.input('username')} 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Contraseña" 
                        value={credentials.password}
                        onChange={handleChange}
                        // Eventos para detectar el foco
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        style={styles.input('password')} 
                    />
                    <button type="submit" style={styles.button}>Ingresar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
