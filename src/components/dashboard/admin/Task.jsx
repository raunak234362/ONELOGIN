/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FaTasks, FaUserPlus, FaUsers } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import ApprovalList from "./ApprovalList";

const Task = ({ totalActiveTask }) => {
  const [addTask, setAddTask] = useState({});
  const [totaltask, setTotalTask] = useState([]);
  const [taskinfo, setTaskinfo] = useState([]);
  const [taskId, setTaskId] = useState();
  const [projInfo, setProjInfo] = useState([]);
  const [users, setUsers] = useState([]);
  const [usertask, setUserTask] = useState({});
  const [assignedUser, setAssignedUser] = useState([]);
  const [popupRowIndex, setPopupRowIndex] = useState(-1);
  const [popupVisible, setPopupVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showUserTask, setShowUserTask] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [newComment, setNewComment] = useState("NEW COMMENT ");
  const [comment, setComment] = useState("");
  const [modifyTask, setModifyTask] = useState({});
  const [approval, setApproval] = useState(0);
  const [showApprove, setShowApprove] = useState(false);
  const [remainTask, setRemainTask] = useState()

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const toggleTask = () => {
    setShowTask(!showTask);
  };
  const toggleApprove = () => {
    setShowApprove(!showApprove);
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
      "https://wbt-onelogin.onrender.com/api/v1/task/assign/all",
      requestOptions
    );
    const data = await response.json();
    setRemainTask(data?.data?.length);
    console.log(data?.data);
  };


  const fetchTaskData = async () => {
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

    await fetch(
      "https://wbt-onelogin.onrender.com/api/v1/task/all",
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        setTaskinfo(data?.data);
        setTotalTask(data?.data.length);
      })
      .catch((error) => console.error(error));
  };

  const fetchUserTask = async () => {
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

    await fetch(
      "https://wbt-onelogin.onrender.com/api/v1/task/",
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        setUserTask(data?.data);
        setTaskId(data?.data?._id);
        console.log(data?.data?._id);
      })
      .catch((error) => console.error(error));
  };

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
      "https://wbt-onelogin.onrender.com/api/v1/project/all/",
      requestOptions
    );
    const data = await response.json();
    setProjInfo(data?.data);
    console.log(data);
  };

  const fetchUsers = async () => {
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
      "https://wbt-onelogin.onrender.com/api/v1/user/all/",
      requestOptions
    );

    const data = await response.json();
    setUsers(data?.data);
  };

  const handleAssign = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      assignedUser: assignedTo,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    console.log(requestOptions);

    const response = await fetch(
      `https://wbt-onelogin.onrender.com/api/v1/task/${taskId}/assign/`,
      requestOptions
    );

    const data = await response.json();
    setUserTask((prevState) => ({
      ...prevState,
      assign: [...prevState.assign],
    }));
    alert("Assigned Successfully, waiting for approval");
    await fetchTask();
    await fetchUserTask();
  };

  const pastComment = async () => {
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

    await fetch(
      `https://wbt-onelogin.onrender.com/api/v1/task/${taskId}/comments/`,
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        setComment(data?.data);
      })
      .catch((error) => console.error(error));
  };

  const addComment = async (taskId) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ text: newComment });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(requestOptions);

    await fetch(
      `https://wbt-onelogin.onrender.com/api/v1/task/${taskId}/addComment/`,
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        setNewComment("");
        await fetchUserTask();
      })
      .catch((error) => console.error(error));
  };

  const handleModifyClick = (index) => {
    const projectData = taskinfo[index];
    setModifyTask({
      name: projectData.name,
      type: projectData.type,
      assignedTo: projectData.assignedTo,
      department: projectData.department,
      status: projectData.status,
    });
    setPopupRowIndex(index);
    setPopupVisible(!popupVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append(
      "authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(addTask),
      redirect: "follow",
      
    };
    console.log(requestOptions);
    console.log(addTask)

    const response = await fetch( `https://wbt-onelogin.onrender.com/api/v1/task/create`, requestOptions);
    const data = await response.json();
    // setAddTask(data?.data);
    console.log(response);

  };

  

  useEffect(() => {
    fetchTaskData();
    fetchUserTask();
    fetchProject();
    fetchTask();
    fetchUsers();
  }, []);

  return (
    <div className="p-5">
      <div className="flex flex-row justify-around gap-2 mb-8">
       
        {/* Total Verified Users */}
        <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[25%]">
          <FaTasks className="text-4xl text-gray-500 mb-2" />
          <h3 className="text-xl text-center font-semibold text-gray-600">
            Total Active Tasks
          </h3>
          <p className="text-3xl font-bold text-gray-800">{totaltask}</p>
        </div>

        {/* Approve Assign */}
        <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[25%]">
          <MdOutlinePendingActions className="text-4xl text-gray-500 mb-2" />
          <h3 className="text-xl text-center font-semibold text-gray-600">
            Approval Remaining
          </h3>
          <p className="text-3xl font-bold text-gray-800">{remainTask}</p>
          
        </div>
        {/* Approval List */}
        <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[25%]">
          <MdOutlinePendingActions className="text-4xl text-gray-500 mb-2" />
          <h3 className="text-xl text-center font-semibold text-gray-600">
            Approval List
          </h3>
          <button
          onClick={toggleApprove}
          className="mt-4 inline-block bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >Show</button>
          {showApprove && (
            <div className="absolute top-0 z-50 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <ApprovalList toggleApprove={toggleApprove}/>
              </div>
              )}
        </div>
        {/* My Task */}
        <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[25%]">
          <FaTasks className="text-4xl text-slate-400 mb-2" />
          <h3 className="text-xl font-semibold text-gray-600">My Task</h3>
          <button
            onClick={toggleTask}
            className="mt-4 inline-block bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Open
          </button>
          {showTask && (
            <div className="absolute top-0 z-50 left-0 w-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white overflow-y-auto rounded-lg h-screen shadow-md p-6 w-[60%]">
                <div className="flex flex-row justify-between mb-4">
                  <h1 className=" text-2xl font-bold bg-green-500 text-white rounded-xl px-3 py-1">
                    My Task
                  </h1>
                  <div>
                    <button
                      type="button"
                      onClick={toggleTask}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {usertask?.title}
                  </h2>
                </div>

                <p className="text-gray-700 mb-4 bg-gray-100 p-4 rounded-lg">
                  {usertask?.description}
                </p>

                <div className="flex justify-between mb-4">
                  <div className="flex items-center">
                    <p className="text-gray-600 mr-2">Priority:</p>
                    <span
                      className={`px-2 py-1 rounded-full font-bold text-white ${
                        usertask?.priority >= 4
                          ? "bg-red-400"
                          : usertask?.priority === 3
                          ? " bg-sky-500"
                          : usertask?.priority === 2
                          ? " bg-sky-300"
                          : " bg-gray-400"
                      }`}
                    >
                      {usertask?.priority >= 4
                        ? "HIGHEST"
                        : usertask?.priority == 3
                        ? "HIGH"
                        : usertask?.priority == 2
                        ? "MEDIUM"
                        : "LOW"}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Due Date:{" "}
                    <strong className="text-gray-800">
                      {usertask?.dueDate?.substring(0, 10)}
                    </strong>
                  </p>
                </div>

                <div className="mb-5 bg-gray-200 p-5 rounded-xl">
                  <h4 className="text-lg font-bold text-gray-800 mb-5 bg-white p-2 rounded-lg">
                    People Assigned
                  </h4>
                  <ul className="list-disc list-inside bg-gray-400 p-5 rounded-xl">
                    {usertask?.assign?.map(
                      (assign, index) =>
                        assign?.approved && (
                          <li
                            key={index}
                            className="flex items-center mb-2 bg-gray-100 p-4 rounded-lg"
                          >
                            <CgProfile className="text-gray-500 mr-2" />
                            <div>
                              <p className="text-gray-600">
                                Assigned By{" "}
                                <strong className="text-gray-800">
                                  {assign?.assignedBy?.name}
                                </strong>
                              </p>
                              <p className="text-gray-600">
                                Assigned To{" "}
                                <strong className="text-gray-800">
                                  {assign?.assignedTo?.name}
                                </strong>
                              </p>
                            </div>
                          </li>
                        )
                    )}
                  </ul>
                  <div className="mt-4">
                    <div>
                      <label
                        htmlFor="assignedTo"
                        className="block font-bold mb-2"
                      >
                        Assigned To:
                      </label>
                      <select
                        type="text"
                        id="assignedTo"
                        value={assignedTo}
                        onChange={(e) =>
                          setAssignedTo(e.target.value)
                        }
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                      >
                        <option value="">AssignedTo</option>
                        {users &&
                          users.map((item, index) => (
                            <option value={item?._id} key={index}>
                              {item?.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        await handleAssign();
                      }}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                    >
                      Assign
                    </button>
                  </div>
                </div>

                <div className="bg-gray-200 p-5 rounded-xl">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 bg-gray-100 p-2 rounded-lg">
                    Comments
                  </h4>
                  <div className="flex mb-4">
                    <input
                      type="text"
                      placeholder="Comment"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-800 mr-2"
                    />
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        await addComment(usertask?._id);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Comment
                    </button>
                  </div>
                  <ul className="list-disc list-inside">
                    {usertask?.comments?.map((comment, index) => (
                      <li
                        key={index}
                        className="mb-2 bg-gray-100 p-4 rounded-lg"
                      >
                        <div className="text-gray-600">
                          By{" "}
                          <strong className="text-gray-800">
                            {comment?.commentedBy?.username}
                          </strong>
                        </div>
                        <div className="text-gray-700">:- {comment?.text}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
         
        </div>
        {/* Add New Task */}
        <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[25%]">
          <FaUserPlus className="text-4xl text-gray-500 mb-2" />
          <h3 className="text-xl font-semibold text-gray-600">Add New Task</h3>
          <button
            onClick={toggleForm}
            className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Add
          </button>
          {showForm && (
            <div className="absolute top-0 z-50 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center ">
              <div className="bg-white p-6 rounded-lg shadow-md w-[50%]">
                <h2 className="text-2xl font-bold mb-4">Add Task</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="assignedTo"
                      className="block font-bold mb-2"
                    >
                      Select Project:
                    </label>
                    <select
                      type="text"
                      id="selectproject"
                      value={addTask?.project}
                      onChange={(e) =>
                        setAddTask({ ...addTask, project: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    >
                      <option value="">Select Project</option>
                      {projInfo &&
                        projInfo.map((item, index) => (
                          <option value={item?._id} key={index}>
                            {item?.name}{item?.number}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="title" className="block font-bold mb-2">
                      Title:
                    </label>
                    <input
                      type="text"
                      id="title"
                      placeholder="Task Title"
                      value={addTask?.title}
                      onChange={(e) =>
                        setAddTask({ ...addTask, title: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="priority" className="block font-bold mb-2">
                      Priority:
                    </label>
                    <select
                      type="text"
                      id="priority"
                      value={addTask?.priority}
                      onChange={(e) =>
                        setAddTask({ ...addTask, priority: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    >
                      <option value="">Select Priority</option>
                      <option value="4">Highest</option>
                      <option value="3">High</option>
                      <option value="2">Medium</option>
                      <option value="1">Low</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="assignedTo"
                      className="block font-bold mb-2"
                    >
                      Assigned To:
                    </label>
                    <select
                      type="text"
                      id="assignedTo"
                      value={addTask?.assignedUser}
                      onChange={(e) =>
                        setAddTask({ ...addTask, assignedUser: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    >
                      <option value="">AssignedTo</option>
                      {users &&
                        users.map((item, index) => (
                          <option value={item?._id} key={index}>
                            {item?.username}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dueDate" className="block font-bold mb-2">
                      Start Date:
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={addTask?.startDate}
                      onChange={(e) =>
                        setAddTask({ ...addTask, startDate: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="dueDate" className="block font-bold mb-2">
                      Due Date:
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      value={addTask?.dueDate}
                      onChange={(e) =>
                        setAddTask({ ...addTask, dueDate: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block font-bold mb-2"
                    >
                      Description:
                    </label>
                    <input
                      type="text"
                      id="description"
                      placeholder="Task Description"
                      value={addTask?.description}
                      onChange={(e) =>
                        setAddTask({ ...addTask, description: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex flex-row gap-3">
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold w-full py-2 px-4 rounded"
                    >
                      Add Task
                    </button>
                    <button
                      type="button"
                      onClick={toggleForm}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl drop-shadow-md">
        <h2 className="text-2xl font-bold mb-4">Task</h2>
        <div className="flex justify-between mb-5">
          <div className="flex flex-row gap-3">
            <select
              type="text"
              id="department"
              // value={dropDept}
              // onChange={async e => {
              //   await setDropDept(e.target.value)
              // }}
              // required
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Fabricator</option>
              <option value="">Fabricator-1</option>
              <option value="">Fabricator-2</option>
              <option value="">Fabricator-3</option>
              <option value="">Fabricator-4</option>
            </select>
            <select
              type="text"
              id="department"
              // value={dropDept}
              // onChange={async e => {
              //   await setDropDept(e.target.value)
              // }}
              // required
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Project</option>
              <option value="">Project-1</option>
              <option value="">Project-2</option>
              <option value="">Project-3</option>
              <option value="">Project-4</option>
            </select>
            <div>
              <button
                // onClick={async e => {
                //   e.preventDefault()
                //   await fetchFilterData()
                // }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                <Search />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto h-80 table-container">
          <table className="w-full table-auto border-collapse text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-1 px-4 border">S.No</th>
                <th className="py-2 px-4 border">Fabricator</th>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Project</th>
                <th className="py-2 px-4 border">Team Lead</th>
                <th className="py-1 px-4 border">Option</th>
              </tr>
            </thead>
            <tbody>
              {taskinfo &&
                taskinfo.map((item, index) => (
                  <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">
                      {item?.project?.fabricator?.name}
                    </td>
                    <td className="py-2 px-4 border">{item?.title}</td>
                    <td className="py-2 px-4 border">{item?.project?.name}</td>
                    <td className="py-2 px-4 border">
                      {item?.currentUser?.username}
                    </td>
                    <td className="py-2 px-4 border">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleModifyClick(index)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Task;
