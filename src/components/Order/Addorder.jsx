import React from "react";
import "./Order.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
const Addorder = () => {
  const navigate = useNavigate();
  const [ordername, setOrdername] = React.useState("");
  const [orderdetail, setOrderdetail] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const addorder = () => {
    const items = localStorage.getItem("company_id");
    const user_id = localStorage.getItem("user_id");
    const organize_id = localStorage.getItem("organize_id");

    axios
      .post(`${process.env.REACT_APP_API_KEY}/order/create`, {
        order_name: ordername,
        order_detail: orderdetail,
        company_id: items,
        organize_id: organize_id,
        created_by: user_id,
        updated_by: user_id,
      })
      .then((res) => {
        if (res.data.status === 200) {
          alert("ok");
          navigate("/Order");
        }
      });
  };

  return (
    <div className="MainDash">
      <Paper>
        <h1>เพิ่ม Order ใหม่</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ordername"
              id="fullWidth"
              onChange={(e) => {
                setOrdername(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Orderdetail"
              id="fullWidth"
              onChange={(e) => {
                setOrderdetail(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Button style={{ marginTop: 5 }} variant="contained" onClick={addorder}>
          Add
        </Button>
      </Paper>
    </div>
  );
};

export default Addorder;
