import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const NewRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [isAuthenticated] = useState(localStorage.getItem('token') !== null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/helpdesk-requests/`);
                const sortedData = res.data.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at); 
                });
                setRequests(sortedData);
            } catch (err) {
                console.error(err.response.data);
            }
        };

        fetchData();
    }, []); 

    const handleAcceptRequest = async (id) => {
        const helpdeskUsername = localStorage.getItem('helpdeskUsername');
        const userId = localStorage.getItem('userId');

        try {
            const res = await axios.patch(`${apiUrl}/api/helpdesk-requests/${id}/`, { 
                status: 'IN_PROCESS',
                handler: userId,
             });

            setRequests(requests.map(request => (request.id === id ? { ...request, status: 'IN_PROCESS', handler: helpdeskUsername, handler_username: helpdeskUsername } : request)));
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}.${month}.${year}`;
    };  


    return (
        <div>
            {isAuthenticated ? (
            <>
            <header className="header">
            </header>

            <div className='container py-4'>

                <h2 className="mb-4">Новые заявки</h2>

                
                
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">Терминал</th>
                                <th scope="col">Пользователь</th>
                                <th scope="col">Номер телефона</th>
                                <th scope="col">Описание</th>
                                <th scope="col">Создана</th>
                                <th scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length > 0 && requests.some(request => request.status === 'NEW') ? (
                                requests.map((request, index) => (
                                    request.status === 'NEW' && (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{request.auditorium_number_display}</td>
                                            <td>{request.creator}</td>
                                            <td>{request.phone_number ? request.phone_number : "-"}</td>
                                            <td>{request.description}</td>
                                            <td>{formatDate(request.created_at)}</td>
                                            <td>
                                                <button onClick={() => handleAcceptRequest(request.id)} className="btn btn-success">Принять</button>
                                            </td>
                                        </tr>
                                    )
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">Новых заявок нет</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
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


export default NewRequestsPage;
