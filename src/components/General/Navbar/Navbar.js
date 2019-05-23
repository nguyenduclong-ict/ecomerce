import React from "react";
import CategoryMenu from "./CategoryMenu";
import NavbarCart from './NavbarCart'
import NavbarSearch from "./NavbarSearch";

const Navbar = () => {
  return (
    <div id="undefined-sticky-wrapper" className="sticky-wrapper" style={{ height: "80px" }}>
      <header className="header_area sticky-header">
        <div className="main_menu">
          <nav className="navbar navbar-expand-lg navbar-light main_box">
            <div className="container">
              {/* Brand and toggle get grouped for better mobile display */}
              <a className="navbar-brand logo_h" href="index.html">
                <img src="General/img/logo.png" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="fa fa-reorder" />
              </button>
              {/* Collect the nav links, forms, and other content for toggling */}
              <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                <CategoryMenu />
                <ul className="nav navbar-nav navbar-right">
                  <NavbarCart/>
                  <NavbarSearch/>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="search_input" id="search_input_box" style={{ display: "none" }}>
          <div className="container">
            <form className="d-flex justify-content-between">
              <input type="text" className="form-control" id="search_input" placeholder="Search Here" />
              <button type="submit" className="btn">
                <span className="fa fa-times" id="close_search" title="Close Search" />
              </button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
