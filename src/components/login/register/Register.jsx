/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import login from '../../../assets/images/login2.jpg'
import { useRef, useState } from 'react'

const Register = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [complogo, setCompLogo] = useState('')
  const [number, setNumber] = useState('')
  const [userid, setUserId] = useState('')

  const handleInputFocus = inputRef => {
    if (window.innerWidth <= 768) {
      inputRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col md:flex-row bg-white items-center justify-between min-h-screen">
  <div className="relative bg-cover bg-center h-1/2 md:h-screen md:w-[60%] overflow-hidden">
    <div className="relative z-10 flex flex-col items-center justify-center h-full">
      <ul className="text-2xl bg-white p-4 rounded-xl border-2 border-white bg-opacity-40 text-white text-center space-y-2 gap-5">
        <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:via-green-500 hover:to-neutral-50">
          Experience seamless access across platforms with our single-login solution.
        </li>
        <li className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:via-green-500 hover:to-neutral-50">
          Enhanced security, convenience, and scalability
        </li>
      </ul>
    </div>
    <img
      src={login}
      alt="login"
      className="absolute inset-0 w-full h-full object-cover blur-sm"
    />
  </div>
  <div className="md:w-[40%] h-1/2 md:h-screen flex items-center justify-center">
    <form
      onSubmit={" "}
      className="flex flex-col bg-white w-full md:max-w-lg p-8 shadow-lg"
    >
      <div className="flex justify-center mb-10">
        <h1 className="text-4xl text-white bg-gradient-to-r from-cyan-950 via-teal-700 to-emerald-950 py-2 px-6 text-center rounded-xl">
          Register:
        </h1>
      </div>
      <div className="bg-gray-200 rounded-xl p-3 h-auto py-7">
        <div className="mb-6 relative">
          <input
            className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            type="text"
            id="companyName"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label
            className="absolute left-3 top-3 text-gray-500 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:rounded-lg peer-focus:px-5 peer-focus:text-sm peer-focus:text-green-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
            htmlFor="companyName"
          >
            Application Name
          </label>
        </div>
        <div className="mb-6 relative">
          <input
            className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            type="text"
            id="companyId"
            value={userid}
            onChange={e => setUserId(e.target.value)}
          />
          <label
            className="absolute left-3 top-3 text-gray-500 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:rounded-lg peer-focus:px-5 peer-focus:text-sm peer-focus:text-green-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
            htmlFor="companyId"
          >
            Application ID
          </label>
        </div>
        <div className="mb-6 relative">
          <input
            className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            type="text"
            id="companyEmail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label
            className="absolute left-3 top-3 text-gray-500 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:rounded-lg peer-focus:px-5 peer-focus:text-sm peer-focus:text-green-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
            htmlFor="companyEmail"
          >
            Admin Email
          </label>
        </div>
        <div className="mb-6 relative">
          <input
            className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            type="text"
            id="text"
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
          <label
            className="absolute left-3 top-3 text-gray-500 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:rounded-lg peer-focus:px-5 peer-focus:text-sm peer-focus:text-green-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
            htmlFor="password"
          >
            Admin Phone
          </label>
        </div>
        <div className="mb-6 relative">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="companyLogo"
              className="flex items-center justify-center w-full bg-white text-gray-500 font-bold rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors duration-300"
            >
              <span className="px-4 py-2">
                {complogo ? complogo.name : 'Choose Application Logo'}
              </span>
              <input
                id="companyLogo"
                type="file"
                className="hidden"
                onChange={e => setCompLogo(e.target.files[0])}
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            to="/login/register/step3"
            type="submit"
            className="bg-gradient-to-r from-cyan-950 via-teal-700 to-emerald-950 hover:bg-gradient-to-r hover:from-teal-700 hover:via-cyan-950 hover:to-emerald-950 text-white font-bold py-3 px-20 md:px-52 text-center rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Next
          </Link>
        </div>
      </div>
    </form>
  </div>
</div>
  )
}

export default Register
