/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2'
import { FaBuilding, FaPlusCircle, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ProjectPie from './ProjectPie'
import PriorityPie from './PriorityPie'
import StatusPie from './StatusPie'
import { BASE_URL } from '../../../constant'

const Dashboard = ({ totalUsers}) => {
  const [preDept, setPreDept] = useState([])
  const [projinfo, setProjInfo] = useState([])
  const [taskinfo, setTaskinfo] = useState([])
  const [info, setInfo] = useState([])
  const [totalUserGroup,setTotalUserGroup]=useState(0)
  const [totalTask, setTotalTask]=useState(0)
  const [popupRowIndex, setPopupRowIndex] = useState(-1)
  const [popupVisible, setPopupVisible] = useState(false)
  const [totalProject, setTotalProject]=useState(0)
  const [modifyProject, setModifyProject] = useState({
    name: '',
    type: '',
    assignedTo: '',
    department: '',
    status: ''
  })

  const handleModifyClick = index => {
    const projectData = info[index]
    setModifyProject({
      name: projectData.name,
      type: projectData.type,
      assignedTo: projectData.assignedTo,
      department: projectData.department,
      status: projectData.status
    })
    setPopupRowIndex(index)
    setPopupVisible(!popupVisible)
  }

  const fetchProject = async () => {
    const myHeaders = new Headers()
    myHeaders.append('authorization', `Bearer ${localStorage.getItem('access')}`)
    

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const response = await fetch(`${BASE_URL}/api/v1/project/all`,requestOptions)
      
        const data = await response.json()
        // console.log(data?.data)
        setProjInfo(data?.data)
        setTotalProject(data?.data.length)
      
  }

  const fetchTask = async () => {
    const myHeaders = new Headers()
    myHeaders.append('authorization', `Bearer ${localStorage.getItem('access')}`)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const response = await fetch(`${BASE_URL}/api/v1/task/all`,requestOptions)
      
        const data = await response.json()
        // console.log(data?.data)
        setTaskinfo(data?.data)
        setTotalTask(data?.data.length)
  }

  const fetchUserGroups = async () => {
    const myHeaders = new Headers()
    myHeaders.append('authorization', `Bearer ${localStorage.getItem('access')}`)
    

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    await fetch(
      `${BASE_URL}/api/v1/group/all/`,
      requestOptions
    )
      .then(async response => {
        const data = await response.json()
        setPreDept(data?.data)
        setTotalUserGroup(data?.data.length)
      })
      // .then(result => console.log(result))
      .catch(error => console.error(error))
  }

  const fetchUser = async () => {
    const myHeaders = new Headers()
    myHeaders.append('authorization', `Bearer ${localStorage.getItem('access')}`)
    

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const response = await fetch(`${BASE_URL}/api/v1/user/all`,  requestOptions)
      
        const data = await response.json()
        // console.log(data?.data)
        setInfo(data?.data)
        // setTotalUser()
      
  }

  useEffect(() => {
    fetchTask()
    fetchUserGroups()
    fetchUser()
    fetchProject()
  }, [])



  const FabricatorPieChart = ({ data }) => {
    const chartData = {
      labels: [
        'Fabricator-1',
        'Fabricator-2',
        'Fabricator-3',
        'Fabricator-4',
        'Fabricator-5'
      ],
      datasets: [
        {
          data: data,
          backgroundColor: [
            '#22c55e',
            '#f97316',
            '#FFCE56',
            '#b91c1c',
            '#2dd4bf'
          ],
          hoverBackgroundColor: [
            '#22c55e',
            '#f97316',
            '#FFCE56',
            '#b91c1c',
            '#2dd4bf'
          ]
        }
      ]
    }

    return (
      <div>
        <Pie data={chartData} />
        <h3 className='text-center mt-3 font-semibold mb-2'>Fabricator</h3>
      </div>
    )
  }

  const FabricatorpieData = [[10, 20, 30, 10, 15]]
  

  const StatusPieChart = ({ data }) => {
    const chartData = {
      labels: ['Completed', 'On-Hold', 'Approval'],
      datasets: [
        {
          data: data,
          backgroundColor: ['#22c55e', '#f97316', '#FFCE56'],
          hoverBackgroundColor: ['#22c55e', '#f97316', '#FFCE56']
        }
      ]
    }

    return (
      <div>
        <Pie data={chartData} />
        <h3 className='text-center mt-3 font-semibold mb-2'>Status</h3>
      </div>
    )
  }

  const StatuspieData = [[10, 20, 30]]

  const StageInfo = ['IFA', 'BFA', 'RIFA', 'RBFA', 'IFC', 'REV'];

  return (
    <div className='dashboard-container p-5'>
      <div className='dashboard-content'>
        <div className='flex flex-row justify-around gap-2 mb-8'>
          {/* Total Departments */}
          <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-1/4'>
            <FaBuilding className='text-4xl text-slate-400 0 mb-2' />
            <h3 className='text-xl font-semibold text-gray-600'>User Groups</h3>
            <p className='text-3xl font-bold text-slate-800'>
              {totalUserGroup}
            </p>
          </div>
          {/* Total Projects */}
          <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-1/4'>
            <FaBuilding className='text-4xl text-gray-500 0 mb-2' />
            <h3 className='text-xl font-semibold text-gray-600'>Projects</h3>
            <p className='text-3xl font-bold text-gray-800'>{totalProject}</p>
          </div>

          {/* Total Users in Departments */}
          <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-1/4'>
            <FaUsers className='text-4xl text-slate-400 mb-2' />
            <h3 className='text-xl font-semibold text-gray-600'>
              Total Users
            </h3>
            <p className='text-3xl font-bold text-gray-800'>{info.length}</p>
          </div>
          {/* Total tasks */}
          <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-1/4'>
            <FaUsers className='text-4xl text-gray-500 mb-2' />
            <h3 className='text-xl font-semibold text-gray-600'>Tasks</h3>
            <p className='text-3xl font-bold text-gray-800'>{totalTask}</p>
          </div>
        </div>

        <div className='bg-white p-5 justify-center mb-6 rounded-xl'>
          <h1 className='text-center text-2xl mb-4 font-semibold'>Project</h1>
          <div className='grid grid-cols-6 justify-around gap-5 mb-8 w-full'>
            {
              StageInfo?.map((item, index) => (
                <>
                  <ProjectPie stage={item} key={index}/>
                </>
              ))
            }
          </div>
        </div>

        <div className='bg-white p-5 flex flex-col justify-center mb-6 rounded-xl'>
          <h1 className='text-center text-2xl mb-5 font-semibold'>Task</h1>
          <div className='flex flex-row gap-9 mb-8 w-[100%] justify-center mx-0'>
            {/* <div className="bg-white rounded-xl p-5 shadow-xl shadow-green-200">
            <FabricatorPieChart data={FabricatorpieData[0]} />
            </div> */}
            <div className="bg-white rounded-xl p-5 shadow-xl shadow-green-200">
              <PriorityPie />
            </div>
            <div className="bg-white rounded-xl p-5 shadow-xl shadow-green-200">
            <StatusPie />
            </div>
          </div>
        </div>

        {/* <div className='active-proj bg-white p-5 rounded-xl drop-shadow-md'>
          <h2 className='text-2xl font-bold mb-4'>Project</h2>
          <div className='overflow-y-auto h-80 table-container'>
            <table className='border-collapse w-full table-auto'>
              <thead>
                <tr className='bg-green-200'>
                  <th className='px-4 py-2'>S.No</th>
                  <th className='px-4 py-2'>Fabricator</th>
                  <th className='px-4 py-2'>Project</th>
                  <th className='px-4 py-2'>Team Lead</th>
                  <th className='px-4 py-2'>Option</th>
                </tr>
              </thead>
              <tbody>
                {projinfo &&
                  projinfo.map((item, index) => (
                    <tr
                      key={index}
                      className='bg-gray-100 hover:bg-gray-200 text-center'
                    >
                      <td className='px-4 py-2 border'>{index + 1}</td>
                      <td className='px-4 py-2 border'>{item?.number}</td>
                      <td className='px-4 py-2 border'>{item?.name}</td>
                      <td className='px-4 py-2 border'>
                        {item?.department?.symbol}
                      </td>
                      <td className='px-4 py-2 border'>
                        <button
                          className='modify-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                          onClick={() => handleModifyClick(index)}
                        >
                          Modify
                        </button>
                        {popupRowIndex === index && (
                          <div
                            className={`popup-menu absolute bg-white rounded-lg shadow-lg p-4 ${
                              popupVisible ? 'visible' : 'hidden'
                            }`}
                          >
                            <input
                              type='text'
                              placeholder='Project Name'
                              value={modifyProject.name}
                              onChange={e =>
                                setModifyProject({
                                  ...modifyProject,
                                  name: e.target.value
                                })
                              }
                              className='mb-2 border border-gray-300 rounded-md px-3 py-2 w-full'
                            />
                            <select
                              type='text'
                              value={modifyProject.type}
                              onChange={e =>
                                setModifyProject({
                                  ...modifyProject,
                                  type: e.target.value
                                })
                              }
                              required
                              className='mb-2 border border-gray-300 rounded-md px-3 py-2 w-full'
                            >
                              <option value=''>Type</option>
                              <option value='TEAM'>TEAM</option>
                              <option value='INDIVIDUAL'>INDIVIDUAL</option>
                            </select>

                            <select
                              type='text'
                              value={modifyProject.assignedTo}
                              onChange={e =>
                                setModifyProject({
                                  ...modifyProject,
                                  assignedTo: e.target.value
                                })
                              }
                              required
                              className='mb-2 border border-gray-300 rounded-md px-3 py-2 w-full'
                            >
                              <option value=''>Assigned To</option>
                              {info &&
                                info.map((item, index) => (
                                  <option value={item?.username} key={index}>
                                    {item?.username}
                                  </option>
                                ))}
                            </select>

                            <select
                              type='text'
                              value={modifyProject.department}
                              onChange={e =>
                                setModifyProject({
                                  ...modifyProject,
                                  department: e.target.value
                                })
                              }
                              required
                              className='mb-2 border border-gray-300 rounded-md px-3 py-2 w-full'
                            >
                              <option value=''>Select Department</option>
                              {preDept &&
                                preDept.map((item, index) => (
                                  <option value={item.symbol} key={index}>
                                    {item.symbol}
                                  </option>
                                ))}
                            </select>
                            <select
                              type='text'
                              value={modifyProject.status}
                              onChange={e =>
                                setModifyProject({
                                  ...modifyProject,
                                  status: e.target.value
                                })
                              }
                              className='mb-2 border border-gray-300 rounded-md px-3 py-2 w-full'
                            >
                              <option value=''>Status</option>
                              <option value='Active'>Active</option>
                              <option value='In-Active'>In-Active</option>
                              <option value='Completed'>Completed</option>
                            </select>
                            <button
                              type='submit'
                              className='modify-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                              onClick={async e => {
                                e.preventDefault()
                                const myHeaders = new Headers()
                                myHeaders.append(
                                  'Content-Type',
                                  'application/json'
                                )
                                myHeaders.append(
                                  'authorization',
                                  `Bearer ${localStorage.getItem('token')}`
                                )
                                myHeaders.append(
                                  'Cookie',
                                  `token=${localStorage.getItem('token')}`
                                )
                                const raw = JSON.stringify({
                                  name: name,
                                  type: type,
                                  assignedTo: assignedTo,
                                  status: status,
                                  department: department
                                })

                                const requestOptions = {
                                  method: 'PUT',
                                  headers: myHeaders,
                                  body: raw,
                                  redirect: 'follow'
                                }
                                console.log(
                                  name,
                                  department,
                                  type,
                                  status,
                                  assignedTo
                                )
                                fetch(
                                  `https://wbt-projecttimeline.onrender.com/api/project/${modifyProject.department}`,
                                  requestOptions
                                )
                                  .then(response => response.text())
                                  .then(result => console.log(result))
                                  .catch(error => console.error(error))
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div> */}

        {/* <div className='active-task mt-8 bg-white px-5 py-5 rounded-xl drop-shadow-md'>
          <h2 className='text-2xl font-bold mb-4'>Task</h2>
          <div className='overflow-y-auto h-80 table-container'>
            <table className='w-full table-auto border-collapse'>
              <thead>
                <tr className='bg-green-200'>
                  <th className='px-4 py-2'>S.No</th>
                  <th className='px-4 py-2'>Project</th>
                  <th className='px-4 py-2'>Title</th>
                  <th className='px-4 py-2'>User</th>
                  <th className='px-4 py-2'>More</th>
                </tr>
              </thead>
              <tbody>
                {taskinfo &&
                  taskinfo.map((item, index) => (
                    <tr
                      key={index}
                      className='bg-gray-100 hover:bg-gray-200 text-center'
                    >
                      <td className='px-4 py-2 border'>{index + 1}</td>
                      <td className='px-4 py-2 border'>
                        {item?.project?.number}
                      </td>
                      <td className='px-4 py-2 border'>{item?.title}</td>
                      <td className='px-4 py-2 border'>
                        {item?.currentUser?.username}
                      </td>
                      <td className='px-4 py-2 border'>
                        <button
                          className='modify-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                          onClick={() => handleModifyClick(index)}
                        >
                          Modify
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Dashboard
