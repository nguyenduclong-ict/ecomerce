import React from "react";
import {Link} from 'react-router-dom'
class Header extends React.Component {
  render() {
    return (
      <header className="Header main-header">
        {/* <!-- Logo --> */}
        <Link to="/admin/dashboard" className="logo">
          {/* mini logo for sidebar mini 50x50 pixels */}
          <span className="logo-mini">
            <b>E</b>S
          </span>
          {/* <!-- logo for regular state and mobile devices --> */}
          <span className="logo-lg">
            <b>EcoStore</b>
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
        </nav>
      </header>
    );
  }
}

export default Header;
