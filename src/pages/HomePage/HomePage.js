import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import './home-page.css'

const HomePage = () => {
  const username = localStorage.getItem("username");

  const { logout } = useAuth()

  const isHelpDeskUser = localStorage.getItem("isHelpDeskUser") === "true";

  const [isAuthenticated] = useState(localStorage.getItem("token") !== null);

  console.log(isHelpDeskUser);

  return (
    <div>
      {isAuthenticated ? (
        <>
          <header className="header"></header>

          <div className="container py-4">
            {isHelpDeskUser ? (
              <>

                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="form-container">
                      <p>Добро пожаловать, {username}!</p>
                      <Link to="/auditorium-list">QR Аудиторий</Link>


                      <div className="d-grid gap-2">
                        <div className="d-grid gap-2"></div>
                        <button
                          className="btn btn-primary mb-3"
                          onClick={logout}
                        >
                          Выйти
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="form-container">
                      <p>Добро пожаловать, {username}!</p>

                      <div>Для доступа к функционалу HelpDesk получите права у Администратора</div>

                      <div className="d-grid gap-2">
                        <div className="d-grid gap-2"></div>

                        <button
                          className="btn btn-primary mb-3"
                          onClick={logout}
                        >
                          Выйти
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="home-welcome-section">
            <div>
              <p>
                Вы не зарегистрированы. Пожалуйста,{" "}
                <Link to="/register">зарегистрируйтесь</Link>.
              </p>
              <p>
                Или <Link to="/login">войдите</Link>, используя свой логин и
                пароль.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
