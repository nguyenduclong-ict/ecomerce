import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";
import CategoryMenu from "./CategoryMenu";

const AdminNavbar = props => {
  useEffect(() => {
    document.onload = () => {
        window.$(document).ready(function() {
            window.$(".megamenu").on("click", function(e) {
              e.stopPropagation();
            });
          });
    }

    return () => {};
  }, []);
  return (
    <div className="fixed-top navbar navbar-light bg-light navbar-expand-md">
    <div className="container">
        <Link className="navbar-brand" href="/">
            EcoStore
        </Link>
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target=".navbar-collapse">☰</button>
        <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
                <li className="nav-item"><Link href="#" className="nav-link">Trang chủ</Link>
                </li>
                 <li className="dropdown menu-large nav-item">
                    <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">Danh mục sản phẩm </a>
                    <ul className="dropdown-menu megamenu">
                        <CategoryMenu>
                            
                        </CategoryMenu>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
  );
};

export default AdminNavbar;
