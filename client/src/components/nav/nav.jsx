import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";
import NavigationMenuItems from "./navMenuItems";

function Navigation() {
  // eslint-disable-next-line
  const [showMenu, setShowMenu] = useState(false);

  // menu and menu mask transitions
  const maskTransitions = useTransition(showMenu, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const menuTransitions = useTransition(showMenu, null, {
    from: { opacity: 0, transform: "translateY(-100%)" },
    enter: { opacity: 1, transform: "translateY(0%)" },
    leave: { opacity: 0, transform: "translateY(-100%)" },
  });
  // className=""
  let menuMask = maskTransitions.map(
      ({ item, key, props }) =>
        item && (
          <animated
            key={key}
            style={props}
            className=""
            onClick={() => setShowMenu(false)}
          />
        )
    ),
    menu = menuTransitions.map(
      ({ item, key, props }) =>
        item && (
          <animated.div key={key} style={props}>
            <NavigationMenuItems closeMenu={() => setShowMenu(false)} />
          </animated.div>
        )
    );

  return (
    <div className="">
      <div className="">
        <div className="">
          <img alt="" className="" src={require("../../images/logo.png")}/>
          LOGO
        </div>
      </div>
      <div className="">
        {/*add logo here*/}
        <NavigationMenuItems />
      </div>
      {/*mobile view only*/}
      <FontAwesomeIcon
        className=""
        icon={faBars}
        id="menu-toggle"
        onClick={() => setShowMenu(!showMenu)}
      />
      {menuMask}
      {menu}
    </div>
  );
}

export default Navigation;
