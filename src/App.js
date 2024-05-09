import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import RequestsPage from "./pages/RequestsPage/RequestsPage";
import AddRequestPage from "./pages/AddRequestPage/AddRequestPage";
import NewRequestsPage from "./pages/NewRequestPage/NewRequestPage";

import MyRequestsPage from "./pages/MyRequestsPage/MyRequestsPage";

import RequestDetailsPage from "./pages/RequestDetailsPage/RequestDetailsPage";
import AuditoriumListPage from "./pages/AuditoriumListPage/AuditoriumListPage";
import Header from "./components/Header/Header";

import { AuthProvider } from "./contexts/AuthContext";

import './app.css'

const ProtectedRoute = ({ children }) => {
  const isHelpDeskUser = localStorage.getItem("isHelpDeskUser") === "true";
  return isHelpDeskUser ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Router>
      <div>
        <AuthProvider>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/" element={<HomePage />} />

              <Route
                path="/requests"
                element={
                  <ProtectedRoute>
                    <RequestsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/requests/:id"
                element={
                  <ProtectedRoute>
                    <RequestDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/newrequests"
                element={
                  <ProtectedRoute>
                    <NewRequestsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-requests"
                element={
                  <ProtectedRoute>
                    <MyRequestsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/auditorium-list"
                element={
                  <ProtectedRoute>
                    <AuditoriumListPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/add-request" element={<AddRequestPage />} />
            </Routes>
          </div>
        </AuthProvider>
      </div>
    </Router>
  );
};

export default App;
