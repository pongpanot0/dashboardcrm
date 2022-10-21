import React from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import moment from "moment";
import 'moment/locale/th' 
const Negativechart = () => {
  React.useEffect(() => {
    getData();
  }, []);
  const [now, setnow] = React.useState([]);
  const [nowmount, setnowmount] = React.useState([]);
  const [one, setone] = React.useState([]);
  const [onemount, setonemount] = React.useState([]);
  const [two, settwo] = React.useState([]);
  const [twomount, settwomount] = React.useState([]);
  const [three, setthree] = React.useState([]);
  const [threemount, setthreemount] = React.useState([]);
  const [four, setfour] = React.useState([]);
  const [fourmount, setfourmount] = React.useState([]);
  const [five, setfive] = React.useState([]);
  const [fivemount, setfivemount] = React.useState([]);
  const [six, setsix] = React.useState([]);
  const [sixmount, setsixmount] = React.useState([]);
  const getData = () => {
    const items = localStorage.getItem("company_id");

    axios
      .get(`${process.env.REACT_APP_API_KEY}/order/getSumprice/${items}`)
      .then((res) => {
        setnow(res.data.now[0]["SUM(order_price)"]);
        setone(res.data.one[0]["SUM(order_price)"]);
        settwo(res.data.two[0]["SUM(order_price)"]);
        setthree(res.data.three[0]["SUM(order_price)"]);
        setfour(res.data.four[0]["SUM(order_price)"]);
        setfive(res.data.five[0]["SUM(order_price)"]);
        setsix(res.data.six[0]["SUM(order_price)"]);
        setnowmount(res.data.now[0]["job_end"]);
        setonemount(res.data.one[0]["job_end"]);
        settwomount(res.data.two[0]["job_end"]);
        setthreemount(res.data.three[0]["job_end"]);
        setfourmount(res.data.four[0]["job_end"]);
        setfivemount(res.data.five[0]["job_end"]);
        setsixmount(res.data.six[0]["job_end"]);
      });
  };
  const value = [six, five, four, three, two, one, now];
  const date = [
    moment(sixmount).format("MMMM"),
    moment(onemount).format("MMMM"),
    moment(twomount).format("MMMM"),
    moment(threemount).format("MMMM"),
    moment(fourmount).format("MMMM"),
    moment(fivemount).format("MMMM"),
    moment(nowmount).format("MMMM"),
  ];

  console.log(moment(nowmount).locale("th").format("MMMM"));
  const data = {
    series: [
      {
        name: "ยอดขาย",
        data: value,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "ยอดขายประจำเดือน",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: date,
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default Negativechart;
