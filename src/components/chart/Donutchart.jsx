import React from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
const Donutchart = () => {
  const [customer, setCustomer] = React.useState([]);
  const [count, setCount] = React.useState([]);

  const [customer_type1, setcustomer_type1] = React.useState([]);
  const [customer_type2, setcustomer_type2] = React.useState([]);
  const [customer_sex1, setcustomer_sex1] = React.useState([]);
  const [customer_sex2, setcustomer_sex2] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const items = localStorage.getItem("company_id");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/customer/getall/${items}`)
      .then((res) => {
        setCount(res.data.count);
        setCustomer(res.data.data);
        setcustomer_type1(res.data.count.count[0].customer_type1);
        setcustomer_type2(res.data.count.count2[0].customer_type2);
        setcustomer_sex1(res.data.count.count3[0].customer_sex1);
        setcustomer_sex2(res.data.count.count4[0].customer_sex2);
      });
  };
  const lab = [" นิติบุคคล", "บุคคลทั่วไป"];

  const value = [customer_type1, customer_type2];
  const data = {
    series: value,
    options: {
      chart: {
        width: 400,
        type: "pie",
      },
      labels: lab,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="pie"
        width={500}
      />
    </div>
  );
};

export default Donutchart;
