import LandingPage from "./components/LandingPage/LandingPage";
import Principal from "./components/Principal/Principal";
import ActivityCreate from "./components/ActivityCreate/ActivityCreate";
import Details from "./components/Details/Details";
import NavBar from "./components/NavBar/NavBar";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Error404 from "./components/Error404/Error404";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
      </Switch>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/Principal/:page">
          <Principal />
        </Route>
        <Route exact path="/Details/:id">
          <Details />
        </Route>
        <Route exact path="/ActivityCreate">
          <ActivityCreate />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
