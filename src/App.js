import React from "react";
import "./App.css";
import Header from "./layouts/Header/Header";
import Sidebar from "./layouts/Sidebar/Sidebar";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Login from "./Pages/Login";
import Index from "./Pages/Admin/Index";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/admin/:page/:p2" component={Index} ></Route>
            <Route path="/admin/:page" component={Index} ></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
