import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
const Comment = () => {
  const [backendComment, setBackendComment] = useState([]);

  console.log("backendComment", backendComment);
  useEffect(() => {
    getData();
  }, []);
  const { id } = useParams();
  const [comment_detail, setComment_detail] = useState("");
  const [success, setSuccess] = React.useState(false);
  const postData = () => {
    const items = localStorage.getItem("company_id");
    setSuccess(true);
    axios
      .post(`${process.env.REACT_APP_API_KEY}/comment/create`, {
        order_id: id,
        comment_detail: comment_detail,
        created_by: items,
      })
      .then((res) => {
        getData();
        setSuccess(false);
      });
  };
  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/comment/getcomment/${id}`)
      .then((res) => {
        setBackendComment(res.data.data);
      });
  };

  const Comment = backendComment.map((map) => {
    return (
      <>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src="https://eitrawmaterials.eu/clc-location/clc-west/person-icon/" />
            </ListItemAvatar>
            <ListItemText
              primary={map.comment_detail}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  ></Typography>
                  <br></br>
                  {`โดย ${map.user_name}  วันที่ ${map.comment_created_at}`}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </>
    );
  });
  return (
    <Paper>
      <br></br>
      <Grid container>
        {success ? <CircularProgress /> : <></>}
        <Grid xs={1}></Grid>
        <Grid xs={10}>
          <TextField
            fullWidth
            label="เขียนความคิดเห็น"
            id="fullWidth"
            style={{ backgroundColor: "white" }}
            onChange={(e) => {
              setComment_detail(e.target.value);
            }}
          />
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
      <Grid container>
        <Grid xs={1}></Grid>

        <Grid xs={10}>
          <br></br>
          <Button fullWidth variant="contained" onClick={postData}>
            Add comment
          </Button>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>

      <Grid container>
        <Grid xs={1}></Grid>
        <Grid xs={10}>{Comment}</Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </Paper>
  );
};

export default Comment;
