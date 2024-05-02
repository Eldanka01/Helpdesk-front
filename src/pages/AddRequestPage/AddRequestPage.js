import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'; 
import logo from '../RequestsPage/almaulogo.svg'


function AddRequestPage() {
    const [auditoriumNumber, setAuditoriumNumber] = useState('');
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const [isAuthenticated] = useState(localStorage.getItem('token') !== null);

  
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!auditoriumNumber.trim() || !description.trim()) {
            setError('Пожалуйста, заполните все поля.');
            return;
          }

          setError('');

          console.log('Отправлено:', { auditoriumNumber, description });

        const userId = localStorage.getItem('userId');

        if (!userId) {
            console.error('Не найден userId в localStorage');
            return;
        }
      
        try {
          const response = await fetch('http://localhost:8000/api/helpdesk-requests/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Если используется токен для авторизации, добавьте его в заголовки
            },
            body: JSON.stringify({
              auditorium_number: auditoriumNumber,
              description: description,
              creator: userId, 
            }),
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log('Запись успешно создана:', data);
            setSuccess(true); 
            setTimeout(() => { navigate('/'); }, 3000);
          } else {
            const errorData = await response.json();
            setError('Ошибка при создании записи: ' + errorData.message); 
            setSuccess(false);
          }
        } catch (error) {
            setError('Ошибка при отправке запроса: ' + error.message); // Показать сообщение об ошибке
            setSuccess(false);
        }
        setAuditoriumNumber('');
        setDescription('');
      };
      return (
        <div>
          {isAuthenticated ? (
          <>
            <header className="header">
            </header>
           
            <div className="container mt-4">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <img src={logo} alt="AlmaU Logo" className="logo" />
                  <li className="breadcrumb-item"><Link to="/">Главная</Link></li>
                  <li class="breadcrumb-item active" aria-current="page">Добавить заявку</li>

                </ol>
              </nav>

              <h2>Добавление заявки</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">Заявка успешно создана!</div>} {/* Сообщение об успехе */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="auditoriumNumber" className="form-label">
                    Номер аудитории
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="auditoriumNumber"
                    value={auditoriumNumber}
                    onChange={(e) => setAuditoriumNumber(e.target.value)}
                    required // Добавление встроенной HTML-валидации
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Описание
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required // Добавление встроенной HTML-валидации
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Отправить
                </button>
              </form>
            </div>
            </>) : (
               <>
               <div className="d-flex justify-content-center align-items-center vh-100" >
                   <div>
                       <p>Вы не зарегистрированы. Пожалуйста, <Link to="/register">зарегистрируйтесь</Link>.</p>
                       <p>Или <Link to="/login">войдите</Link>, используя свой логин и пароль.</p>
                   </div>
                </div>
                </>
            )}
        </div>
      );
    };

export default AddRequestPage;
