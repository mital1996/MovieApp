import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <NavLink to="/" className={classes.navLink}>
        <h1>Movies App</h1>
      </NavLink>
      <NavLink to="/favourite" className={classes.navLink}>
        <h2 style={{ marginLeft: "2rem", marginTop: "1rem" }}>Favourites</h2>
      </NavLink>
    </nav>
  );
};

export default Navbar;
