import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const res = await axios.post('http://localhost:8000/api/login/', { username, password });
            
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', res.data.userId); 
            localStorage.setItem('isHelpDeskUser', res.data.helpdeskUser);
            console.log(res.data)
            localStorage.setItem('helpdeskUsername', res.data.helpdeskUsername);
    
            setUsername('');
            setPassword('');
            navigate('/'); 
    
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || "Произошла ошибка при входе в систему.");
            } else {
                setError("Сетевая ошибка. Попробуйте еще раз.");
            }
            console.error('Ошибка при входе:', err.response || err);
        }
    };

    return (
        <div className="form-container"> 
            <h2 className='form-h2'>Вход</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Логин:</label>
                    <input type="text" name="username" value={username} onChange={handleChange} className="form-control" />
                </div>

                <div className="form-group"> 
                    <label>Пароль:</label>
                    <input type="password" name="password" value={password} onChange={handleChange} className="form-control" />
                </div>

                <div className='buttonbox'>
                    <div className='btn-box'>
                        <button type="submit" className="btn">Войти</button> 
                    </div>

                    <p ><Link to="/register">У вас нет аккаунта?</Link></p>
                </div>
                
            </form>
        </div>
    );
}

export default LoginForm;