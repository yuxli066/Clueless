import React from "react";
import "./components.css";
import {Link} from "react-router-dom";
import { Icon, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

function Header() {
  /*TODO: Add Team Logo, Add sticky footer, Add Team pics to Team page, maybe make nav bar better looking?*/
  /*TODO: Center social media icons*/

  return (
      <header id="header">
          <div className="d-flex flex-column">
              <div className="Logo">
                  <img src={require("../images/logo.png")} alt="Logo" className="img-fluid rounded-circle"/>
                      <h1 className="text-light">Clue-Less</h1>
              </div>
              <nav className="nav-menu">
                  <ul>
                      <li><Icon icon={IconNames.HOME} iconSize={50} intent={Intent.PRIMARY} /><Link to="/"> Home </Link></li>
                      <li><Icon icon={IconNames.PLAY} iconSize={50} intent={Intent.PRIMARY} /><Link to="/game"> Game </Link></li>
                      <li><Icon icon={IconNames.PEOPLE} iconSize={50} intent={Intent.PRIMARY} /><Link to="/team"> Team </Link></li>
                      <li><Icon icon={IconNames.INFO_SIGN} iconSize={50} intent={Intent.PRIMARY} /><Link to="/about"> About </Link></li>
                  </ul>
              </nav>
              <button type="button" className="mobile-nav-toggle d-xl-none"><Icon icon={IconNames.MENU} iconSize={Icon.SIZE_LARGE} intent={Intent.PRIMARY} /></button>
          </div>
      </header>
  );
}

export default Header;
