import React from "react";

import { Link } from "react-router-dom";

import logo from "../Icon/Logo.png";
import logout from "../Icon/Logout.png";

import "../Stylesheets/NavBar.css";

var NavBar = () => {
  


  return (
      <div className="brand">
        <div id="brand">
          <img src={logo} alt="Logo"></img>
          <p>Insight Sphere</p>
        </div>
        <nav className="Navbar">
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/KanbanBoard">Kanban Board</Link>
          </li>
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
        </nav>
        <div className="Logout">
          <img src={logout} alt="Logo"></img>
          <Link to="/"><p onClick={()=>{localStorage.clear()}}>Logout</p></Link>
          
        </div>
      </div>
  );
};
export default NavBar;
