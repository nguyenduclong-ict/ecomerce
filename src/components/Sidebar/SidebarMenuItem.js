import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SidebarMenuItem = props => {
  return (
    <li className={props.active ? "active" : ""} onClick={() => props.onClick(props.url)}>
      <Link to={props.url || "#"}>
        <i className={props.icon || "fa fa-link"} />
        <span>{props.name || "#"}</span>
      </Link>
    </li>
  );
};

export default SidebarMenuItem;
