import React from 'react'
import {
  Routes,
  Route,
  Link,
  useRoutes,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
export default function Header() {

  const history = useNavigate();

const handleLogout = e => {
    localStorage.clear();
    history('/')
}
  
  return (
    <div className="row">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="/home">
                CRM
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav"></div>
              </div>
              <form className="d-flex">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                  <i
                    className="fa-solid fa-right-from-bracket mx-1"
                    style={{ fontSize: "15px" }}
                  ></i>
                </button>
              </form>
            </div>
          </nav>
        </div>
  )
}
