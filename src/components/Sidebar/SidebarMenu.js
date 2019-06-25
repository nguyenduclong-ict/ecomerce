import React, { useState } from "react";
import SidebarMenuItem from "./SidebarMenuItem";
import { Link } from "react-router-dom";
function SidebarMenu(props) {
  const onItemClick = props.onItemClick;

  function printMenu() {
    let menu = [];
    if (!props.data) return menu;
    props.data.forEach(element => {
      if (Array.isArray(element.subItem)) {
        let submenu = [];
        element.subItem.forEach(el => {
          submenu.push(
            <SidebarMenuItem onClick={onItemClick} name={el.name} url={el.url} icon={el.icon} active={el.active} />
          );
        });
        menu.push(
          <li className={"treeview " + (element.open ? "menu-open" : "")}>
            <Link to="#">
              <i className="fa fa-laptop" />
              <span>{element.name}</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </Link>
            <ul className="treeview-menu" style={{ display: element.open ? "block" : "none" }}>
              {submenu}
            </ul>
          </li>
        );
      } else {
        menu.push(
          <SidebarMenuItem
            onClick={onItemClick}
            name={element.name}
            icon={element.icon}
            url={element.url}
            active={element.active}
          />
        );
      }
    });

    return menu;
  }

  return (
    <ul className="sidebar-menu tree" data-widget="tree">
      <li className="header">{props.header}</li>
      {printMenu()}
    </ul>
  );
}

export default SidebarMenu;
