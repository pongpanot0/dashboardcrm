import React from "react";
import "./Supplier.css";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddSupplier = () => {
  const navigate = useNavigate();
  const [Supplier_Name, setSupplier_Name] = React.useState("");
  const [Adress, setAdress] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Phone, setPhone] = React.useState("");

  const Postdata = () => {
    const items = localStorage.getItem("company_id");
    const user = localStorage.getItem("user_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/supplier/create`, {
        Supplier_Name: Supplier_Name,
        Adress: Adress,
        Email: Email,
        Phone: Phone,
        created_by: user,
        updated_by: user,
        company_id: items,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/Supplier");
        }
        console.log(res.data);
      });
  };
  return (
    <div className="MainDash">
      <Paper>
        <Box component="form" noValidate autoComplete="off">
          <h1>Add Supplier</h1>
          <Grid container>
            <Grid xs={12} md={12} marginBottom={5}>
              <TextField
                id="standard-basic"
                label="setShooting_name"
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setSupplier_Name(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={12} md={12} marginBottom={5}>
              <TextField
                id="standard-basic"
                label="setShooting_month"
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setAdress(e.target.value);
                }}
              />
            </Grid>
            <Grid container marginBottom={5}>
              <Grid xs={12} md={12}>
                <TextField
                  id="standard-basic"
                  label="setShooting_amount"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container marginBottom={5}>
              <Grid xs={12} md={12}>
                <TextField
                  id="standard-basic"
                  label="setShooting_amount"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button variant="contained" fullWidth onClick={Postdata}>
              Add data
            </Button>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default AddSupplier;
