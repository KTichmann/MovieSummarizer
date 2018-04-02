import React from "react";
import {NavLink} from "react-router-dom"

const Header = (props) => (
  <div id="header">
    <NavLink activeClassName="active" className="header_link" to="/" exact={true}>Home</NavLink>
    <NavLink activeClassName="active" className="header_link" to="/about">About</NavLink>
  </div>
)

export default Header;
