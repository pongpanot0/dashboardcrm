import React from "react";
import "./Customer.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Select } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
const Addcustomer = () => {
  const navigate = useNavigate();
  const [customer_firstname, setcustomer_firstname] = React.useState("");
  const [customer_lastname, setcustomer_lastname] = React.useState("");
  const [customer_phone, setcustomer_phone] = React.useState("");
  const [customer_type, setcustomer_type] = React.useState("");
  const [customer_taxprayer, setcustomer_taxprayer] = React.useState("");
  const [customer_location, setcustomer_location] = React.useState("");
  const handleChange = (event) => {
    setcustomer_type(event.target.value);
  };

  const addorder = () => {
    const items = localStorage.getItem("company_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/customer/create`, {
        customer_firstname: customer_firstname,
        customer_lastname: customer_lastname,
        customer_phone: customer_phone,
        customer_type: customer_type,
        company_id: items,
        customer_taxprayer: customer_taxprayer,
        customer_location: customer_location,
      })
      .then((res) => {
        if (res.data.status === 200) {
          alert("ok");
          navigate("/Customer");
        }
      });
  };

  return (
    <div className="MainDash">
      <Paper>
        <h1>เพิ่ม Customer ใหม่</h1>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="setcustomer_firstname"
              id="fullWidth"
              onChange={(e) => {
                setcustomer_firstname(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="setcustomer_lastname"
              id="fullWidth"
              onChange={(e) => {
                setcustomer_lastname(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="setcustomer_phone"
              id="fullWidth"
              onChange={(e) => {
                setcustomer_phone(e.target.value);
              }}
            />
          </Grid>
  
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="setcustomer_location"
              id="fullWidth"
              onChange={(e) => {
                setcustomer_location(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="setcustomer_taxprayer"
              id="fullWidth"
              onChange={(e) => {
                setcustomer_taxprayer(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={customer_type}
              label="ประเภทลูกค้า"
              onChange={handleChange}
              displayEmpty
              fullWidth
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="1">นิติบุคคล</MenuItem>
              <MenuItem value="2">บุคคลทั่วไป</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <br></br>
        <Button
          style={{ marginTop: 5, marginBottom: 15 }}
          fullWidth
          variant="contained"
          onClick={addorder}
        >
          Add
        </Button>
        <br></br>
      </Paper>
    </div>
  );
};

export default Addcustomer;
