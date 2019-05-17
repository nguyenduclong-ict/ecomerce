import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Login from "./Pages/Login";
import Index from "./Pages/Admin/Index";
import PrivateRoute from "./components/PrivateRoute";
import createBrowserHistory from 'history/createBrowserHistory'
export const history = createBrowserHistory();

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
            <PrivateRoute  history={this.props.history} path="/admin/:page/:p2/:p3" component={Index} role="admin"/>
            <PrivateRoute history={this.props.history} path="/admin/:page/:p2" component={Index} role="admin"/>
            <PrivateRoute history={this.props.history} path="/admin/:page" component={Index} role="admin"/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
