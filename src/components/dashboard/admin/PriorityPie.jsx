/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const PriorityPie = () => {
  const [critical, setCritical] = useState(0);
  const [high, setHigh] = useState(0);
  const [medium, setMedium] = useState(0);
  const [low, setLow] = useState(0);

  const fetchTask = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "authorization",
      `Bearer ${localStorage.getItem("access")}`
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `https://wbt-onelogin.onrender.com/api/v1/task/all`,
      requestOptions
    );
    const data = await response.json();
    // console.log(data?.data);
    data?.data?.forEach((task) => {
      if (task?.priority === 4) {
        setCritical((prev) => prev+1);
      } else if (task?.priority === 3) {
        setHigh((prev) => prev+1)
      } else if (task?.priority === 2) {
        setMedium((prev) => prev+1)
      } else if (task?.priority === 1) {
        setLow((prev) => prev+1)
      }

    });
  };

  const chartData = {
    labels: ["Critical", "High", "Medium", "Low"],
    datasets: [
      {
        data: [critical/2, high/2, medium/2, low/2],
        backgroundColor: ["#ff0800", "#f97316", "#fbbf24", "#15803d"],
        hoverBackgroundColor: ["#ff0800", "#f97316", "#fbbf24", "#f87171"],
      },
    ],
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div>
      <Pie data={chartData} />
    </div>
  );
};

export default PriorityPie;
