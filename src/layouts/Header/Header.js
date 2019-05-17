import React from "react";
import {Link} from 'react-router-dom'
import Profile from "../../components/Header/Profile";
class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    
    return (
      <header className="Header main-header">
        {/* <!-- Logo --> */}
        <Link to={this.props.url} className="logo">
          {/* mini logo for sidebar mini 50x50 pixels */}
          <span className="logo-mini">
            <b>E</b>S
          </span>
          {/* <!-- logo for regular state and mobile devices --> */}
          <span className="logo-lg">
            <b>EcomStore</b>
          </span>
        </Link>

        <nav className="navbar navbar-static-top" role="navigation">
            {/* <!-- Sidebar toggle button--> */}
            <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                <span className="sr-only">Toggle navigation</span>
            </a>
            {/* <!-- Navbar Right Menu --> */}
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                </ul>
            </div>
            <div class="navbar-custom-menu">
         <ul class="nav navbar-nav">
            <Profile history={this.props.history}/>
        </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
