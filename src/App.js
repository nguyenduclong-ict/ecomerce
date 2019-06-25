import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from "./Pages/Login";
import AdminIndex from "./Pages/Admin/Index";
import ProviderIndex from "./Pages/Provider/Index";
import PrivateRoute from "./components/PrivateRoute";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <PrivateRoute path={"/admin*"} component={AdminIndex} role="admin" />
            <PrivateRoute path={"/provider*"} component={ProviderIndex} role="provider" />
            <Redirect from="/" to="/login" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
