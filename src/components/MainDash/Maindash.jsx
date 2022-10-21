import axios from "axios";
import React from "react";
import Cards from "../Cards/Cards";
import Groupchart from "../chart/Groupchart";
import Tinychart from "../chart/Tinychart";
import Table from "../Table/Table";
import "./MainDash.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Negativechart from "../chart/Negativechart";
import Donutchart from "../chart/Donutchart";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MainDash = () => {
  React.useEffect(() => {
    getdatejob();
  }, []);
  const [person, setPerson] = React.useState([]);

  const [sum, setSum] = React.useState([]);
  const [product, setProduct] = React.useState([]);

  const getdatejob = () => {
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/order/getall/${items}`)
      .then((res) => {
        /*     console.log(res); */
        setSum(res.data.sum);
        setProduct(res.data.data);
      });
  };
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Item>
            {" "}
            <Groupchart />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            {" "}
            <Tinychart />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            {" "}
            <Negativechart />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            {" "}
            <Donutchart />
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainDash;
