import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useStatus } from "../../ContextProvider/contextprovider";
import "./Header.css";
import Anmeldungpersonaliser from "../../signinup/inputPersonaliser/anmeldungpersonalise";


function Header({backgroundcolor,props}) {
  const { handlerClic } = useStatus();
  const [changestatus, setChangestatus] = useState(false);
  const [value, setValue] = useState("anmelden");
  let changelayout;
  const handleClic = function () {
    setChangestatus(s => !s);
    setValue(newvalue);
    handlerClic(changestatus);
    const newvalue = changestatus === true ? "abmelden" : "anmelden";
    props.onAction(changestatus);
  };

  return (
    <div>

      <nav className="navbar" style={{backgroundColor:backgroundcolor}}>
        <NavLink to="/HomePage" className="nav-link">
          Home
        </NavLink>

        {" | "}
        <NavLink to="/registrierung" className="nav-link">
          registrierung
        </NavLink>
        {" | "}

        <NavLink
          to="/Transactionspage"
          className="nav-link"
          onClick={() => handleClic()}
        >
          {value}
        </NavLink>
        {" | "}
        <button className="navbar-button" onClick={() => handleClic()}>
          {value}
        </button>
      </nav>
    </div>
  );
}

export default Header;
