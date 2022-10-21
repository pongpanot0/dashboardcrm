import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Select } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormLabel from "@mui/material/FormLabel";
import "./createperson.css";
const Createperson = () => {
  const navigate = useNavigate();
  const [user_name, setuser_name] = React.useState("");
  const [user_firstname, setuser_firstname] = React.useState("");
  const [user_surname, setuser_surname] = React.useState("");
  const [created_by, setcreated_by] = React.useState("");
  const [created_at, setcreated_at] = React.useState("");
  const [update_by, setupdate_by] = React.useState("");
  const [update_at, setupdate_at] = React.useState("");
  const [organize_id, setorganize_id] = React.useState("");
  const [role, setrole] = React.useState("");
  const [product, setproduct] = React.useState("");
  const [customer, setcustomer] = React.useState("");
  const [Company_name, setCompany_name] = React.useState("");
  const [email, setemail] = React.useState("");
  const [value, setValue] = React.useState("female");
  const [value2, setValue2] = React.useState("female");
  const [getorg, setgetorg] = React.useState([]);
  const handleChange4 = (event) => {
    setproduct(event.target.value);
  };
  const handleChange3 = (event) => {
    setorganize_id(event.target.value);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChange2 = (event) => {
    setValue2(event.target.value);
  };
  React.useEffect(() => {
    getOrganize();
  }, []);

  const getOrganize = () => {
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/organize/getall/${items}`)
      .then((res) => {
        console.log(res.data.data);
        setgetorg(res.data.data);
      });
  };
  const select = getorg.map((row) => {
    return <MenuItem value={row.organize_id}>{row.organize_name}</MenuItem>;
  });
  const addorder = () => {
    const user = localStorage.getItem('user_id')
    const items = localStorage.getItem("company_id");
    axios
      .post(`${process.env.REACT_APP_API_KEY}/person/create`, {
        user_name: user_name,
        user_firstname: user_firstname,
        user_surname: user_surname,
        created_by: user,
     
        update_by: user,
       
        organize_id: organize_id,
        role: value2,
        product: product,
        customer: value,
        company_id: items,
        email: email,
      })
      .then((res) => {
        console.log(res)
        if (res.data.status === 200) {
          alert("ok");
        /*   navigate("/Customer"); */
        }
        if (res.data.status === 400) {
          alert("false");
        /*   navigate("/Customer"); */
        }
      });
  };

  return (
    <div className="MainDash">
      <Paper>
        <h1>เพิ่ม Customer ใหม่</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="setuser_name"
              id="fullWidth"
              onChange={(e) => {
                setuser_name(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="setuser_firstname"
              id="fullWidth"
              onChange={(e) => {
                setuser_firstname(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="setuser_surname"
              id="fullWidth"
              onChange={(e) => {
                setuser_surname(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                organize_id
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={organize_id}
                onChange={handleChange3}
                label="setorganize_id"
                fullWidth
              >
                {select}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                SetRole
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value2}
                onChange={handleChange2}
              >
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Leader"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Employees"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                setcustomer
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={product}
                onChange={handleChange4}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="แก้ไขได้"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="ไม่สามาถแก้ไขได้"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                setcustomer
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="แก้ไขได้"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="ไม่สามาถแก้ไขได้"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="setemail"
              id="fullWidth"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
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

export default Createperson;
