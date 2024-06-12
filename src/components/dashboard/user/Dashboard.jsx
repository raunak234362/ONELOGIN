/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { FaUserPlus, FaUsers } from 'react-icons/fa'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { BASE_URL } from '../../../constant'

ChartJS.register(ArcElement, Tooltip, Legend)

const User = () => {
  const [user, setUser] = useState({})
  const [userGroup, setUserGroup] = useState('')
  const [dropDept, setDropDept] = useState(null)
  const [dropType, setDropType] = useState(null)
  const [popupVisible, setPopupVisible] = useState(false)
  const [popupRowIndex, setPopupRowIndex] = useState(-1)
  const [firstform, setFirstForm] = useState(false)
  const [secondform, setSecondForm] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [userdata, setUserData] = useState([])
  const [totalusers,setTotalUser]=useState([])
  const [totalverifieduser,setTotalVerifiedUser]=useState([])

  const [extraField, setExtraField] = useState([])

  const [formUserGroup, setformUserGroup] = useState([])

  const toggleForm = async () => {
    setShowForm(!showForm)
    setFirstForm(true)
    setSecondForm(false)
    const myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('access')}`
    )

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const response = await fetch(
      `${BASE_URL}/api/v1/group/all/`,
      requestOptions
    )

    const data = await response.json()

    setformUserGroup(data?.data)
  }

  const fetchData = async () => {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('access')}`)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    await fetch(`${BASE_URL}/api/v1/user/all/`, requestOptions)
    .then(async response => {
      const data = await response.json()
      console.log(data)
      setUserData(data?.data)
      setTotalUser(data?.data.length)
      setTotalVerifiedUser(Math.round(data?.data.reduce((acc, item) => (item?.verified)?  acc +1: acc, 0)))
    })
    .then(result => console.log(result))
    .catch(error => console.error(error))
  }

  const fetchField = async () => {
    const myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('access')}`
    )

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const response = await fetch(
      `${BASE_URL}/api/v1/group/${userGroup}`,
      requestOptions
    )

    const data = await response.json()

    setExtraField(data?.data?.userGroupSchema)

    console.log(extraField)
  }

  const handleSubmit = async () => {

    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('access')}`)
    myHeaders.append('Content-Type', 'application/json') // Add this line

    const rawData = JSON.stringify({
      ...user
    });
    

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: rawData,
      redirect: 'follow'
    }

    const response = await fetch(`${BASE_URL}/api/v1/user/regsiter/${userGroup}`, requestOptions)
    const data = await response.json()
    console.log(data)
    fetchData();
  }

  const fetchFilterData = async () => {
    const myHeaders = new Headers()
    myHeaders.append('authorization', `Bearer ${localStorage.getItem('token')}`)
    myHeaders.append('Cookie', `token=${localStorage.getItem('token')}`)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    let URI = `${BASE_URL}/api/user/all`
    if (
      dropDept &&
      dropType &&
      dropDept?.trim()?.length !== 0 &&
      dropType?.trim()?.length !== 0
    ) {
      URI = `${BASE_URL}/api/user/all?department=${dropDept}&type=${dropType}`
    } else if (dropDept && dropDept?.trim()?.length !== 0) {
      URI = `${BASE_URL}/api/user/all?department=${dropDept}`
    } else if (dropType && dropType?.trim()?.length !== 0) {
      URI = `${BASE_URL}/api/user/all?type=${dropType}`
    } else {
      URI = `${BASE_URL}/api/user/all`
    }

    console.log(URI)

    await fetch(URI, requestOptions)
      .then(async response => {
        const data = await response.json()
        console.log(data?.data)
        // setInfo(data?.data)
      })
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    fetchFilterData(),
    fetchData()
  }, [])

  return (
    <div className='user-container p-5'>
      <div className='flex flex-row justify-around gap-2 mb-8'>
        <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[25%]'>
          <FaUsers className='text-4xl text-slate-400 mb-2' />
          <h3 className='text-xl font-semibold text-gray-600'>Total Users</h3>
          <p className='text-3xl font-bold text-slate-800'>{totalusers}</p>
        </div>
        {/* Total Verified Users */}
        <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[25%]'>
          <FaUsers className='text-4xl text-gray-500 mb-2' />
          <h3 className='text-xl font-semibold text-gray-600'>
            Verified Users
          </h3>
          <p className='text-3xl font-bold text-green-800'>{totalverifieduser}</p>
        </div>

       
      </div>


      <div className='active-user bg-white rounded-xl p-5 drop-shadow-md '>
        <h2 className='text-2xl font-bold mb-4'>User</h2>
        <div className=' filter-box md:w-2/3 flex gap-4 mb-4'>
          <div className='flex justify-between '>
            <div className='flex flex-row gap-3'>
              <select
                type='text'
                id='department'
                value={dropDept}
                onChange={async e => {
                  await setDropDept(e.target.value)
                }}
                required
                className='border border-gray-300 rounded-md px-3 py-2'
              >
                <option value=''>Select User Group</option>
                {/* {preDept &&
                  preDept.map((item, index) => (
                    <option value={item.symbol} key={index}>
                      {item.symbol}
                    </option>
                  ))} */}
              </select>
              <div>
                <button
                  onClick={async e => {
                    e.preventDefault()
                    await fetchFilterData()
                  }}
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                >
                  <Search />
                </button>
              </div>
            </div>

            <div className='flex flex-row gap-3 ml-10'>
              <input
                type='search'
                name='Search'
                placeholder='Username/ID'
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              <div>
                <button
                  onClick={async e => {
                    e.preventDefault()
                    await fetchFilterData()
                  }}
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                >
                  <Search />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=' h-80 table-container overflow-y-auto'>
          <table className='w-full table-auto border-collapse text-center'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-2 py-2'>ID</th>
                <th className='px-4 py-2'>Username</th>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>User Group</th>
                <th className='px-1 py-2'>Option</th>
              </tr>
            </thead>
            <tbody>
              {userdata &&
                userdata?.map((item, index) => (
                  <tr key={index} className='bg-gray-100 hover:bg-gray-200'>
                    <td className='px-1 py-2 border'>{index + 1}</td>
                    <td className='px-4 py-2 border'>{item?.username}</td>
                    <td className='px-4 py-2 border'>
                      {item?.name}
                    </td>
                    <td className='px-4 py-2 border'>{item?.userGroup?.userGroupName}</td>
                    <td className='px-1 py-2 border'>
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
  )
}

export default User
