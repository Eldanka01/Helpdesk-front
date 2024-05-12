import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const helpdeskUserIdFromStorage = localStorage.getItem("userId");
  const [isAuthenticated] = useState(localStorage.getItem("token") !== null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/helpdesk-requests/`);
        setRequests(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchData();
  }, []);

  const handleAcceptRequest = async (id) => {
    try {
      const res = await axios.patch(`${apiUrl}/api/helpdesk-requests/${id}/`, {
        status: "CLOSED",
      });

      setRequests(
        requests.map((request) =>
          request.id === id ? { ...request, status: "CLOSED" } : request
        )
      );
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
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
          <header className="header"></header>

          <div className="container py-4">
            <h2 className="mb-4">Мои Заявки</h2>

            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="bg-primary text-white">
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Аудитория</th>
                    <th scope="col">Преподаватель/Сотрудник</th>
                    <th scope="col">HelpDesk сотрудник</th>
                    <th scope="col">Создана</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.filter(
                    (request) =>
                      request.status === "IN_PROCESS" &&
                      request.handler == helpdeskUserIdFromStorage
                  ).length > 0 ? (
                    requests
                      .filter(
                        (request) =>
                          request.status === "IN_PROCESS" &&
                          request.handler == helpdeskUserIdFromStorage
                      )
                      .map((request, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{request.auditorium_number}</td>
                          <td>{request.creator}</td>
                          <td>{request.handler}</td>
                          <td>{formatDate(request.created_at)}</td>
                          <td>
                            <button
                              onClick={() => handleAcceptRequest(request.id)}
                              className="btn btn-success"
                            >
                              Закрыть
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Заявок в процессе обработки нет или они не назначены на
                        вас
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center align-items-center vh-100">
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

export default MyRequestsPage;
