import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState([]);
  const [role, getRole] = React.useState([]);
  const [product_type, setproduct_type] = React.useState("");
  const [product_name, setproduct_name] = React.useState("");
  const [product_price, setproduct_price] = React.useState("");
  const [product_cost, setproduct_cost] = React.useState("");
  const [product_group, setproduct_group] = React.useState("");
  const [product_amount, setproduct_amount] = React.useState("");
  const [supplies_id, setsupplies_id] = React.useState("");
  const [supplier, setsupplier] = React.useState([]);
  console.log(product_name);
  React.useEffect(() => {
    getData();
    getRole(localStorage.getItem("product"));
    getSupplier();
  }, []);
  const navigate = useNavigate();
  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/product/getproductid/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setproduct_type(res.data.data[0].product_type);
        setproduct_name(res.data.data[0].product_name);
        setproduct_price(res.data.data[0].product_price);
        setproduct_cost(res.data.data[0].product_cost);
        setproduct_group(res.data.data[0].product_group);
        setproduct_amount(res.data.data[0].product_amount);
        setsupplies_id(res.data.data[0].supplies_id);
      });
  };
  const getSupplier = () => {
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/supplier/getall/${items}`)
      .then((res) => {
        setsupplier(res.data.data);
      });
  };
  const handleChange = (event) => {
    setsupplies_id(event.target.value);
  };
  const supplie = supplier.map((row) => {
    return <MenuItem value={row.Supplier_ID}>{row.Supplier_Name}</MenuItem>;
  });
  const addorder = () => {
    const user_id = localStorage.getItem("user_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/product/editproduct/${id}`, {
        product_type: product_type,
        product_name: product_name,
        product_price: product_price,
        product_cost: product_cost,
        product_group: product_group,
        product_amount: product_amount,
        supplies_id: supplies_id,
        updated_by: user_id,
      })
      .then((res) => {
        if (res.data.status === 200) {
          alert("ok");
          navigate("/product");
        }
      });
  };
  const Header = () =>{
    if(role ==1){
    return  <h1>แก้ไข / ดูข้อมูล</h1>
    }
    else{
      return <h1>ดูข้อมูล</h1>
    }
  }
  const Roleedit = () => {
    if (role == 1) {
      return (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="setproduct_type"
                id="fullWidth"
                value={product_type}
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
                value={product_name}
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
                value={product_price}
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
                value={product_cost}
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
                value={product_group}
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
                value={product_amount}
                onChange={(e) => {
                  setproduct_amount(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={8}>
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
          <Button
            style={{ marginTop: 5, marginBottom: 15 }}
            fullWidth
            variant="contained"
            onClick={addorder}
          >
            Add
          </Button>
        </>
      );
    }if(role == 0) {
      return (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="setproduct_type"
                id="fullWidth"
                value={product_type}
                onChange={(e) => {
                  setproduct_type(e.target.value);
                }}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="setproduct_name"
                id="fullWidth"
                value={product_name}
                onChange={(e) => {
                  setproduct_name(e.target.value);
                }}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="setproduct_price"
                id="fullWidth"
                value={product_price}
                onChange={(e) => {
                  setproduct_price(e.target.value);
                }}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="setproduct_cost"
                id="fullWidth"
                value={product_cost}
                onChange={(e) => {
                  setproduct_cost(e.target.value);
                }}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="setproduct_group"
                id="fullWidth"
                value={product_group}
                onChange={(e) => {
                  setproduct_group(e.target.value);
                }}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="setproduct_amount"
                id="fullWidth"
                value={product_amount}
                onChange={(e) => {
                  setproduct_amount(e.target.value);
                }}
                disabled
              />
            </Grid>

            <Grid item xs={8}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={supplies_id}
                label="supplies_id"
                onChange={handleChange}
                displayEmpty
                fullWidth
                disabled
                inputProps={{ "aria-label": "Without label" }}
              >
                {supplie}
              </Select>
            </Grid>
          </Grid>
        
        </>
      );
    }
  };

  return (
    <div className="MainDash">
      <Paper>
       <Header/>
        <br></br>
    <Roleedit/>
        <br></br>
      </Paper>
    </div>
  );
};

export default ProductEdit;
