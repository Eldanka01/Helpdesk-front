import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import './RequestsPage.css';

const apiUrl = process.env.REACT_APP_API_URL;

const RequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [isAuthenticated] = useState(localStorage.getItem('token') !== null);

    const navigate = useNavigate();

    const loadDataFromServer = async () => {
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

    useEffect(() => {
        loadDataFromServer();
        const interval = setInterval(loadDataFromServer, 5000); 
        return () => clearInterval(interval); 
    }, []);

    const filteredRequests = requests.filter(request => {
        return (
            (!statusFilter || request.status.toLowerCase() === statusFilter.toLowerCase()) &&
            (!searchTerm || 
                (request.auditorium_number_display && request.auditorium_number_display.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                (request.creator && request.creator.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (request.handler_username && request.handler_username.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (request.status && request.status.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        );
    });

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleRowClick = (id) => {
        navigate(`/requests/${id}`);
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

                <h2 className="mb-4">Заявки</h2>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Поиск..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <select className="form-select" onChange={handleStatusFilterChange}>
                            <option value="">Все статусы</option>
                            <option value="NEW">Новый</option>
                            <option value="IN_PROCESS">В процессе</option>
                            <option value="CLOSED">Закрыт</option>
                        </select>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">Терминал</th>
                                <th scope="col">Пользователь</th>
                                <th scope="col">Номер телефона</th>
                                <th scope="col">Описание</th>
                                <th scope="col">HelpDesk сотрудник</th>
                                <th scope="col">Создана</th>
                                <th scope="col">Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.map((request, index) => (
                                <tr key={index} onClick={() => handleRowClick(request.id)}>
                                    <td>{index + 1}</td>
                                    <td>{request.auditorium_number_display}</td>
                                    <td>{request.creator}</td>
                                    <td>{request.phone_number ? request.phone_number : "-"}</td>
                                    <td>{request.description}</td>
                                    <td>{request.handler_username}</td>
                                    <td>{formatDate(request.created_at)}</td>
                                    <td>{request.status === 'NEW' ? 'Новый' : 
                                        request.status === 'IN_PROCESS' ? 'В процессе' : 
                                        request.status === 'CLOSED' ? 'Закрыт' : 'CLOSED'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </> ) : (
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

export default RequestsPage;
