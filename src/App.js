import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Login from "./Pages/Login";
import Index from "./Pages/Admin/Index";
import PrivateRoute from "./components/PrivateRoute";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoute path="/admin/:page/:p2/:p3" component={Index} role="admin"/>
            <PrivateRoute path="/admin/:page/:p2" component={Index} role="admin"/>
            <PrivateRoute path="/admin/:page" component={Index} role="admin"/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
