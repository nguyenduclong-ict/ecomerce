import React, { useState, useEffect } from "react";
import UserPanel from "../../components/Sidebar/UserPanel";
import SidebarForm from "../../components/Sidebar/SidebarForm";
import SidebarMenu from "../../components/Sidebar/SidebarMenu";

const Sidebar = props => {
  //   Menu sidebar click
  const handleMenuItemClick = url => {
    menu.forEach(el => {
      if (el.url === url) el.active = true;
      else {
        el.active = false;
      }

      if (el.subItem) {
        el.subItem.forEach(el2 => {
          if (el2.url === url) el2.active = true;
          else {
            el2.active = false;
          }
        });
      }
    });
    setMenu([...menu]);
  };

  const [menu, setMenu] = useState(props.menu);
  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <UserPanel  />
        <SidebarForm />
        <SidebarMenu
          onItemClick={handleMenuItemClick}
          data={menu}
          header="Danh mục"
        />
      </section>
    </aside>

  );
};

export default Sidebar;
