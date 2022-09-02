import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState(() => {
    const stickyValue = window.localStorage.getItem("selected");
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : 0;
  });
  console.log(selected);
  const [expanded, setExpaned] = useState(true);
  localStorage.setItem("selected", selected);
  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <Link
                to={item.Link}
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginLeft: 0,
                }}
                className="menuItem"
              >
                <div
                  key={index}
                  onClick={() => setSelected(index)}
                  className={
                    selected === index ? "menuItem active" : "menuItem"
                  }
                >
                  <item.icon />

                  <span> {item.heading}</span>
                </div>
              </Link>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem">
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
