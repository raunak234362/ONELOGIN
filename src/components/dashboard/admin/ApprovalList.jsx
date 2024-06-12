/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constant";

const ApprovalList = ({ toggleApprove }) => {
  const Priority = {
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Critical",
  };

  const [task, setTask] = useState();
  const [showTask, setShowTask] = useState(false);
  const [comment, setComment] = useState("");

  const toggleShowTask = (index) => {
    setShowTask(index);
  };

  const addComment = async (taskId) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ text: comment });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(requestOptions);

    await fetch(
      `${BASE_URL}/api/v1/task/${taskId}/addComment/`,
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

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
      `${BASE_URL}/api/v1/task/assign/all`,
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
      }),
    };

    const response = await fetch(
      `${BASE_URL}/api/v1/task/${taskId}/approve/`,
      requestOptions
    );
    const data = await response.json();
    // setTask(data?.assign?.assignedTo)
    await addComment(taskId);
    alert("Task Approved");
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
              task?.map((item, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  {/* <td className="py-2 px-4 border">
                    {item?.project?.fabricator?.name}
                  </td> */}

                  <td className="py-2 px-4 border">{item?.taskTitle}</td>
                  <td className="py-2 px-4 border">
                    {item?.teamLeader?.username}
                  </td>

                  <td className="py-2 px-4 border">{item?.status}</td>
                  <td className="py-2 px-4 border gap-2">
                    <button
                      onClick={() => toggleShowTask(index)}
                      className="mt-4 inline-block mx-auto w-[40%] bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                    >
                      View
                    </button>

                    {showTask === index && (
                      <div className="absolute top-0 z-50 left-0 w-full h-full bg-gray-900 bg-opacity-10 flex items-center justify-center">
                        <div
                          className={`popup-menu absolute w-1/2 h-1/2 bg-white rounded-lg shadow-lg p-4 ${
                            showTask === index ? "visible" : "hidden"
                          }`}
                        >
                          <div>
                            <h1 className=" text-2xl my-5 text-center text-gray-800 font-bold">
                              {item?.taskTitle}
                            </h1>
                            <h1 className="text-xl mb-5 text-left text-black font-bold">
                              Description:{" "}
                              <span className=" font-normal text-gray-800">
                                {item?.taskDescription}
                              </span>
                            </h1>
                            <h1 className="text-xl mb-5 text-left text-black font-bold">
                              Task Status:{" "}
                              <span className=" font-normal text-gray-800">
                                {item?.status}
                              </span>
                            </h1>
                            <h1 className="text-xl mb-5 text-left text-black font-bold">
                              Task Priority:{" "}
                              <span className=" font-normal text-gray-800">
                                {Priority[item?.priority]}
                              </span>
                            </h1>
                            <h1 className="text-xl mb-5 text-left text-black font-bold">
                              Assigned To:{" "}
                              <span className=" font-normal text-gray-800">
                                {item?.assignedTo?.username}
                              </span>
                            </h1>
                            <h1 className="text-xl mb-5 text-left text-black font-bold">
                              Assigned By:{" "}
                              <span className=" font-normal text-gray-800">
                                {item?.assignedBy?.username}
                              </span>
                            </h1>
                          </div>

                          <div className="flex mb-4">
                            <input
                              type="text"
                              placeholder="Comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="flex-grow px-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-800 mr-2"
                            />
                            {/* <button
                              onClick={async (e) => {
                                e.preventDefault();
                                await addComment(item?._id);
                              }}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Comment
                            </button> */}
                          </div>

                          <div className="flex flex-row gap-5 my-10">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                approveTask(item?.taskId, item?.assignId);
                              }}
                              className="mt-4 inline-block w-1/2 bg-green-500 text-center text-white py-2 px-4 rounded-lg hover:bg-red-700"
                            >
                              Approve
                            </button>
                            <button
                              className="mt-4 inline-block w-1/2 mx-auto bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                              onClick={() => toggleShowTask()}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row w-1/2 mx-auto px-auto gap-5">
        <button
          onClick={toggleApprove}
          className="mt-4 inline-block mx-auto w-1/2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApprovalList;
