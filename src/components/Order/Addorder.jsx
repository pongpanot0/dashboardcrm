import React from "react";
import "./Order.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
const Addorder = () => {
  const [ordername, setOrdername] = React.useState("");
  const [orderdetail, setOrderdetail] = React.useState("");
  const addorder = () => {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/order/create`, {
        order_name: ordername,
        order_detail: orderdetail,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          alert("สำเร็จ");
        }
        if (res.data.status === 400) {
        }
      });
  };
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
