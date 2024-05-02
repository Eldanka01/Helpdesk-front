import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import RequestsPage from './pages/RequestsPage/RequestsPage';
import AddRequestPage from './pages/AddRequestPage/AddRequestPage';
import NewRequestsPage from './pages/NewRequestPage/NewRequestPage';

import MyRequestsPage from './pages/MyRequestsPage/MyRequestsPage';

import RequestDetailsPage from './pages/RequestDetailsPage/RequestDetailsPage';

const ProtectedRoute = ({ children }) => {
  const isHelpDeskUser = localStorage.getItem('isHelpDeskUser') === 'true';
  return isHelpDeskUser ? <Navigate to="/" replace /> : children;
};

const ProtectedRoute1 = ({ children }) => {
  const isHelpDeskUser = localStorage.getItem('isHelpDeskUser') === 'false';
  return isHelpDeskUser ? <Navigate to="/" replace /> : children;
};



const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/" element={<HomePage />} />

          <Route path="/requests" element={<ProtectedRoute1><RequestsPage/></ProtectedRoute1>} />
          <Route path="/requests/:id" element={<ProtectedRoute1><RequestDetailsPage /></ProtectedRoute1>} />
          <Route path="/newrequests" element={<ProtectedRoute1><NewRequestsPage/></ProtectedRoute1>} />
          <Route path="/my-requests" element={<ProtectedRoute1><MyRequestsPage/></ProtectedRoute1>} />
          
          <Route path="/add-request" element={
            <ProtectedRoute>
              <AddRequestPage/>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
