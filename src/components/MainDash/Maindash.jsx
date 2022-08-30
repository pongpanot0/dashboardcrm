import React from "react";
import Cards from "../Card/Cards";
import Table from "../table/Table";
import "./MainDash.css";
const Maindash = () => {
  return (
    <div className="Maindash">
      <h1>DashBoard</h1>
      <Cards />
      <h2 >RecentOrder</h2>
      <Table/>
      
    </div>
  );
};

export default Maindash;
