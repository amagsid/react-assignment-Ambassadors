import { Switch, Route, Redirect } from "react-router-dom";
import { createUseStyles } from "react-jss";
//screens and component import
import ReadMe from "./screens/ReadMe";
import HomePage from "./screens/HomePage";
import Header from "./components/Header";
import "./styles/button.scss";
import "./styles/fonts.css";

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
    backgroundColor: theme.palette.primary,
    "& a": {
      color: theme.palette.text,
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

const App = (props) => {
  // css classes from JSS hook
  const classes = useStyles(props);

  return (
    <div className={classes.App}>
      <Header />

      <div className={classes.Container}>
        <div className={classes.Banner}>
          <p>
            Have you ever said something so dumb, you just wanted to slap
            yourself?
            <span>
              Well, <br /> now you can!
            </span>
          </p>

          <img
            alt="slap-gif"
            src="https://media4.giphy.com/media/Okk9cb1dvtMxq/giphy.gif?cid=790b76117add93ca63e9fdc8948df94a2fff99c10d87109c&rid=giphy.gif&ct=g"
            width="1000"
            height="500"
          />
        </div>
      </div>

      <Switch>
        {/** * Main app route */}
        <Route path="/" exact>
          <HomePage />
        </Route>
        {/** * Readme route */}
        <Route path="/readme">
          <ReadMe />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
