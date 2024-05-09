import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import './RequestsPage.css';

const RequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [isAuthenticated] = useState(localStorage.getItem('token') !== null);

    const navigate = useNavigate();

    const loadDataFromServer = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/helpdesk-requests/');
            setRequests(res.data);
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
                (request.auditorium_number && request.auditorium_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (request.creator && request.creator.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (request.handler && request.handler.toLowerCase().includes(searchTerm.toLowerCase())) ||
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
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const day = date.getDate();
        const month = date.getMonth() + 1;
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
                                <th scope="col">Аудитория</th>
                                <th scope="col">Преподаватель/Сотрудник</th>
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
                                    <td>{request.auditorium_number}</td>
                                    <td>{request.creator}</td>
                                    <td>{request.description}</td>
                                    <td>{request.handler}</td>
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
