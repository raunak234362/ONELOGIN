/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const StatusPie = () => {
  const [status, setStatus] = useState([])
  const [statusCount, setStatusCount] = useState([])
  const [statusBG, setStatusBG] = useState([]);

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
      `/api/v1/task/all`,
      requestOptions
    );
    const data = await response.json();
    // console.log(data?.data);
    const distinctStatus = [...new Set(data?.data?.map(item => item.status))];
    setStatus(distinctStatus);
    const countTasks = (status, data) => {
        const counts = status.map((s) => data?.filter((item) => item.status === s).length);
        setStatusCount(counts);
    };

    countTasks(distinctStatus, data?.data);

    const generateRandomColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
            colors.push(color);
        }
        return colors;
    };

    setStatusBG(generateRandomColors(distinctStatus.length));
  };

  const chartData = {
    labels: status,
    datasets: [
      {
        data: statusCount,
        backgroundColor: statusBG,
        hoverBackgroundColor: statusBG,
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

export default StatusPie;
