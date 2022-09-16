import React from "react";
import "./Product.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
const Addproduct = () => {
  const navigate = useNavigate();
  const [product_type, setproduct_type] = React.useState("");
  const [product_name, setproduct_name] = React.useState("");
  const [product_price, setproduct_price] = React.useState("");
  const [product_cost, setproduct_cost] = React.useState("");
  const [product_group, setproduct_group] = React.useState("");
  const [product_amount, setproduct_amount] = React.useState("");
  const [supplies_id, setsupplies_id] = React.useState("");
  const [supplier, setsupplier] = React.useState([]);
  React.useEffect(() => {
    getData();
  }, []);
  const handleChange = (event) => {
    setsupplies_id(event.target.value);
  };
  const supplie = supplier.map((row) => {
    return <MenuItem value={row.Supplier_ID}>{row.Supplier_Name}</MenuItem>;
  });
  const getData = () => {
    const items = localStorage.getItem("company_id");
    const user_id = localStorage.getItem("user_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/supplier/getall/${items}`)
      .then((res) => {
        console.log(res.data.data);
        setsupplier(res.data.data);
      });
  };
  const addorder = () => {
    const items = localStorage.getItem("company_id");
    const user_id = localStorage.getItem("user_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/product/create`, {
        product_type: product_type,
        product_name: product_name,
        product_price: product_price,
        product_cost: product_cost,
        product_group: product_group,
        product_amount: product_amount,
        supplies_id: supplies_id,
        company_id: items,
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
        <h1>เพิ่ม Customer ใหม่</h1>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="setproduct_type"
              id="fullWidth"
              onChange={(e) => {
                setproduct_type(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="setproduct_name"
              id="fullWidth"
              onChange={(e) => {
                setproduct_name(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="setproduct_price"
              id="fullWidth"
              onChange={(e) => {
                setproduct_price(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="setproduct_cost"
              id="fullWidth"
              onChange={(e) => {
                setproduct_cost(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="setproduct_group"
              id="fullWidth"
              onChange={(e) => {
                setproduct_group(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="setproduct_amount"
              id="fullWidth"
              onChange={(e) => {
                setproduct_amount(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={supplies_id}
              label="supplies_id"
              onChange={handleChange}
              displayEmpty
              fullWidth
              inputProps={{ "aria-label": "Without label" }}
            >
              {supplie}
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

export default Addproduct;
