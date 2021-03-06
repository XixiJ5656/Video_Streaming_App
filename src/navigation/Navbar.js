import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import BeforeAuth from "./BeforeAuth";
import AfterAuth from "./AfterAuth";
import logo from "../logo.svg";

const Navbar = (props) => {
  const [navBackground, setNavBackground] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 120) {
        setNavBackground(true);
      } else setNavBackground(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  });
  const Navlinks = props.auth.uid ? <AfterAuth /> : <BeforeAuth />;
  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: navBackground ? "black" : "transparent",
        transition: "100ms ease",
      }}
    >
      <Link to={props.auth.uid ? "/homepage" : "/"} className="logo">
        <img src={logo} height="40vmin" alt="logo" />
      </Link>
      {Navlinks}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
export default connect(mapStateToProps)(Navbar);
