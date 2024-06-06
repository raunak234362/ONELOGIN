/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

const ApprovalList = ({ toggleApprove }) => {
  const [task, setTask] = useState();
  

  const fetchTask = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      "https://wbt-onelogin.onrender.com/api/v1/task/assign/all",
      requestOptions
    );
    const data = await response.json();
    setTask(data?.data);
    console.log(data?.data);
  };

  const approveTask = async (taskId, assignId) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify({
        assignId: assignId,
      })
    };

    const response = await fetch(
      `https://wbt-onelogin.onrender.com/api/v1/task/${taskId}/approve/`,
      requestOptions
    );
    const data = await response.json();
    // setTask(data?.assign?.assignedTo)
    alert("Task Approved")
    console.log(data);
    await fetchTask();
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="bg-white my-auto h-[50%] w-[70%] p-6 rounded-xl shadow-md">
      <h3 className="text-xl text-center font-semibold text-gray-600">
        Approval List
      </h3>
      <div className="overflow-y-auto h-80 table-container">
        <table className="w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-1 px-4 border">S.No</th>
              {/* <th className="py-2 px-4 border">Fabricator</th> */}
              <th className="py-2 px-4 border">Title</th>
              
              <th className="py-2 px-4 border">Team Lead</th>
              <th className="py-2 px-4 border">Project Status</th>
              <th className="py-1 px-4 border">Option</th>
            </tr>
          </thead>
          <tbody>
            {task &&
              task.map((item, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  {/* <td className="py-2 px-4 border">
                    {item?.project?.fabricator?.name}
                  </td> */}
                  
                  <td className="py-2 px-4 border">{item?.taskTitle}</td>
                  <td className="py-2 px-4 border">{item?.teamLeader?.username}</td>
                  
                  <td className="py-2 px-4 border">{item?.status}</td>
                  <td className="py-2 px-4 border">
                   <button
                   onClick={(e) => {
                    e.preventDefault();
                    approveTask(item?.taskId, item?.assignId)
                   }}
                   className="mt-4 inline-block w-1/2 bg-green-500 text-center text-white py-2 px-4 rounded-lg hover:bg-red-700"
                   >Approve</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row w-1/2 mx-auto px-auto gap-5">
     

        <button
          onClick={toggleApprove}
          className="mt-4 inline-block w-1/2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApprovalList;
