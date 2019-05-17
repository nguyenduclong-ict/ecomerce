import React from "react";
import "./AdminNavbar.css";

const CategoryMenu = () => {
  return (
    <div className="row category-menu">
      <div className="col-md-3 col-sm-3 col-xs-3">
        <ul>
          <li className="active">
            <a>item 1</a>
          </li>
          <li>
            <a>item 2</a>
          </li>
          <li>
            <a>item 3</a>
          </li>
          <li>
            <a>item 4</a>
          </li>
        </ul>
      </div>

      <div className="col" />
    </div>
  );
};

export default CategoryMenu;
