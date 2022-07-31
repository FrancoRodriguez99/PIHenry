import LandingPage from "./components/LandingPage/LandingPage";
import Principal from "./components/Principal/Principal";
import ActivityCreate from "./components/ActivityCreate/ActivityCreate";
import Details from "./components/Details/Details";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/Principal/:page">
          <Principal />
        </Route>
        <Route exact path="/Details/:id">
          <Details />
        </Route>
        <Route exact path="/ActivityCreate">
          <ActivityCreate />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
