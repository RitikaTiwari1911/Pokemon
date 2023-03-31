import React from "react";
import {NavLink } from "react-router-dom";
import "../styles/Common/navbar.css"

export const Navbar = () => {
  return (
    <nav className="navbar-main-component">
      <ul className="navbar">
        <li className="navbar-items">
          <NavLink exact to="/" >
            Pagination
          </NavLink>
        </li>

        <li className="navbar-items">
          <NavLink to="/lazy-loading" >
            Lazy Loading
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
