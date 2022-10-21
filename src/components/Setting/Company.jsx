import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Stack from "@mui/material/Stack";
import logo from "../../imgs/logo.png";
const Company = () => {
  const [Company_name, setCompany_name] = React.useState([]);
  const [company_location, setcompany_location] = React.useState([]);
  const [company_taxprayer, setcompany_taxprayer] = React.useState([]);
  const [company_tel, setcompany_tel] = React.useState([]);
  const [val, setval] = React.useState(true);
  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/company/getdetailcompany/${items}`)
      .then((res) => {
        console.log(res.data);
        setCompany_name(res.data.data[0].Company_name);
        setcompany_location(res.data.data[0].company_location);
        setcompany_taxprayer(res.data.data[0].company_taxprayer);
        setcompany_tel(res.data.data[0].company_tel);
      });
  };
  const editData = () => {
    const items = localStorage.getItem("company_id");
    const user_id = localStorage.getItem("user_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/company/editcompany/${items}`, {
        Company_name: Company_name,
        company_location: company_location,
        company_taxprayer: company_taxprayer,
        company_tel: company_tel,
        updated_by: user_id,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.data.info);
        getData();
      });
  };
  const onEdit = () => {
    setval(!val);
  };
  return (
    <Box
      sx={{ width: "100%", "& .MuiTextField-root": { m: 1, width: "25ch" } }}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            value={Company_name}
            id="standard-basic"
            label="Company_name"
            variant="standard"
            disabled={val}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setCompany_name(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            value={company_location}
            fullWidth
            id="standard-basic"
            disabled={val}
            label="company_location"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setcompany_location(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <img src={logo} srcSet={logo} alt={logo} loading="lazy" />
    
        </Grid>
        <Grid item xs={2}>
         
          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </Grid>
        <br />
        <br></br>
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={company_taxprayer}
            id="standard-basic"
            disabled={val}
            label="company_taxprayer"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setcompany_taxprayer(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={company_tel}
            id="standard-basic"
            label="company_tel"
            disabled={val}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setcompany_tel(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2} direction="row">
            <Button color="secondary" variant="contained" onClick={onEdit}>
              ต้องการแก้ไขข้อมูล
            </Button>
            <Button color="success" variant="contained" onClick={editData}>
              แก้ไขข้อมูล
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Company;
