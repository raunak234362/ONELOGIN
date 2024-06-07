/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaBuilding, FaTasks, FaUserPlus, FaUsers } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Search } from "lucide-react";
import ProjectPie from "./ProjectPie";

const Project = () => {
  const [formData, setFormData] = useState({});
  const [projectData, setProjectData] = useState([]);
  const [formStep, setFormStep] = useState(0);

  const [popupRowIndex, setPopupRowIndex] = useState(-1);
  const [popupVisible, setPopupVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [modifyProject, setModifyProject] = useState({
    // name: '',
    // type: '',
    // assignedTo: '',
    // department: '',
    // status: '',
    // number: ''
  });
  const [totalproject, setTotalProject] = useState([]);
  const [formFabricators, setFormFabricators] = useState([]);
  const [formUserGroups, setFormUserGroups] = useState([]);
  const [teamLead, setTeamLead] = useState(null);
  const [teamLeadUsers, setTeamLeadUsers] = useState([]);
  const [modeler, setModeler] = useState(null);
  const [modelerUsers, setModelerUsers] = useState([]);
  const [checker, setChecker] = useState(null);
  const [checkerUsers, setCheckerUsers] = useState([]);
  const [detailer, setDetailer] = useState(null);
  const [detailerUsers, setDetailerUsers] = useState([]);
  const [erector, setErector] = useState(null);
  const [erectorUsers, setErectorUsers] = useState([]);

  const toggleForm = () => {
    setShowForm(!showForm);
    setFormStep(1);
    fetchFabricators();
    fetchUserGroups();
  };

  const toggleModify = (index) => {
    setPopupRowIndex(index);
    setPopupVisible(!popupVisible);
  };

  const handleModifyClick = async (index) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json"); // Add this line

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(modifyProject),
      redirect: "follow",
    };
    console.log(modifyProject);

    const response = await fetch(
      `https://wbt-onelogin.onrender.com/api/v1/project/${index}/update/`,
      requestOptions
    );
    console.log(index);
    const data = await response.json();
    setModifyProject(data?.data);
    console.log(data?.data);
    fetchProjectData();
  };

  const fetchUserGroups = async () => {
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
      "https://wbt-onelogin.onrender.com/api/v1/group/all/",
      requestOptions
    );

    const data = await response.json();
    const dataMapped = data?.data.map((item) => ({
      label: item.userGroupName,
      value: item._id,
    }));
    setFormUserGroups(dataMapped);
  };

  const fetchUserViaGroup = async (groupId, func) => {
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
      `https://wbt-onelogin.onrender.com/api/v1/user/all/${groupId}`,
      requestOptions
    );

    const data = await response.json();
    const dataMapped = data?.data.map((item) => ({
      label: item.name,
      value: item._id,
    }));
    func(dataMapped);
  };

  const fetchFabricators = async () => {
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
      "https://wbt-onelogin.onrender.com/api/v1/fabricator/all/",
      requestOptions
    );

    const data = await response.json();
    const dataMapped = data?.data.map((item) => ({
      label: item.name,
      value: item._id,
    }));
    setFormFabricators(dataMapped);
  };
  const fetchProjectData = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json"); // Add this line

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      "https://wbt-onelogin.onrender.com/api/v1/project/all/",
      requestOptions
    ).then(async (response) => {
      const data = await response.json();
      setProjectData(data?.data);
      setTotalProject(data?.data.length);
    });
  };

  const handleSubmit = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json"); // Add this line

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(formData),
      redirect: "follow",
    };

    const response = await fetch(
      "https://wbt-onelogin.onrender.com/api/v1/project/create/",
      requestOptions
    );
    const data = await response.json();
    setFormData(data?.data);
    console.log(data);
    fetchProjectData();
  };

  const StageInfo = ["IFA", "BFA", "RIFA", "RBFA", "IFC", "REV"];

  useEffect(() => {
    fetchProjectData();
  }, []);

  const projecttitles = ["IFA", "BFA", "R-IFA", "RBFA", "IFC", "REV"];

  return (
    <div className="project-container p-5">
      <div className="project-content">
        <div className="flex flex-row justify-around gap-2 mb-8">
          {/* Total Projects */}
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[25%]">
            <FaBuilding className="text-4xl text-gray-500 0 mb-2" />
            <h3 className="text-xl font-semibold text-gray-600">Projects</h3>
            <p className="text-3xl font-bold text-gray-800">{totalproject}</p>
          </div>

          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[25%]">
            <FaUserPlus className="text-4xl text-gray-500 mb-2" />
            <h3 className="text-xl font-semibold text-gray-600">
              Add New Project
            </h3>
            <button
              onClick={toggleForm}
              className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            >
              Add
            </button>
            {showForm && (
              <div className="absolute top-0 z-50 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="add-project w-1/2 mt-5 bg-white p-5 rounded-xl drop-shadow-md">
                  <h2 className="text-2xl font-bold mb-4">Add Project</h2>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 bg-slate-200 p-5 rounded-xl"
                  >
                    {formStep === 1 && (
                      <>
                        <div>
                          <label htmlFor="name" className="block font-bold">
                            Project Name:
                          </label>
                          <input
                            type="text"
                            id="name"
                            placeholder="Project Name"
                            value={formData?.name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              })
                            }
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div>
                          <label htmlFor="name" className="block font-bold">
                            Description:
                          </label>
                          <input
                            type="text"
                            id="description"
                            placeholder="description"
                            value={formData?.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div>
                          <label htmlFor="due date" className="block font-bold">
                            Due Date:
                          </label>
                          <input
                            type="date"
                            id="duedate"
                            value={formData?.dueDate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                dueDate: e.target.value,
                              })
                            }
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div>
                          <label htmlFor="due date" className="block font-bold">
                            Fabricator
                          </label>
                          <select
                            type="text"
                            id="fabricator"
                            value={formData?.fabricator}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                fabricator: e.target.value,
                              })
                            }
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          >
                            <option value="">Select Fabricator</option>
                            {formFabricators.map((item) => (
                              <option key={item.value} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}

                    {formStep === 2 && (
                      <div>
                        <div className="mt-3">
                          <label htmlFor="type" className="block font-bold">
                            Team Lead:
                          </label>

                          <div className="flex flex-row gap-4">
                            <select
                              type="text"
                              id="lead"
                              value={teamLead}
                              onChange={(e) => {
                                e.preventDefault();
                                setTeamLead(e.target.value);
                                fetchUserViaGroup(
                                  e.target.value,
                                  setTeamLeadUsers
                                );
                              }}
                              required
                              className=" w-1/3 mt-5 border border-gray-300 rounded-md px py-2"
                            >
                              <option value="">Select User Group</option>
                              {formUserGroups.map((item) => (
                                <option key={item.value} value={item.value}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                            {teamLead && (
                              <select
                                type="text"
                                id="type"
                                value={formData?.teamLeader}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    teamLeader: e.target.value,
                                  })
                                }
                                required
                                className=" w-2/3 mt-5 border border-gray-300 rounded-md px-3 py-2"
                              >
                                <option value="">Select User</option>
                                {teamLeadUsers?.map((item) => (
                                  <option key={item.value} value={item.value}>
                                    {item.label}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        </div>
                        <div className="mt-3">
                          <label htmlFor="type" className="block font-bold">
                            Modaler:
                          </label>

                          <div className="flex flex-row gap-4">
                            <select
                              type="text"
                              id="modaler"
                              value={modeler}
                              onChange={(e) => {
                                e.preventDefault();
                                setModeler(e.target.value);
                                fetchUserViaGroup(
                                  e.target.value,
                                  setModelerUsers
                                );
                              }}
                              required
                              className=" w-1/3 mt-5 border border-gray-300 rounded-md px py-2"
                            >
                              <option value="">Select User Group</option>
                              {formUserGroups.map((item) => (
                                <option key={item.value} value={item.value}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                            {modeler && (
                              <select
                                type="text"
                                id="type"
                                value={formData?.modeler}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    modeler: e.target.value,
                                  })
                                }
                                required
                                className=" w-2/3 mt-5 border border-gray-300 rounded-md px-3 py-2"
                              >
                                <option value="">Select User</option>
                                {modelerUsers?.map((item) => (
                                  <option key={item.value} value={item.value}>
                                    {item.label}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        </div>
                        <div className="mt-3">
                          <label htmlFor="type" className="block font-bold">
                            Checker:
                          </label>

                          <div className="flex flex-row gap-4">
                            <select
                              type="text"
                              id="checker"
                              value={checker}
                              onChange={(e) => {
                                e.preventDefault();
                                setChecker(e.target.value);
                                fetchUserViaGroup(
                                  e.target.value,
                                  setCheckerUsers
                                );
                              }}
                              required
                              className=" w-1/3 mt-5 border border-gray-300 rounded-md px py-2"
                            >
                              <option value="">Select User Group</option>
                              {formUserGroups.map((item) => (
                                <option key={item.value} value={item.value}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                            {checker && (
                              <select
                                type="text"
                                id="type"
                                value={formData?.checker}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    checker: e.target.value,
                                  })
                                }
                                required
                                className=" w-2/3 mt-5 border border-gray-300 rounded-md px-3 py-2"
                              >
                                <option value="">Select User</option>
                                {checkerUsers?.map((item) => (
                                  <option key={item.value} value={item.value}>
                                    {item.label}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        </div>
                        <div className="mt-3">
                          <label htmlFor="type" className="block font-bold">
                            Erecter:
                          </label>

                          <div className="flex flex-row gap-4">
                            <select
                              type="text"
                              id="erecter"
                              value={erector}
                              onChange={(e) => {
                                e.preventDefault();
                                setErector(e.target.value);
                                fetchUserViaGroup(
                                  e.target.value,
                                  setErectorUsers
                                );
                              }}
                              required
                              className=" w-1/3 mt-5 border border-gray-300 rounded-md px py-2"
                            >
                              <option value="">Select User Group</option>
                              {formUserGroups.map((item) => (
                                <option key={item.value} value={item.value}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                            {erector && (
                              <select
                                type="text"
                                id="type"
                                value={formData?.erector}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    erecter: e.target.value,
                                  })
                                }
                                required
                                className=" w-2/3 mt-5 border border-gray-300 rounded-md px-3 py-2"
                              >
                                <option value="">Select User</option>
                                {erectorUsers?.map((item) => (
                                  <option key={item.value} value={item.value}>
                                    {item.label}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        </div>
                        <div className="mt-3">
                          <label htmlFor="type" className="block font-bold">
                            Detailer:
                          </label>

                          <div className="flex flex-row gap-4">
                            <select
                              type="text"
                              id="detailer"
                              value={detailer}
                              onChange={(e) => {
                                e.preventDefault();
                                setDetailer(e.target.value);
                                fetchUserViaGroup(
                                  e.target.value,
                                  setDetailerUsers
                                );
                              }}
                              required
                              className=" w-1/3 mt-5 border border-gray-300 rounded-md px py-2"
                            >
                              <option value="">Select User Group</option>
                              {formUserGroups.map((item) => (
                                <option key={item.value} value={item.value}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                            {detailer && (
                              <select
                                type="text"
                                id="type"
                                value={formData?.detailer}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    detailer: e.target.value,
                                  })
                                }
                                required
                                className=" w-2/3 mt-5 border border-gray-300 rounded-md px-3 py-2"
                              >
                                <option value="">Select User</option>
                                {detailerUsers?.map((item) => (
                                  <option key={item.value} value={item.value}>
                                    {item.label}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {formStep === 3 && (
                      <div>
                        <div className="my-3">
                          <label htmlFor="type" className="block font-bold">
                            Modaler Timeline:
                          </label>
                          <div className="flex flex-row gap-4">
                            <div>
                              <label
                                htmlFor="MstartDate"
                                className="block font-bold"
                              >
                                Start Date:
                              </label>
                              <input
                                type="date"
                                id="Mstartdate"
                                value={formData?.modelerStart}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    modelerStart: e.target.value,
                                  })
                                }
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="due date"
                                className="block font-bold"
                              >
                                Due Date:
                              </label>
                              <input
                                type="date"
                                id="mduedate"
                                value={formData?.modelerEnd}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    modelerEnd: e.target.value,
                                  })
                                }
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="my-3">
                          <label htmlFor="type" className="block font-bold">
                            Checker:
                          </label>
                          <div className="flex flex-row gap-4">
                            <div>
                              <label
                                htmlFor="due date"
                                className="block font-bold"
                              >
                                Start Date:
                              </label>
                              <input
                                type="date"
                                id="cstartdate"
                                value={formData?.checkerStart}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    checkerStart: e.target.value,
                                  })
                                }
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="due date"
                                className="block font-bold"
                              >
                                Due Date:
                              </label>
                              <input
                                type="date"
                                id="cduedate"
                                value={formData?.checkerEnd}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    checkerEnd: e.target.value,
                                  })
                                }
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="my-3">
                          <label htmlFor="type" className="block font-bold">
                            Detailer:
                          </label>
                          <div className="flex flex-row gap-4">
                            <div>
                              <label
                                htmlFor="due date"
                                className="block font-bold"
                              >
                                Start Date:
                              </label>
                              <input
                                type="date"
                                id="dstartdate"
                                value={formData?.detailerStart}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    detailerStart: e.target.value,
                                  })
                                }
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="due date"
                                className="block font-bold"
                              >
                                Due Date:
                              </label>
                              <input
                                type="date"
                                id="dduedate"
                                value={formData?.detailerEnd}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    detailerEnd: e.target.value,
                                  })
                                }
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="my-3">
                          <label htmlFor="type" className="block font-bold">
                            Erecter:
                          </label>
                          <div className="flex flex-row gap-4">
                            <div>
                              <label
                                htmlFor="due date"
                                className="block font-bold"
                              >
                                Start Date:
                              </label>
                              <input
                                type="date"
                                id="estartdate"
                                value={formData?.erecterStart}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    erecterStart: e.target.value,
                                  })
                                }
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="due date"
                                className="block font-bold"
                              >
                                Due Date:
                              </label>
                              <input
                                type="date"
                                id="eduedate"
                                value={formData?.erecterEnd}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    erecterEnd: e.target.value,
                                  })
                                }
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-row gap-2 justify-center">
                      <button
                        type="submit"
                        className={`bg-green-400 w-full rounded-xl px-5 py-2 hover:bg-green-600 hover:text-white ${
                          formStep < 3 ? "" : "hidden"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (formStep === 1) {
                            setFormStep(2);
                          } else if (formStep === 2) {
                            setFormStep(3);
                          }
                        }}
                      >
                        Next
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

                  <button
                    type="submit"
                    className={`add-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full ${
                      formStep === 3 ? "" : "hidden"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-5 justify-center mb-6 rounded-xl">
          <h1 className="text-center text-2xl mb-4 font-semibold">Project</h1>
          <div className="flex flex-row justify-around gap-5 mb-8 overflow-x-auto w-full">
            {StageInfo?.map((item, index) => (
              <>
                <ProjectPie stage={item} />
              </>
            ))}
          </div>
        </div>

        <div className="active-proj bg-white p-5 rounded-xl drop-shadow-md">
          <h2 className="text-2xl font-bold mb-4">project</h2>
          <div className=" filter-box md:w-2/3 flex gap-4 mb-4">
            <div className="flex justify-between ">
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
          </div>
          <div className="overflow-y-auto h-80 table-container">
            <table className="w-full table-auto border-collapse text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-1 py-2">S.No</th>
                  <th className="px-4 py-2">Fabricator</th>
                  <th className="px-4 py-2">Project</th>
                  <th className="px-4 py-2">Team Lead</th>
                  <th className="px-1 py-2">Option</th>
                </tr>
              </thead>
              <tbody>
                {projectData &&
                  projectData.map((item, index) => (
                    <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                      <td className="px-1 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">
                        {item?.fabricator?.name}
                      </td>
                      <td className="px-4 py-2 border">{item?.name}</td>
                      <td className="px-4 py-2 border">
                        {item?.teamLeader?.name}
                      </td>

                      <td className="px-4 py-2 border">
                        <button
                          className="modify-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => toggleModify(index)}
                        >
                          Modify
                        </button>
                        {popupRowIndex === index && (
                          <div className="absolute top-0 z-50 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                            <div
                              className={`popup-menu absolute bg-white rounded-lg shadow-lg p-4 ${
                                popupVisible ? "visible" : "hidden"
                              }`}
                            >
                              <input
                                type="text"
                                placeholder="Project Name"
                                value={modifyProject?.name || item?.name}
                                disabled
                                onChange={(e) => {
                                  if (
                                    e.target.value?.trim() !== "" &&
                                    e.target.value !== undefined
                                  ) {
                                    setModifyProject({
                                      ...modifyProject,
                                      name: e.target.value,
                                    });
                                  }
                                }}
                                className="mb-2 border border-gray-300 rounded-md px-3 py-2 w-full"
                              />
                              <input
                                type="text"
                                placeholder="Project Description"
                                value={
                                  modifyProject?.description ||
                                  item?.description
                                }
                                onChange={(e) => {
                                  if (
                                    e.target.value?.trim() !== "" &&
                                    e.target.value !== undefined
                                  ) {
                                    setModifyProject({
                                      ...modifyProject,
                                      description: e.target.value,
                                    });
                                  }
                                }}
                                className="mb-2 border border-gray-300 rounded-md px-3 py-2 w-full"
                              />
                              <input
                                type="date"
                                value={
                                  modifyProject?.dueDate ||
                                  item?.dueDate?.substring(0, 10)
                                }
                                onChange={(e) => {
                                  if (
                                    e.target.value?.trim() !== "" &&
                                    e.target.value !== undefined
                                  ) {
                                    setModifyProject({
                                      ...modifyProject,
                                      dueDate: e.target.value,
                                    });
                                  }
                                }}
                                className="mb-2 border border-gray-300 rounded-md px-3 py-2 w-full"
                              />

                              <select
                                type="text"
                                value={modifyProject?.status || item?.status}
                                onChange={(e) => {
                                  if (
                                    e.target.value?.trim() !== "" &&
                                    e.target.value !== undefined
                                  ) {
                                    setModifyProject({
                                      ...modifyProject,
                                      status: e.target.value,
                                    });
                                  }
                                }}
                                required
                                className="mb-2 border border-gray-300 rounded-md px-3 py-2 w-full"
                              >
                                <option value="">Select Status</option>
                                <option value="ON-HOLD">On-Hold</option>
                                <option value="APPROVED">Approved</option>
                                <option value="COMPLETED">Completed</option>
                              </select>
                              <select
                                type="text"
                                value={modifyProject?.stage || item?.stage}
                                onChange={(e) => {
                                  if (
                                    e.target.value?.trim() !== "" &&
                                    e.target.value !== undefined
                                  ) {
                                    setModifyProject({
                                      ...modifyProject,
                                      stage: e.target.value,
                                    });
                                  }
                                }}
                                className="mb-2 border border-gray-300 rounded-md px-3 py-2 w-full"
                              >
                                <option value="">Stage</option>
                                <option value="IFA">IFA</option>
                                <option value="BFA">BFA</option>
                                <option value="RIFA">R-IFA</option>
                                <option value="RBFA">R-BFA</option>
                                <option value="IFC">IFC</option>
                                <option value="REV">REV</option>
                              </select>
                              <div className="flex flex-row gap-5">
                                <button
                                  type="submit"
                                  className="modify-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => handleModifyClick(item?._id)}
                                >
                                  Submit
                                </button>
                                <button
                                  className="modify-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => toggleModify()}
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
        </div>
      </div>
    </div>
  );
};
export default Project;
