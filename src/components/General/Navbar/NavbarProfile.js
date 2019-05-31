import React from 'react'
import './NavbarProfile.css';
import {Link} from 'react-router-dom'
import { logout } from '../../../helpers/Auth';

const NavbarProfile = () => {

    const logoutClick = () =>{
        logout();
        window.location.href = '/';
    }

    const gotoProfile = () => {

    };

    return (
        <ul >
        <li className="nav-item submenu">
          <a href="#" className="cart">
            <span className="fa fa-user">
            </span>
          </a>
  
          <ul className="dropdown-menu" id="dropdown-profile" styfle={ulStyle}>
            <div >
            <Link style={{marginBottom : "5px", marginRight : "5px"}} to='/customer/profile' className="btn btn-yellow pull-right">
                <i class="fa  fa-user" aria-hidden="true" />
                Thông tin
              </Link>
              <button style={{marginBottom : "5px", marginRight : "5px"}} class="btn btn-yellow pull-right" onClick={logoutClick}>
                <i class="fa  fa-sign-out" aria-hidden="true" />
                Đăng xuất
              </button>
            </div>
          </ul>
        </li>
      </ul>
    )
}

export default NavbarProfile

const ulStyle = {
    minHeight: "100px",
    height: "auto",
    backgroundColor: "white",
    minWidth: "300px",
    width: "auto",
    borderRadius: "5px",
    marginTop: "10px"
  };
  