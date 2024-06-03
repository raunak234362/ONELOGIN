import { useState } from 'react'
import login from '../../../assets/images/login3.webp'
import { Link } from 'react-router-dom'

const Step2 = () => {
  const [address, setAddress] = useState('')
  const [website, setWebsite] = useState('')
  const [established, setEstablished] = useState('')
  const [type, setType] = useState('')
  const [size, setSize] = useState('')
  const [country, setCountry] = useState('')
  const [showDateInput, setShowDateInput] = useState(false);

  const toggleDateInput = () => {
    setShowDateInput(!showDateInput);
  };


  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen">
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
    <div className="md:w-[40%] h-1/2 md:h-screen flex items-center justify-center p-4">
      <form
        onSubmit={" "}
        className="flex flex-col bg-white w-full max-w-3xl md:max-w-lg py-8 px-4 md:px-8 shadow-lg"
      >
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl text-white bg-gradient-to-r from-cyan-950 via-teal-700 to-emerald-950 py-2 px-6 text-center rounded-xl">
            Register:
          </h1>
        </div>
        <div className="bg-gray-200 rounded-xl p-3 h-auto py-7 space-y-6">
          <div className="relative">
            <input
              className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer"
              type="text"
              id="companyEmail"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            <label
              className="absolute left-3 top-3 text-gray-500 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:rounded-lg peer-focus:px-5 peer-focus:text-sm peer-focus:text-green-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
              htmlFor="companyEmail"
            >
              Company Address
            </label>
          </div>
          <div className="relative">
            <input
              className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer"
              type="text"
              id="companyName"
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
            <label
              className="absolute left-3 top-3 text-gray-500 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:rounded-lg peer-focus:px-5 peer-focus:text-sm peer-focus:text-green-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
              htmlFor="companyName"
            >
              Company Website
            </label>
          </div>
          <div className="relative">
            {showDateInput ? (
              <input
                className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                type="date"
                id="companyId"
                value={established}
                onChange={(e) => setEstablished(e.target.value)}
              />
            ) : (
              <label
                className="block text-gray-500 transition-all duration-300 bg-white rounded-lg px-5 py-3 text-sm text-green-500 cursor-pointer"
                onClick={toggleDateInput}
              >
                Established in
              </label>
            )}
          </div>
          <div className="relative">
            <input
              className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer"
              type="text"
              id="text"
              value={type}
              onChange={e => setType(e.target.value)}
            />
            <label
              className="absolute left-3 top-3 text-gray-500 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:rounded-lg peer-focus:px-5 peer-focus:text-sm peer-focus:text-green-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
              htmlFor="password"
            >
              Type
            </label>
          </div>
          <div className="relative">
            <input
              className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer"
              type="number"
              id="size"
              value={size}
              onChange={e => setSize(e.target.value)}
            />
            <label
              className="absolute left-3 top-3 text-gray-500 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:rounded-lg peer-focus:px-5 peer-focus:text-sm peer-focus:text-green-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
              htmlFor="password"
            >
              Size
            </label>
          </div>
          <div className="relative">
            <input
              className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer"
              type="text"
              id="country"
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
            <label
              className="absolute left-3 top-3 text-gray-500 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:bg-white peer-focus:rounded-lg peer-focus:px-5 peer-focus:text-sm peer-focus:text-green-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
              htmlFor="country"
            >
              Country
            </label>
          </div>
          <div className="flex justify-center mt-6">
            <Link
              to="/login/register/step3"
              type="submit"
              className="bg-gradient-to-r from-cyan-950 via-teal-700 to-emerald-950 hover:bg-gradient-to-r hover:from-teal-700 hover:via-cyan-950 hover:to-emerald-950 text-white font-bold py-3 px-8 text-center rounded-full w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
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

export default Step2
