import { Paper } from "@mui/material";
import React from "react";
import Addorder from "./Addorder";
import "./Order.css";
const Add = () => {
  return (
    <div className="MainDash">
      <Paper>
        <Addorder />
      </Paper>
    </div>
  );
};

export default Add;
