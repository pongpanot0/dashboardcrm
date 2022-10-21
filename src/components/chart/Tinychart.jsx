import React, { PureComponent } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Tinychart = () => {
  const [order, setOrder] = React.useState([]);
  const [count, setcount] = React.useState([]);
  const [count1, setcount1] = React.useState([]);
  const [count2, setcount2] = React.useState([]);
  const [count3, setcount3] = React.useState([]);
  const [count4, setcount4] = React.useState([]);
  const [sum, setSum] = React.useState([]);
  React.useEffect(() => {
    getData2();
  }, []);
  const colors = [
    "#33b2df",
    "#546E7A",
    "#d4526e",
    "#13d8aa",
    "#A5978B",
    "#2b908f",
    "#f9a3a4",
    "#90ee7e",
    "#f48024",
    "#69d2e7",
  ];
  const getData2 = () => {
    const role = localStorage.getItem("role");
    if (role == 1) {
      const items = localStorage.getItem("company_id");
      axios
        .get(`${process.env.REACT_APP_API_KEY}/order/getall/${items}`)
        .then((res) => {
          console.log(res, "getall");
          setSum(res.data.sum);
          setOrder(res.data.data);
          setcount(res.data.count);
          setcount1(res.data.count1);
          setcount2(res.data.count2);
          setcount3(res.data.count3);
          setcount4(res.data.count4);
        });
    }
    if (role == 2) {
      const organize_id = localStorage.getItem("organize_id");
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/order/getorderDepartment/${organize_id}`
        )
        .then((res) => {
          console.log("getorderDepartment");
          setSum(res.data.sum);
          setOrder(res.data.data);
          setcount(res.data.count);
          setcount1(res.data.count1);
          setcount2(res.data.count2);
          setcount3(res.data.count3);
          setcount4(res.data.count4);
        });
    }
    if (role == 3) {
      const user_id = localStorage.getItem("user_id");
      axios
        .get(`${process.env.REACT_APP_API_KEY}/order/getorderRepro/${user_id}`)
        .then((res) => {
          console.log(res, "getorderDepartment");
          setSum(res.data.sum);
          setOrder(res.data.data);
          setcount(res.data.count);
          setcount1(res.data.count1);
          setcount2(res.data.count2);
          setcount3(res.data.count3);
          setcount4(res.data.count4);
        });
    }
  };
  /* console.log(product) */
  const data = {
    series: [
      {
        name: "จำนวน",
        data: [count1, count2, count3, count4],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      colors: colors,
      plotOptions: {
        bar: {
          borderRadius: 10,
          distributed: true,
          dataLabels: {
            position: "top", // top, center, bottom
          },
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },

      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "งาน";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: ["เปิดการขาย", "นำเสนอ", "ต่อรอง", "ปิดการขาย"],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              color: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },

        show: false,
        formatter: function (val) {
          return val + "งาน";
        },
      },
      title: {
        text: "จำนวน Order ทั้งหมด",
        align: "center",
        floating: true,
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Tinychart;
