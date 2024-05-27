import React from "react";
import logo from "../../images/IMG_4994.JPG";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./header.css";

function Header() {
    const { isAuthenticated } = useAuth();
  
  return (
    <div className="header-wrapper">
      <div className="container header-container">
        <nav aria-label="breadcrumb">
          <Link to="/" className="header-logo">
            <img src={logo} alt="Airlines Logo" className="logo" width={70} />
            <span className="header-name">HelpDesk for airlines</span>
          </Link>

          {isAuthenticated ? (
            <>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/requests">Все заявки</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/newrequests">Новые заявки</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/my-requests">Мои заявки</Link>
                </li>
              </ol>
            </>
          ) : (
            <></>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Header;
