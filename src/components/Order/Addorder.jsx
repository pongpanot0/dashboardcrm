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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import NativeSelect from "@mui/material/NativeSelect";
const Addorder = () => {
  const navigate = useNavigate();
  const [ordername, setOrdername] = React.useState("");
  const [orderdetail, setOrderdetail] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [responsibleperson, setresponsibleperson] = React.useState("");
  const [order_price, setorder_price] = React.useState("");
  const [user, setuser] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [customer_firstname, setcustomer_firstname] = React.useState("");
  const [customer_lastname, setcustomer_lastname] = React.useState("");
  const [customer_phone, setcustomer_phone] = React.useState("");
  const [customer_type, setcustomer_type] = React.useState("");
  const [customer_taxprayer, setcustomer_taxprayer] = React.useState("");
  const [customer_location, setcustomer_location] = React.useState("");
  const [product, setProduct] = React.useState([]);

  const [inputFields, setInputFields] = React.useState([
    {
      productid: "",
      piece: "",
      plice: Number,
      total: "",
    },
  ]);

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        productid: "",
        piece: "",
        plice: Number,
        total: "",
      },
    ]);
  };
  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };

  const handleChange4 = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };
  const handleChange3 = (event) => {
    setcustomer_type(event.target.value);
  };

  const handleChange2 = (event) => {
    setValue(event.target.value);
  };
  const AddCus = () => {
    if (value == 1) {
      return (
        <Grid item xs={12}>
          <FormControl variant="standard" sx={{ minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              ลูกค้า
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={responsibleperson}
              onChange={handleChange}
              label="Age"
            >
              {select}
            </Select>
          </FormControl>
        </Grid>
      );
    }
    if (value == 2) {
      return (
        <Grid item xs={12} wrap="nowrap">
          <Paper>
            <h1>เพิ่ม Customer ใหม่</h1>
            <Typography variant="body2" gutterBottom>
              ***หากเพิ่มข้อมูล Customer จะ Add เข้าระบบให้โดนอัตโนมัติ
            </Typography>

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
                  onChange={handleChange3}
                  displayEmpty
                  fullWidth
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="1">นิติบุคคล</MenuItem>
                  <MenuItem value="2">บุคคลทั่วไป</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      );
    }
  };

  React.useEffect(() => {
    getData();
    getdataproduct();
  }, []);

  const getData = () => {
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/person/getall/${items}`)
      .then((res) => {
        setuser(res.data.data);
      });
  };
  const getdataproduct = () => {
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/product/getall/${items}`)
      .then((res) => {
        setProduct(res.data.data);
      });
  };
  const select = user.map((row) => {
    return (
      <MenuItem value={row.user_id}>
        {row.user_firstname} {row.user_surname}
      </MenuItem>
    );
  });
  const getproduct = product.map((row) => {
    return (
      <>
        <option value={row.product_id}>
          ชื่อสินค้า : {row.product_name} ราคาขายกลาง : {row.product_price}{" "}
          ราคาต้นทุน : {row.product_cost}
        </option>
      </>
    );
  });
  const handleChange = (event) => {
    setresponsibleperson(event.target.value);
  };
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
        responsibleperson: responsibleperson,
        order_price: order_price,
        customer_firstname: customer_firstname,
        customer_lastname: customer_lastname,
        customer_phone: customer_phone,
        customer_type: customer_type,
        customer_taxprayer: customer_taxprayer,
        customer_location: customer_location,
        inputFields: inputFields,
      })
      .then((res) => {
        if (res.data.status === 200) {
          alert("ok");
          navigate("/Order");
        }
      });
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <div>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="order_price"
                  type="number"
                  id="fullWidth"
                  onChange={(e) => {
                    setorder_price(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  variant="standard"
                  sx={{ minWidth: 120 }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    ผู้รับผิดชอบ
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={responsibleperson}
                    onChange={handleChange}
                    label="Age"
                  >
                    {select}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    เลือกประเภทลูกค้า
                  </FormLabel>
                  <RadioGroup
                    row
                    value={value}
                    onChange={handleChange2}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="ลูกค้าในระบบ"
                    />

                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="ลูกค้าภายนอก"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <AddCus />
          </Paper>
        </div>
      </Grid>
      <Grid item xs={6}>
        <Button
          color="primary"
          className="btn btn-outline-success "
          onClick={addInputField}
        >
          Add New
        </Button>
        {inputFields.map((data, index) => {
          const { productid, piece, plice, total } = data;

          return (
            <Paper>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={3}>
                  <br></br>
                  <FormControl>
                    <NativeSelect
                      onChange={(evnt) => handleChange4(index, evnt)}
                      value={productid}
                      fullWidth
                      name="productid"
                    >
                      <option value="">กรุณาเลือกสินค้า</option>
                      {getproduct}
                    </NativeSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    fullWidth
                    name="piece"
                    label="จำนวนสินค้า"
                    id="fullWidth"
                    type="number"
                    value={piece}
                    onChange={(evnt) => handleChange4(index, evnt)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    fullWidth
                    name="plice"
                    label="ราคาสินค้าต่อชิ้น"
                    id="fullWidth"
                    type="number"
                    value={plice}
                    onChange={(evnt) => handleChange4(index, evnt)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    name="total"
                    label="ราคาสินค้า"
                    id="fullWidth"
                    type="number"
                    value={total}
                    disabled
                    onChange={(evnt) => handleChange4(index, evnt)}
                  />
                </Grid>
                {inputFields.length !== 1 ? (
                  <Grid item xs={2}>
                    <Button
                      color="primary"
                      className="btn btn-outline-danger"
                      onClick={removeInputFields}
                    >
                      Remove
                    </Button>
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Paper>
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <Button
          style={{ marginTop: 5 }}
          fullWidth
          variant="contained"
          onClick={addorder}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default Addorder;
