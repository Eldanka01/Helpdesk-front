    import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';

    import logo from '../RequestsPage/almaulogo.svg'

    const HomePage = () => {
        const username = localStorage.getItem('username');

        const isHelpDeskUser = localStorage.getItem('isHelpDeskUser') === 'true';

        const [isAuthenticated] = useState(localStorage.getItem('token') !== null);
        const navigate = useNavigate();

        const exitAcc = () => {
            localStorage.clear();
            navigate('/login');
        };
        console.log(isHelpDeskUser) 

        return (
            <div>
                {isAuthenticated ? (
                <>
                <header className="header">
                </header>

                <div className="container py-4">
                    {isHelpDeskUser? (
                    <>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <img src={logo} alt="AlmaU Logo" className="logo" />
                            <li className="breadcrumb-item active" aria-current="page">Главная</li>
                            <li class="breadcrumb-item"><Link to="/requests">Все заявки</Link></li>
                            <li class="breadcrumb-item"><Link to="/newrequests">Новые заявки</Link></li>
                            <li class="breadcrumb-item"><Link to="/my-requests">Мои заявки</Link></li>
                            
                        </ol>
                    </nav>
                    
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="form-container"> 
                               
                                <p>Добро пожаловать, {username}!</p>

                                <div className="d-grid gap-2">
                                    <div className="d-grid gap-2">
                                    </div>

                                    <button className="btn btn-primary mb-3" onClick={exitAcc}>Выйти</button>
                                </div>
    
                            </div>
                        </div>
                    </div>
                    </> ) : (
                        <>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <img src={logo} alt="AlmaU Logo" className="logo" />
                                <li className="breadcrumb-item active" aria-current="page">Главная</li>
                                <li class="breadcrumb-item"><Link to="/add-request">Добавить заявку</Link></li>

                            </ol>
                        </nav>
                        <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="form-container"> 
                               
                                <p>Добро пожаловать, {username}!</p>

                                <div className="d-grid gap-2">
                                    <div className="d-grid gap-2">
                                    </div>

                                    <button className="btn btn-primary mb-3" onClick={exitAcc}>Выйти</button>
                                </div>
    
                            </div>
                        </div>
                    </div>

                        </>
                    )}
 
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

    export default HomePage;
