/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { FaBuilding, FaTasks, FaUserPlus, FaUsers } from 'react-icons/fa'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Search } from 'lucide-react'

const Project = () => {
  const [formData, setFormData] = useState({})
  const [projectData,setProjectData]=useState([])
  const [formStep, setFormStep] = useState(0);

  const [popupRowIndex, setPopupRowIndex] = useState(-1)
  const [popupVisible, setPopupVisible] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [modifyProject, setModifyProject] = useState({
    name: '',
    type: '',
    assignedTo: '',
    department: '',
    status: '',
    number: ''
  })
  const [totalproject, setTotalProject]=useState([])
  const [formFabricators, setFormFabricators] = useState([])
  const [formUserGroups, setFormUserGroups] = useState([])
  const [teamLead, setTeamLead] = useState(null)
  const [teamLeadUsers, setTeamLeadUsers] = useState([])
  const [modeler, setModeler] = useState(null)
  const [modelerUsers, setModelerUsers] = useState([])
  const [checker, setChecker] = useState(null)
  const [checkerUsers, setCheckerUsers] = useState([])
  const [detailer, setDetailer] = useState(null)
  const [detailerUsers, setDetailerUsers] = useState([])
  const [erector, setErector] = useState(null)
  const [erectorUsers, setErectorUsers] = useState([])


  const toggleForm = () => {
    setShowForm(!showForm);
    setFormStep(1);
    fetchFabricators();
    fetchUserGroups();
  }

  const handleModifyClick = index => {
    // const projectData = formData.projinfoinfo[index]
    // setModifyProject({
    //   name: projectData.name,
    //   type: projectData.type,
    //   assignedTo: projectData.assignedTo,
    //   department: projectData.department,
    //   status: projectData.status,
    //   number: projectData.number
    // })
    // setPopupRowIndex(index)
    // setPopupVisible(!popupVisible)
  }

  const fetchUserGroups = async() => {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('access')}`)
    

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const response = await fetch(
      'https://wbt-onelogin.onrender.com/api/v1/group/all/',
      requestOptions
    )

    const data = await response.json();
    const dataMapped = data?.data.map(item => ({label: item.userGroupName, value: item._id}))
    setFormUserGroups(dataMapped)
  }

  const fetchUserViaGroup = async(groupId, func) => {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('access')}`)
    

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const response = await fetch(
      `https://wbt-onelogin.onrender.com/api/v1/user/all/${groupId}`,
      requestOptions
    )

    const data = await response.json();
    const dataMapped = data?.data.map(item => ({label: item.name, value: item._id}))
    func(dataMapped);
  }


  const fetchFabricators = async() => {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('access')}`)
    

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const response = await fetch(
      'https://wbt-onelogin.onrender.com/api/v1/fabricator/all/',
      requestOptions
    )

    const data = await response.json();
    const dataMapped = data?.data.map(item => ({label: item.name, value: item._id}))
    setFormFabricators(dataMapped)
  }
  const fetchProjectData = async () =>{
    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('access')}`)
    myHeaders.append('Content-Type', 'application/json') // Add this line
    

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const response = await fetch(
      'https://wbt-onelogin.onrender.com/api/v1/project/all/',
      requestOptions
    )
    .then(async response => {
      const data = await response.json()
      setProjectData(data?.data)
      setTotalProject(data?.data.length)
      
    })
    
  }

  const handleSubmit = async () => {

    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('access')}`)
    myHeaders.append('Content-Type', 'application/json') // Add this line
    

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(formData),
      redirect: 'follow'
    }

    const response = await fetch(
      'https://wbt-onelogin.onrender.com/api/v1/project/create/',
      requestOptions
    )

    const data = await response.json();
    console.log(data)
  }

  const ProjectPieChart = ({ data, title }) => {
    const chartData = {
      labels: ['Completed', 'Approved', 'On-Hold'],
      datasets: [
        {
          data: data,
          backgroundColor: ['#15803d', '#f97316', '#fbbf24'],
          hoverBackgroundColor: ['#15803d', '#f97316', '#fbbf24']
        }
      ]
    }

    return (
      <div>
        <Pie data={chartData} />
        <h3 className='text-center mt-3 font-semibold mb-2'>{title}</h3>
      </div>
    )
  }
  useEffect(()=>{
    fetchProjectData()
  },[])

  // const ProjectpieData = [
  //   [10, 20, 30],
  //   [15, 25, 35],
  //   [20, 30, 40],
  //   [25, 35, 45],
  //   [30, 40, 50],
  //   [35, 45, 55]
  // ]
  // const projecttitles = ['IFA', 'BFA', 'R-IFA', 'BFA', 'IFC', 'REV']

  return (
    <div className='project-container p-5'>
      <div className='project-content'>
        <div className='flex flex-row justify-start gap-2 mb-8'>
          {/* Total Projects */}
          <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[25%]'>
            <FaBuilding className='text-4xl text-gray-500 0 mb-2' />
            <h3 className='text-xl font-semibold text-gray-600'>Projects</h3>
            <p className='text-3xl font-bold text-gray-800'>{totalproject}</p>
          </div>

          
        </div>
{/* 
        <div className='bg-white p-5 justify-center mb-6 rounded-xl'>
          <h1 className='text-center text-2xl mb-4 font-semibold'>Project</h1>
          <div className='flex flex-row justify-around gap-5 mb-8 overflow-x-auto w-full'>
            {ProjectpieData.map((data, index) => (
              <div
                key={index}
                className='bg-white p-5 rounded-xl shadow-xl shadow-green-200 w-60 mb-0'
              >
                <ProjectPieChart data={data} title={projecttitles[index]} />
              </div>
            ))}
          </div>
        </div> */}

        <div className='active-proj bg-white p-5 rounded-xl drop-shadow-md'>
          <h2 className='text-2xl font-bold mb-4'>project</h2>
          <div className=' filter-box md:w-2/3 flex gap-4 mb-4'>
            <div className='flex justify-between '>
              <div className='flex flex-row gap-3'>
                <select
                  type='text'
                  id='department'
                  // value={dropDept}
                  // onChange={async e => {
                  //   await setDropDept(e.target.value)
                  // }}
                  // required
                  className='border border-gray-300 rounded-md px-3 py-2'
                >
                  <option value=''>Select Fabricator</option>
                  <option value=''>Fabricator-1</option>
                  <option value=''>Fabricator-2</option>
                  <option value=''>Fabricator-3</option>
                  <option value=''>Fabricator-4</option>
                </select>
                <div>
                  <button
                    // onClick={async e => {
                    //   e.preventDefault()
                    //   await fetchFilterData()
                    // }}
                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                  >
                    <Search />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='overflow-y-auto h-80 table-container'>
            <table className='w-full table-auto border-collapse text-center'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='px-1 py-2'>S.No</th>
                  <th className='px-4 py-2'>Fabricator</th>
                  <th className='px-4 py-2'>Project</th>
                  <th className='px-4 py-2'>Team Lead</th>
                  <th className='px-1 py-2'>Option</th>
                </tr>
              </thead>
              <tbody>
                {projectData &&
                  projectData.map((item, index) => (
                    <tr key={index} className='bg-gray-100 hover:bg-gray-200'>
                      <td className='px-1 py-2 border'>{index + 1}</td>
                      <td className='px-4 py-2 border'>{item?.fabricator?.name}</td>
                      <td className='px-4 py-2 border'>{item?.name}</td>
                      <td className='px-4 py-2 border'>{item?.teamLeader?.name}</td>
                     
                      <td className='px-4 py-2 border'>
                        <button
                          className='modify-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                          // onClick={() => handleModifyClick(index)}
                        >
                          Open
                        </button>
                        
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Project
