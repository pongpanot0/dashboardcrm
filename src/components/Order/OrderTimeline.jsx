import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import axios from "axios";

import Typography from "@mui/material/Typography";
import { useState } from "react";
export default function OrderTimeline({ id }) {
  const [timestart, setTimestart] = useState([]);
  React.useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/order/getDetailtimeline/${id}`)
      .then((res) => {
        console.log(res);
        setTimestart(res.data.data);
      });
  };
  const Timelinestart = timestart.map((map) => {

    return (
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            วันที่และเวลา : {map.created_at}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            {" "}
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6" component="span">
                วันที่เปิดงาน
              </Typography>
              <Typography>ชื่องาน : {map.order_name}</Typography>
            </TimelineContent>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            วันที่และเวลา : {map.created_at2}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot style={{backgroundColor:"#00b0ff"}} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              นำเสนองาน
            </Typography>
            <Typography>รายละเอียด : {map.orderphase2_detail}</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            วันที่และเวลา : {map.created_at3}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot style={{backgroundColor:"#ff9100"}} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              ต่อรอง
            </Typography>
            <Typography>รายละเอียด : {map.orderphase3_detail}</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="text.secondary"
          >
            วันที่และเวลา : {map.created_at4}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot style={{backgroundColor:"#4caf50"}} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              ปิดงาน
            </Typography>
            <Typography>รายละเอียด : {map.orderphase4_detail}</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );
  });
  return <React.Fragment>{Timelinestart}</React.Fragment>;
}
