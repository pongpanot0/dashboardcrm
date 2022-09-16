import React from "react";
import "./Setting.css";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const AddShooting = () => {
  const navigate = useNavigate()
  const [Shooting_name, setShooting_name] = React.useState("");
  const [Shooting_amount, setShooting_amount] = React.useState("");
  const [Shooting_month, setShooting_month] = React.useState("");
  const Postdata = () => {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/shooting/create`, {
        Shooting_name: Shooting_name,
        Shooting_amount: Shooting_amount,
        Shooting_month: Shooting_month,
        company_id:1,
        created_by:1,
      })
      .then((res) => {
        if(res.status ===200){
          navigate('/Setting')
        }
        console.log(res.data);
      });
  };
  return (
    <div className="MainDash">
      <Paper>
        <Box component="form" noValidate autoComplete="off">
          <h1>Add Shooting</h1>
          <Grid container>
            <Grid xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="setShooting_name"
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setShooting_name(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="setShooting_month"
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setShooting_month(e.target.value);
                }}
              />
            </Grid>
            <Grid container marginTop={5} marginBottom={5}>
              <Grid xs={12} md={12}>
                <TextField
                  id="standard-basic"
                  label="setShooting_amount"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setShooting_amount(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button variant="contained" onClick={Postdata}>
              Add data
            </Button>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default AddShooting;
