import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import HeaderIcon from "../assets/slap-header-icon.png";

const useStyles = createUseStyles((theme) => ({
  Header: {
    zIndex: "10",
    display: "flex",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    textAlign: "center",
    backgroundColor: "white",
    color: theme.palette.text,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 140px 0 140px",
    height: "80px",
    boxShadow: "0 0 10px 0px black",
    "&  h1": {
      fontFamily: "Audiowide",
      cursor: "pointer",
      fontSize: "2.5rem",
      "@media screen and (max-width: 600px)": {
        padding: "10px 10px 10px 10px",
      },
      "@media screen and (max-width: 1000px)": {
        fontSize: "2rem",
      },
    },
    "&  ul": {
      listStyleType: "none",
      margin: "0",
      padding: "0",
      right: "0",
    },
    "&  li": {
      display: "inline",
      height: "80px",
      padding: "30px 16px 30px 16px",
      "&:hover": {
        backgroundColor: theme.palette.hoverColor,
        fontWeight: "500",
      },
      "& a": {
        textDecoration: "none",
        color: theme.palette.text,
        "&:hover": {
          color: "white",
        },
      },
    },
  },
  HeaderLogo: {
    display: "flex",
    alignItems: "center",
  },
}));

const Header = (props) => {
  // css classes from JSS hook
  const classes = useStyles(props);
  return (
    <header className={classes.Header} id="myHeader">
      <div className={classes.HeaderLogo}>
        <h1>SlapSticker</h1>{" "}
        <img
          style={{ height: "40px" }}
          alt="header-slap-icon"
          src={HeaderIcon}
        />
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/readme">Readme</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
