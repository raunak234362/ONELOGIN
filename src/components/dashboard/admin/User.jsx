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
    myHeaders.append('authorization', `Bearer ${localStorage.getItem('access')}`)
    myHeaders.append('Cookie', `token=${localStorage.getItem('token')}`)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

   const response =await fetch (`${BASE_URL}/api/v1/group/all/`,requestOptions)
   const data = await response.json()
    setUserGroup(data?.data?.accessLevel)
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

        {/* Add New User */}
        <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[25%]'>
          <FaUserPlus className='text-4xl text-gray-500 mb-2' />
          <h3 className='text-xl font-semibold text-gray-600'>Add New User</h3>
          <button
            onClick={toggleForm}
            className='mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-red-700'
          >
            Add
          </button>
          {showForm && (
            <div className='absolute top-0 z-50 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
              <div className='bg-white p-6 rounded-lg shadow-md w-[50%]'>
                <h2 className='text-2xl font-bold mb-4'>Add User</h2>
                <form
                  onSubmit={handleSubmit}
                  className='space-y-4 bg-slate-200 p-5 max-w-5xl rounded-xl'
                >
                  {firstform && (
                    <>
                      <div>
                        <label htmlFor='username' className='block font-bold'>
                          Username:
                        </label>
                        <input
                          type='text'
                          id='username'
                          value={user?.username}
                          onChange={e =>
                            setUser(prevUser => ({
                              ...prevUser,
                              username: e.target.value
                            }))
                          }
                          required
                          className='w-full border border-gray-300 rounded-md px-3 py-2'
                        />
                      </div>
                      <div>
                        <label htmlFor='name' className='block font-bold'>
                          Name:
                        </label>
                        <input
                          type='text'
                          id='name'
                          value={user?.name}
                          onChange={e =>
                            setUser(prevUser => ({
                              ...prevUser,
                              name: e.target.value
                            }))
                          }
                          required
                          className='w-full border border-gray-300 rounded-md px-3 py-2'
                        />
                      </div>

                      <div>
                        <label htmlFor='password' className='block font-bold'>
                          Password:
                        </label>
                        <input
                          type='password'
                          id='password'
                          value={user?.password}
                          onChange={e =>
                            setUser(prevUser => ({
                              ...prevUser,
                              password: e.target.value
                            }))
                          }
                          required
                          className='w-full border border-gray-300 rounded-md px-3 py-2'
                        />
                      </div>
                      <div>
                        <label htmlFor='password' className='block font-bold'>
                          Email:
                        </label>
                        <input
                          type='email'
                          id='email'
                          value={user?.email}
                          onChange={e =>
                            setUser(prevUser => ({
                              ...prevUser,
                              email: e.target.value
                            }))
                          }
                          required
                          className='w-full border border-gray-300 rounded-md px-3 py-2'
                        />
                      </div>
                      <div>
                        <label htmlFor='department' className='block font-bold'>
                          User Group:
                        </label>
                        <select
                          type='text'
                          id='department'
                          value={userGroup}
                          onChange={e => setUserGroup(e.target.value)}
                          required
                          className='w-full border border-gray-300 rounded-md px-3 py-2'
                        >
                          <option
                            value=''
                            onChange={e => setUserGroup(e.target.value)}
                          >
                            Select User Group
                          </option>
                          {formUserGroup &&
                            formUserGroup.map((item, index) => (
                              <option value={item._id} key={index}>
                                {item.userGroupName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </>
                  )}

                  {secondform &&
                    extraField.map((item, index) => {
                      const name = item?.fieldName

                      if (item?.fieldType === 'boolean') {
                        return <></>
                      } else if (item?.fieldType === 'list') {
                        return (
                          <>
                            <div>
                              <label
                                htmlFor={item?.fieldName}
                                className='block font-bold'
                              >
                                {item?.fieldName}:
                              </label>
                              <select
                                type={item?.fieldType}
                                id={item?.fieldName}
                                value={user?.[item?.fieldName] || ''}
                                onChange={e =>
                                  setUser(prevUser => ({
                                    ...prevUser,
                                    [item?.fieldName]: e.target.value
                                  }))
                                }
                                required
                                className='w-full border border-gray-300 rounded-md px-3 py-2'
                              >
                                <option value=''>Select an option</option>
                                {item?.fieldDefault?.map((option, index) => (
                                  <option key={index} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        )
                      } else {
                        return (
                          <>
                            <div>
                              <label
                                htmlFor={item?.fieldName}
                                className='block font-bold'
                              >
                                {item?.fieldName}:
                              </label>
                              <input
                                type={item?.fieldType}
                                id={item?.fieldName}
                                value={user?.item?.fieldName}
                                onChange={e =>
                                  setUser(prevUser => ({
                                    ...prevUser,
                                    [name]: e.target.value
                                  }))
                                }
                                required
                                className='w-full border border-gray-300 rounded-md px-3 py-2'
                              />
                            </div>
                          </>
                        )
                      }
                    })}

                  <div className='flex fle-row gap-5'>
                    <button
                      className='bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded'
                      onClick={e => {
                        e.preventDefault()
                        if (firstform) {
                          fetchField()
                          setFirstForm(false)
                          setSecondForm(true)
                        } else if (secondform) {
                          handleSubmit()
                          setFirstForm(false)
                          setSecondForm(false)
                          setShowForm(false)
                        }
                      }}
                    >
                      {firstform ? 'Next' : secondform ? 'Submit' : 'Next'}
                    </button>

                    <button
                      type='button'
                      onClick={toggleForm}
                      className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400'
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
                        Modify
                      </button>
                      {/* {popupRowIndex === index && (
                        <div
                          className={`popup-menu absolute bg-white rounded-lg shadow-lg p-4 ${
                            popupVisible ? 'visible' : 'hidden'
                          }`}
                        >
                          <input
                            type='password'
                            placeholder='Old Password'
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            className='mb-2 border border-gray-300 rounded-md px-3 py-2 w-full'
                          />
                          <input
                            type='password'
                            placeholder='New Password'
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className='mb-2 border border-gray-300 rounded-md px-3 py-2 w-full'
                          />
                          <button
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
                                oldPassword: oldPassword,
                                newPassword: newPassword
                              })

                              const requestOptions = {
                                method: 'PUT',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                              }

                              await fetch(
                                'https://wbt-projecttimeline.onrender.com/api/user/reset-password',
                                requestOptions
                              )
                                .then(async response => {
                                  response.json()
                                })
                                .then(result => console.log(result))
                                .catch(error => console.error(error))
                              console.log(oldPassword)
                              console.log(newPassword)
                            }}
                            className='modify-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                          >
                            Update
                          </button>
                        </div>
                      )} */}
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
