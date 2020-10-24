import React from "react";
import "./components.css";
import {Link} from "react-router-dom";

function Header() {
  /*TODO: Add Team Logo, Add sticky footer, Add Team pics to Team page, maybe make nav bar better looking?*/
  /*TODO: Center social media icons*/

  return (
      <header id="header">
          <div className="d-flex flex-column">
              <div className="profile">
                  <img src={require("../images/logo.png")} alt="Logo" className="img-fluid rounded-circle"/>
                      <h1 className="text-light">Clue-Less</h1>
              </div>
              <nav className="nav-menu">
                  <ul>
                      <li><Link to="/"> Home </Link></li>
                      <li><Link to="/game"> Game </Link></li>
                      <li><Link to="/team"> Team </Link></li>
                      <li><Link to="/about"> About </Link></li>
                  </ul>
              </nav>
              <button type="button" className="mobile-nav-toggle d-xl-none"><i className="icofont-navigation-menu"></i></button>
          </div>
      </header>
  );
}

export default Header;
