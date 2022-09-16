import React from "react";
import "./Order.css";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import OrderTimeline from "./OrderTimeline";
import Comment from "../Comment/Comment";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
const Orderupdate = () => {
  const { id } = useParams();
  const [order, setOrder] = React.useState([]);
  const [orderphase2_detail, setorderphase2_detail] = React.useState("");
  const [data, setData] = React.useState([]);
  const [orderphase2_pic, setorderphase2_pic] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const Header = () => {
    if (order === 1) {
      return <h1 style={{ textAlign: "center" }}>นำเสนองาน</h1>;
    }
    if (order === 2) {
      return <h1 style={{ textAlign: "center" }}>ต่อรอง</h1>;
    }
    if (order === 3) {
      return <h1 style={{ textAlign: "center" }}>ปิดงาน</h1>;
    }
    if (order === 4) {
      return <h1 style={{ textAlign: "center" }}>รายละเอียด</h1>;
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/order/getDetail/${id}`)
      .then((res) => {
        setData(res.data.data);
        setOrder(res.data.data[0].order_timeline);
      });
  };
  const navigate = useNavigate();
  const updateOrder = () => {
    setSuccess(true);
    if (order === 1) {
      axios
        .put(`${process.env.REACT_APP_API_KEY}/order/update/${id}`, {
          orderphase2_detail: orderphase2_detail,
          orderphase2_pic: orderphase2_pic,
          order_id: id,
          order_timeline: order,
          timeline: 2,
        })
        .then((res) => {
          if (res.data.status === 200) {
            alert('ok')
            navigate("/Order");
          }
          if (res.data.status === 400) {
          }
        });
    }
    if (order === 2) {
      axios
        .put(`${process.env.REACT_APP_API_KEY}/order/update/${id}`, {
          orderphase2_detail: orderphase2_detail,
          orderphase2_pic: orderphase2_pic,
          order_id: id,
          order_timeline: order,
          timeline: 3,
        })
        .then((res) => {
          if (res.data.status === 200) {
            alert('ok')
            navigate("/Order");
          }
          if (res.data.status === 400) {
          }
        });
    }
    if (order === 3) {
      axios
        .put(`${process.env.REACT_APP_API_KEY}/order/update/${id}`, {
          orderphase2_detail: orderphase2_detail,
          orderphase2_pic: orderphase2_pic,
          order_id: id,
          order_timeline: order,
          timeline: 4,
        })
        .then((res) => {
          if (res.data.status === 200) {
            alert('ok')
            navigate("/Order");
          }
          if (res.data.status === 400) {
          }
        });
    }
  };
  const Show = data.map((map) => {
    if (order === 4) {
      return (
        <>
          <Header />
          <OrderTimeline id={id} />
        </>
      );
    } else {
      return (
        <>
          <Header />
          {success ? <CircularProgress /> : <></>}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Orderdetail"
                id="fullWidth"
                onChange={(e) => {
                  setorderphase2_detail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Orderdetail"
                id="fullWidth"
                onChange={(e) => {
                  setorderphase2_pic(e.target.value);
                }}
              />
            </Grid>
            {/*  <Grid item xs={12}>
          <Button variant="contained" component="label" fullWidth>
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </Grid> */}
          </Grid>
          <Button
            style={{ marginTop: 5 }}
            variant="contained"
            onClick={updateOrder}
            fullWidth
          >
            Add
          </Button>
          <OrderTimeline id={id} />
        </>
      );
    }
  });
  return (
    <div className="MainDash">
      <Paper> {Show}</Paper>
      <Comment />
    </div>
  );
};

export default Orderupdate;
