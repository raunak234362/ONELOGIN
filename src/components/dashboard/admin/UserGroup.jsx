/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { FaBuilding, FaPlusCircle, FaUsers } from 'react-icons/fa'
import { faker } from '@faker-js/faker'
import { useNavigate } from 'react-router-dom'

const UserGroup = () => {
    const [name, setName] = useState('')
    const [symbol, setSymbol] = useState('')
    const [info, setInfo] = useState([])
    const [userCount, setUserCount] = useState({})
    const [popupRowIndex, setPopupRowIndex] = useState(-1)
    const [popupVisible, setPopupVisible] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const [dataArray, setDataArray] = useState([])
    const [currentDataInput, setCurrentDataInput] = useState('')
    const [addedDataInput,setAddedDataInput]=useState('')
    const [groupName, setGroupName] = useState('')
    const [groupDescription, setGroupDescription] = useState('')
    const [accessLevel, setAccessLevel] = useState('')
    const [size, setSize] = useState(null)
    const [totalGroups, setTotalGroups] = useState('');
    const [avgUser, setAvgUser] = useState(0);
    const [modifyDepartment, setModifyDepartment] = useState({
      name: ''
    })
  
    const [fields, setFields] = useState([])
    const [newField, setNewField] = useState({
      name: '',
      type: 'text',
      unique: false,
      required: false,
      dropdownOptions: ''
    })
  
    const navigate = useNavigate()
  
    const handleOptionChange = e => {
      setSelectedOption(e.target.value)
      if (e.target.value === 'list') {
        setDataArray([])
      }
    }
  
    const handleDataInputAdded =e =>{
      setAddedDataInput(e.target.value)
    }
  
    const handleDataInputChange = e => {
      setCurrentDataInput(e.target.value)
    }
    const handleAddToList = () => {
      if (currentDataInput.trim() !== '') {
        setDataArray(prevDataArray => [...prevDataArray, currentDataInput])
        setCurrentDataInput('')
      }
    }
  
    const toggleForm = () => {
      setShowForm(!showForm)
    }
  
    const addField = () => {
      const updatedNewField = { ...newField }
      if (newField.type === 'list') {
        updatedNewField.dropdownOptions = dataArray
      }
      setFields([...fields, updatedNewField])
      setNewField({
        name: '',
        type: 'text',
        unique: false,
        required: false,
        dropdownOptions: []
      })
      setDataArray([]) // Reset the data array after adding the field
    }
  
    const handleModifyClick = index => {
      const departmentData = info[index]
      setModifyDepartment({
        name: departmentData.name
      })
      setPopupRowIndex(index)
      setPopupVisible(!popupVisible)
    }
  
    const handleSubmit = async e => {
      e.preventDefault()
  
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append(
        'Authorization',
        `Bearer ${localStorage.getItem("access")}`
      )
      
  
      const raw = JSON.stringify({
        name: groupName,
        description: groupDescription,
        accessLevel: accessLevel,
        groupSchema: fields.map(field => ({
          fieldName: field.name,
          fieldType: field.type,
          fieldRequired: field.required,
          fieldUnique: field.unique,
          fieldDefault: field.type === 'list' ? field.dropdownOptions : undefined
        }))
      })
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }
  
      try {
        const response = await fetch(
          'https://wbt-onelogin.onrender.com/api/v1/group/create/',
          requestOptions
        )
        const result = await response.json()
        console.log(result)
        if (response.ok) {
          // Reset form fields
          setGroupName('')
          setGroupDescription('')
          setAccessLevel('')
          setFields([])
          setShowForm(false)
          fetchData() // Fetch updated group data
        } else {
          console.error('Error creating group:', result.message)
        }
      } catch (error) {
        console.error(error)
      }
    }
  
    const fetchData = async () => {
      const myHeaders = new Headers()
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem('access')}`)
      myHeaders.append('Cookie', `token=${localStorage.getItem('token')}`)
  
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }
  
      // Fetch group data
      await fetch('https://wbt-onelogin.onrender.com/api/v1/group/all/', requestOptions)
      .then(async response => {
        const data = await response.json()
        console.log(data)
        setInfo(data?.data)
        setTotalGroups(data?.data.length)
        setAvgUser(Math.round(data?.data.reduce((acc, curr) => acc + curr.userCount, 0) / data?.data.length))
      })
      .then(result => console.log(result))
      .catch(error => console.error(error))
   }
  
    useEffect(() => {
      fetchData()
    }, [])
  
    return (
      <div className='department-container p-5 mb-14'>
        <div className='flex flex-row justify-around gap-2 mb-8'>
          {/* Total groups */}
          <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[33%]'>
            <FaBuilding className='text-4xl text-slate-400 0 mb-2' />
            <h3 className='text-xl font-semibold text-gray-600'>User Groups</h3>
            <p className='text-3xl font-bold text-slate-800'>
              {totalGroups}
            </p>
          </div>
  
          {/* Total Users in Departments */}
          <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[33%]'>
            <FaUsers className='text-4xl text-gray-600 mb-2' />
            <h3 className='text-xl font-semibold text-gray-600'>
              Average Users in a Group
            </h3>
            <p className='text-3xl font-bold text-gray-800'>{avgUser}</p>
          </div>
  
          {/* Create New Department Button */}
          <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[33%]'>
            <FaPlusCircle className='text-4xl text-gray-500 mb-2' />
            <h3 className='text-xl font-semibold text-gray-500'>
              Create New User Group
            </h3>
  
            <button
              onClick={toggleForm}
              className='mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700'
            >
              Create
            </button>
            {showForm && (
              <div className='absolute z-20 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                  <h3 className='text-lg font-semibold mb-4'>
                    Add New User Group
                  </h3>
                  <form onSubmit={handleSubmit}>
                    {/* Group Name Field */}
                    <div className='mb-4'>
                      <label
                        htmlFor='groupName'
                        className='block font-semibold mb-1'
                      >
                        Group Name
                      </label>
                      <input
                        type='text'
                        id='groupName'
                        value={groupName}
                        onChange={e => setGroupName(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                      />
                    </div>
  
                    {/* Existing Fields */}
                    
  
                    <div className='mb-4'>
                      <label
                        htmlFor='groupName'
                        className='block font-semibold mb-1'
                      >
                        Group Description
                      </label>
                      <input
                        type='text'
                        id='groupName'
                        value={groupDescription}
                        onChange={e => setGroupDescription(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                      />
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='groupName'
                        className='block font-semibold mb-1'
                      >
                        Group Accessability
                      </label>
                      <select
                        name='Accessability'
                        id='accessLevel'
                        value={accessLevel}
                        onChange={e => setAccessLevel(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md mb-2'
                      >
                        <option value=''>Select Accessability</option>
                        <option value='admin'>Admin</option>
                        <option value='manager'>Manager</option>
                        <option value='team_lead'>Team Leader</option>
                        <option value='team_manager'>Team Manager</option>
                        <option value='user'>User</option>
                        <option value='guest'>Guest</option>
                      </select>
                    </div>
  
                    {/* Add New Field */}
                    
                    <p>*Username, Email, Name, Profile Img, Password fields are already exists.</p>
                    <div className='mb-2'>
                      <h4 className='font-semibold mb-2'>Add New Field</h4>
                      {/* Field Name Input */}
  
                      {fields.map((field, index) => (
                      <div key={index} className='mb-4'>
                        <input
                        type='text'
                        placeholder='Field Name'
                        value={field.name}
                        onChange={e =>
                          setNewField({ ...field, name: e.target.value })
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md mb-2'
                      />
                      
                      {newField.type === 'list' && (
                        <div className='mb-2'>
                          <ul className='list-disc ml-5'>
                          </ul>
                        </div>
                      )}
                  </div>
                    ))}
  
  
                      <input
                        type='text'
                        placeholder='Field Name'
                        value={newField.name}
                        onChange={e =>
                          setNewField({ ...newField, name: e.target.value })
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md mb-2'
                      />
                      {/* Field Type Dropdown */}
                      <select
                        value={newField.type}
                        onChange={e =>
                          setNewField({ ...newField, type: e.target.value })
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md mb-2'
                      >
                        <option value='text'>Text</option>
                        <option value='file'>File</option>
                        <option value='boolean'>Option</option>
                        <option value='number'>Numerical</option>
                        <option value='date'>Date</option>
                        <option value='list'>List</option>
                      </select>
                      {/* Show input for list items if 'list' is selected */}
                      {newField.type === 'list' && (
                        <div className='mb-2'>
                          <label
                            htmlFor='dataArrayInput'
                            className='block font-semibold mb-1'
                          >
                            Add Items to List
                          </label>
                          <div className='flex'>
                            <input
                              type='text'
                              id='dataArrayInput'
                              value={currentDataInput}
                              onChange={handleDataInputChange}
                              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-2'
                            />
                            <button
                              type='button'
                              onClick={handleAddToList}
                              className='ml-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-700'
                            >
                              Add to List
                            </button>
                          </div>
  
                          <ul className='list-disc ml-5'>
                            {dataArray.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
  
                      {/* Unique and Required checkboxes */}
                      <label htmlFor='unique'>Unique</label>
                      <input
                        type='checkbox'
                        id='unique'
                        checked={newField.unique}
                        onChange={e =>
                          setNewField({ ...newField, unique: e.target.checked })
                        }
                        className='mx-2'
                      />
                      <label htmlFor='required'>Required</label>
                      <input
                        type='checkbox'
                        id='required'
                        checked={newField.required}
                        onChange={e =>
                          setNewField({ ...newField, required: e.target.checked })
                        }
                        className='mx-2'
                      />
                      {/* Add Field Button */}
                      <button
                        type='button'
                        onClick={addField}
                        className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-2'
                      >
                        Add Field
                      </button>
                    </div>
  
                    {/* Form Buttons */}
                    <div className='flex justify-end'>
                      <button
                        type='button'
                        onClick={toggleForm}
                        className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400'
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
  
        <div className='active-department bg-white rounded-xl p-5 '>
          <h2 className='text-2xl font-bold mb-4'>User Group</h2>
          <div className=' filter-box md:w-2/3 flex gap-4 mb-4'>
            <div>
              <select
                type='text'
                id='department'
                value={accessLevel}
                onChange={async e => {
                  await setAccessLevel(e.target.value)
                }}
                required
                className='border border-gray-300 rounded-md px-3 py-2'
              >
                <option value=''>Select Accessability</option>
                <option value='Admin'>Admin</option>
                <option value='Lead'>Team Lead</option>
                <option value='Manager'>Team Manager</option>
                <option value='User'>User</option>
                <option value='Guest'>Guest</option>
              </select>
            </div>
            <div>
              <select
                type='text'
                id='type'
                value={size}
                onChange={async e => {
                  await setSize(e.target.value)
                }}
                required
                className='border border-gray-300 rounded-md px-3 py-2'
              >
                <option value=''>Select Size</option>
                <option value='guest'>1-5</option>
                <option value='admin'>6-20</option>
                <option value='manager'>21-50</option>
                <option value='user'>51-100</option>
              </select>
            </div>
            <div>
              <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                <Search />
              </button>
            </div>
          </div>
          <div className='overflow-y-auto h-80 table-container'>
            <table className='w-full table-auto border-collapse text-center'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='px-2 py-2'>S.No</th>
                  <th className='px-4 py-2'>Group Name</th>
                  <th className='px-4 py-2'>Accessability</th>
                  <th className='px-4 py-2'>No. of users</th>
                  <th className='px-2 py-2'>Option</th>
                </tr>
              </thead>
              <tbody>
                {info &&
                  info.map((item, index) => (
                    <tr key={index} className='bg-gray-100 hover:bg-gray-200'>
                      <td className='px-2 py-2 border'>{index + 1}</td>
                      <td className='px-4 py-2 border'>{item.userGroupName}</td>
                      <td className='px-4 py-2 border'>{item.accessLevel}</td>
                      <td className='px-4 py-2 border'>
                        {item.userCount}
                      </td>
  
                      <td className='px-2 py-2 border'>
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
                              placeholder='Department Name'
                              value={modifyDepartment.name}
                              onChange={e =>
                                setModifyDepartment({
                                  ...modifyDepartment,
                                  name: e.target.value
                                })
                              }
                              className='mb-2 border border-gray-300 rounded-md px-3 py-2 w-full'
                            />
  
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
                                  name: modifyDepartment.name
                                })
  
                                const requestOptions = {
                                  method: 'PUT',
                                  headers: myHeaders,
                                  body: raw,
                                  redirect: 'follow'
                                }
                                console.log(modifyDepartment.name)
                                fetch(
                                  `https://wbt-projecttimeline.onrender.com/api/department/${modifyDepartment.name}`,
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
        </div>
      </div>
    )
  }
  
export default UserGroup
