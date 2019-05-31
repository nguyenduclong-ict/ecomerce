import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Login from "./Pages/Login";
import AdminIndex from "./Pages/Admin/Index";
import ProviderIndex from './Pages/Provider/Index'
import CustomerIndex from "./Pages/Customer/Index";
import PrivateRoute from "./components/PrivateRoute";
import GeneralIndex from './Pages/General/Index'
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
            <PrivateRoute path={"/admin*"}  component={AdminIndex} role="admin"/>
            <PrivateRoute  path={"/provider*"} component={ProviderIndex} role="provider"/>
            <PrivateRoute  path={"/customer*"} component={CustomerIndex} role="customer"/>
            <Route  path={'/*'} component={GeneralIndex}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
