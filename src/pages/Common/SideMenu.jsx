import React from "react";
import {
    Routes,
    Route,
    Link,
    useRoutes,
    NavLink,
    useLocation,
    useNavigate,
  } from "react-router-dom";
export default function SideMenu() {
  return (
    <div className="sideMenu  bg-body">
      <nav className="nav flex-column pt-5 ">
        <NavLink className="nav-link" to="/home">
          Existing Client Users <i className="fa-regular fa-user"></i>
        </NavLink>
        <NavLink className="nav-link" to="/create">
          Create New Users <i className="fa-regular fa-pen-to-square"></i>
        </NavLink>
      </nav>
    </div>
  );
}
