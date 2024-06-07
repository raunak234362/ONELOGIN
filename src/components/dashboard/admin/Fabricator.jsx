/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { FaUserPlus, FaUsers } from 'react-icons/fa'

const Fabricator = ({ totalRegisteredFabricator }) => {
  const [formData, setFormData] = useState()
  const [showForm, setShowForm] = useState(false)
  const [info, setInfo] = useState([])
  const [totalfabricator,setTotalFabricator]=useState([])
  const [modifyForm,setModifyForm]=useState(false)
  const [modifyFabricator, setModifyFabricator] =useState()

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const fetchData = async () => {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('access')}`)
    

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const response = await fetch('https://wbt-onelogin.onrender.com/api/v1/fabricator/all/',requestOptions)
      const data = await response.json()
      setInfo(data?.data)
      setTotalFabricator(data?.data?.length)

  }

  const handleModifyClick =async (index)=>{
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json"); // Add this line

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(modifyFabricator),
      redirect: "follow",
    };
    console.log(modifyFabricator);

    const response = await fetch(  `https://wbt-onelogin.onrender.com/api/v1/fabricator/${index}/update`,requestOptions );
    console.log(index)
    const data = await response.json();
    setModifyFabricator(data?.data);
  }


  const toggleModifyForm=(index) =>{
    setModifyForm(index)
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
    console.log(requestOptions);
    const response = await fetch(
      'https://wbt-onelogin.onrender.com/api/v1/fabricator/create/',
      requestOptions
    )
    const data = await response.json()
    setFormData(data?.data)
    // console.log(data?.data)
  }

  useEffect(()=>{
    fetchData()
  })

  return (
    <div className='fabricator-container p-5'>
      <div className='flex flex-row justify-around gap-2 mb-8'>
        <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[25%]'>
          <FaUsers className='text-4xl text-slate-400 mb-2' />
          <h3 className='text-xl font-semibold text-gray-600'>
            Total fabricator
          </h3>
          <p className='text-3xl font-bold text-slate-800'>
            {totalfabricator}
          </p>
        </div>

        {/* Add New User */}
        <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-[25%]'>
          <FaUserPlus className='text-4xl text-gray-500 mb-2' />
          <h3 className='text-xl font-semibold text-gray-600'>
            Add New Fabricator
          </h3>
          <button
            onClick={toggleForm}
            className='mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-red-700'
          >
            Add
          </button>
          {showForm && (
            <div className='absolute top-0 z-50 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
              <div className='bg-white p-6 rounded-lg shadow-md w-[50%]'>
                <h2 className=' text-2xl font-bold mb-4'>Add Fabricator</h2>
                <form
                  onSubmit={handleSubmit}
                  className='space-y-4 bg-slate-200 p-5 rounded-xl'
                >
                  <div>
                    <label htmlFor='name' className='block font-bold'>
                      Name:
                    </label>
                    <input
                      type='text'
                      id='name'
                      placeholder='Project Name'
                      value={formData?.fabricatorName}
                      onChange={(e) => setFormData({...formData,fabricatorName: e.target.value})}
                      required
                      className='w-full border border-gray-300 rounded-md px-3 py-2'
                    />
                  </div>
                  <div>
                    <label htmlFor='name' className='block font-bold'>
                      Client Name:
                    </label>
                    <input
                      type='text'
                      id='client-name'
                      placeholder='Client Name'
                      value={formData?.clientName}
                      onChange={(e) =>
                        setFormData({ ...formData, clientName: e.target.value })
                      }
                      required
                      className='w-full border border-gray-300 rounded-md px-3 py-2'
                    />
                  </div>
                  <div>
                    <label htmlFor='name' className='block font-bold'>
                      Client Number:
                    </label>
                    <input
                      type='text'
                      id='clientnum'
                      placeholder='Client Number'
                      value={formData?.clientPhone}
                      onChange={(e) => setFormData({...formData ,clientPhone: e.target.value})}
                      required
                      className='w-full border border-gray-300 rounded-md px-3 py-2'
                    />
                  </div>
                  <div className='flex fle-row gap-5'>
                    <button className='add-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full'>
                      Add Fabricator
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
        <h2 className='text-2xl font-bold mb-4'>Fabricator</h2>
      
        <div className=' h-96 table-container overflow-y-auto'>
          <table className='w-full table-auto border-collapse text-center'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-1 py-2'>S.No</th>
                <th className='px-6 py-2'>Fabricator</th>
                <th className='px-3 py-2'>Client Name</th>
                <th className='px-2 py-2'>Contact Number</th>
                <th className='px-1 py-2'>Option</th>
              </tr>
            </thead>
            <tbody>
              {info &&
                info.map((item, index) => (
                  <tr key={index} className='bg-gray-100 hover:bg-gray-200'>
                    <td className='px-1 py-2 border'>{index + 1}</td>
                    <td className='px-4 py-2 border'>{item?.name}</td>
                    <td className='px-4 py-2 border'>{item?.clientName}</td>
                    <td className='px-4 py-2 border'>{item?.clientPhone}</td>
                    <td className='px-4 py-2 border'>
                      <button 
                      className='modify-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                      onClick={()=>toggleModifyForm(index)}
                      >
                        Modify
                      </button>
                      {
                        modifyForm === index &&(
                          <div className='absolute top-0 z-50 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
                            <div
                            className={`popup-menu mb-5 bottom-0 w-1/2 h-full bg-white rounded-lg shadow-lg my-5 p-4 ${
                              modifyForm === index ? "visible" : "hidden"
                            }`}
                          >
                            <p className='text-center text-2xl font-bold'>Edit Fabricator</p>
                            <label
                                className="block font-bold mb-2 text-left"
                              >
                              Fabricator Name:
                              </label>
                              <input
                                type="text"
                                placeholder="Project Name"
                                value={modifyFabricator?.name || item?.name}
                                
                                onChange={(e) => {
                                  if (
                                    e.target.value?.trim() !== "" &&
                                    e.target.value !== undefined
                                  ) {
                                    setModifyFabricator({
                                      ...modifyFabricator,
                                      name: e.target.value,
                                    });
                                  }
                                }}
                                className="mb-2 border border-gray-300 rounded-md px-3 py-2 w-full"
                              />
                            <label
                                className="block font-bold mb-2 text-left"
                              >
                              Client Name:
                              </label>
                              <input
                                type="text"
                                placeholder="Project Name"
                                value={modifyFabricator?.clientName || item?.clientName}
                                
                                onChange={(e) => {
                                  if (
                                    e.target.value?.trim() !== "" &&
                                    e.target.value !== undefined
                                  ) {
                                    setModifyFabricator({
                                      ...modifyFabricator,
                                      clientName: e.target.value,
                                    });
                                  }
                                }}
                                className="mb-2 border border-gray-300 rounded-md px-3 py-2 w-full"
                              />
                            <label
                                className="block font-bold mb-2 text-left"
                              >
                              Client Number:
                              </label>
                              <input
                                type="text"
                                placeholder="Project Name"
                                value={modifyFabricator?.clientNumber || item?.clientNumber}
              
                                onChange={(e) => {
                                  if (
                                    e.target.value?.trim() !== "" &&
                                    e.target.value !== undefined
                                  ) {
                                    setModifyFabricator({
                                      ...modifyFabricator,
                                      clientNumber: e.target.value,
                                    });
                                  }
                                }}
                                className="mb-2 border border-gray-300 rounded-md px-3 py-2 w-full"
                              />
                            <button
                            className='modify-btn w-full bg-green-500 mt-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                            onClick={()=>handleModifyClick(item?._id)}
                            >
                              Update
                            </button>
                            <button
                            className='modify-btn w-full bg-red-500 mt-5 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                            onClick={()=>toggleModifyForm()}
                            >Close</button>
                           
                          </div>
                          </div>
                        )
                      }
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

export default Fabricator
