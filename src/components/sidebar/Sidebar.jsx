import React from "react";
import "./Sidebar.css";
import Logo from "../img/151141.jpg";
import { SidebarDate } from "../data/Data";
import { UilSignOutAlt } from "@iconscout/react-unicons";
const Sidebar = () => {
  const [selected, setSelected] = React.useState(0);
  return (
    <div className="Sidebar">
      <div className="logo">
        <img src={Logo} alt="" />
        <span>
          C<span>R</span>M
        </span>
      </div>
      <div className="menu">
        {SidebarDate.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : " menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        <div className="menuItem">
          <UilSignOutAlt />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
