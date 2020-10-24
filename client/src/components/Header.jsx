import React from "react";
import Navigation from "./nav/Nav";

function Header() {
  /*TODO: Add Team Logo, Add sticky footer, Add Team pics to Team page, maybe make nav bar better looking?*/
  /*TODO: Center social media icons*/
  return (
    <header>
      {/*<span className="font-bold">*/}
      {/*    Clueless Game*/}
      {/*</span>*/}
      <Navigation />
    </header>
  );
}

export default Header;
