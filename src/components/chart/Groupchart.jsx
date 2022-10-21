import React from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
const Groupchart = () => {
  React.useEffect(() => {
    getData();
  }, []);

  const [total, setTotal] = React.useState([]);

  const getData = () => {
    const items = localStorage.getItem("company_id");

    axios
      .get(`${process.env.REACT_APP_API_KEY}/product/getall/${items}`)
      .then((res) => {
        setTotal(res.data.data);
      });
  };
  const cchart = total.map((row) => {
    return row.product_name;
  });
  const schart = total.map((row) => {
    return row.product_amount;
  });
  const data = {
    series: [
      {
        data: schart,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 380,
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom",
          },
        },
      },
      colors: [
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
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: cchart,
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      title: {
        text: "จำนวนสินค้า",
        align: "center",
        floating: true,
      },
      subtitle: {
        text: "จำนวนสินค้า ณ ปัจจุบัน",
        align: "center",
      },
      tooltip: {
        theme: "dark",
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function () {
              return "";
            },
          },
        },
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

export default Groupchart;
