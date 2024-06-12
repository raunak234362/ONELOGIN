/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const ProjectPie = ({ stage }) => {
  const [onHold, setOnHold] = useState(0);
  const [approved, setApproved] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchProject = async () => {
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
      `/api/v1/project/all?stage=${stage}`,
      requestOptions
    );

    const data = await response.json();
    setTotal(data?.data?.length);
    data?.data?.forEach((project) => {
      if (project?.status === "ON-HOLD") {
        setOnHold((prev) => prev + 1);
      } else if (project?.status === "APPROVED") {
        setApproved((prev) => prev + 1);
      } else if (project?.status === "COMPLETED") {
        setCompleted((prev) => prev + 1);
      }
    });
  };

  const chartData = {
    labels: ["Completed", "Approved", "On-Hold"],
    datasets: [
      {
        data: [completed , approved , onHold ],
        backgroundColor: ["#15803d", "#f97316", "#fbbf24"],
        hoverBackgroundColor: ["#15803d", "#f97316", "#fbbf24"],
      },
    ],
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div>
      {total > 0 ? (
        <>
          <Pie data={chartData} />
          <h3 className="text-center mt-3 font-semibold mb-2">{stage}</h3>
        </>
      ) : (
        <h3 className="text-center mt-3 font-semibold mb-2">
          No Project Found for stage {stage}
        </h3>
      )}
    </div>
  );
};

export default ProjectPie;
