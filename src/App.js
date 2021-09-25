import { Link, Switch, Route, Redirect } from "react-router-dom";
import { createUseStyles } from "react-jss";
//screens import
import ReadMe from "./screens/ReadMe";
import HomePage from "./screens/HomePage";
import "./fonts.css";

const useStyles = createUseStyles((theme) => ({
  "@global body": {
    background: theme.palette.primary,
    color: theme.palette.text,
    boxSizing: "border-box",
    fontFamily: "Roboto",
    width: "100vw",
    margin: "80px 0 0 0",
  },

  App: {
    maxWidth: "100%",
    minHeight: "600px",
    margin: "auto",
    "& a": {
      color: theme.palette.text,
    },
  },

  Header: {
    display: "flex",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    textAlign: "center",
    backgroundColor: "white",
    color: "black",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 140px 0 140px",
    height: "80px",
    boxShadow: "0 0 10px 0px black",
    "&  h1": {
      fontFamily: "Audiowide",
      cursor: "pointer",
      fontSize: "2.5rem",
    },
    "&  ul": {
      listStyleType: "none",
      margin: "0",
      padding: "0",
      right: "0",
    },
    "&  li": {
      display: "inline",
      padding: "14px 16px",
      display: "inline",
      height: "80px",
      padding: "30px 16px 30px 16px",
      "&:hover": {
        backgroundColor: theme.palette.hoverColor,
      },
      "& a": {
        textDecoration: "none",
        color: "black",
        borderBottom: "4px solid #AC0C44",
        textDecoration: "underline #AC0C44",
      },
    },
  },
  Container: {
    width: "80%",
    margin: "0 auto",
    textAlign: "center",
  },

  Banner: {
    // backgroundColor: "pink",
    display: "flex",
    flexDirection: "row",
    "& p": {
      fontSize: "3.25rem",
      textAlign: "left",
      margin: "0",
      fontWeight: "300",
      lineHeight: "1.3",
    },
    "& span": {
      fontWeight: "700",
    },
  },
}));

function App(props) {
  // css classes from JSS hook
  const classes = useStyles(props);

  return (
    <div className={classes.App}>
      <header className={classes.Header} id="myHeader">
        <h1>SlapSticker</h1>
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

      <div className={classes.Container}>
        <div className={classes.Banner}>
          <p>
            Have you ever said something so dumb, you just wanted to slap
            yourself?{" "}
            <span>
              {" "}
              Well, <br /> now you can!{" "}
            </span>
          </p>

          <img
            src="https://media4.giphy.com/media/Okk9cb1dvtMxq/giphy.gif?cid=790b76117add93ca63e9fdc8948df94a2fff99c10d87109c&rid=giphy.gif&ct=g"
            width="1000"
            height="500"
          />
        </div>
      </div>

      <Switch>
        /** * Main app route */
        <Route path="/" exact>
          <HomePage />
        </Route>
        /** * Readme route */
        <Route path="/readme">
          <ReadMe />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
