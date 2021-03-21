import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { createContext, useContext, useState } from "react";
import Location from "./components/Location/Location";
import RiderPrice from "./components/RiderPrice/RiderPrice";
import Login from "./components/Login/Login";
import NoMatch from "./NoMatch/NoMatch";

export const RiderCategory = createContext();
export const UserContext = createContext();
export const LocationContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [rider, setRider] = useState({
    name: "",
    email: "",
    capacity: "",
  });
  const [location, setLocation] = useState({
    from: "",
    to: "",
  });
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <RiderCategory.Provider value={[rider, setRider]}>
        <LocationContext.Provider value={[location, setLocation]}>
          <Router>
            <Header></Header>
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <PrivateRoute path="/location">
                <Location></Location>
              </PrivateRoute>
              <Route path="/login">
                <Login></Login>
              </Route>

              <Route path="/rider/:riderName">
                <RiderPrice></RiderPrice>
              </Route>
              <Router path="*">
                <NoMatch></NoMatch>
              </Router>
            </Switch>
          </Router>
        </LocationContext.Provider>
      </RiderCategory.Provider>
    </UserContext.Provider>
  );
}
function PrivateRoute({ children, ...rest }) {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export default App;
