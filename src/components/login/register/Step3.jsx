/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import login from '../../../assets/images/login3.webp'
import { Link, useNavigate } from 'react-router-dom'

const Step3 = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  useEffect(() => {
    const handleResize = ({ setUser }) => {
      if (window.innerWidth <= 768) {
        usernameInputRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await fetch(
        'https://wbt-projecttimeline.onrender.com/api/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to login')
      }

      const data = await response.json()
      console.log(data)

      localStorage.setItem('token', data?.data?.username)
      localStorage.setItem('type', data?.data?.type)

      if (data?.data?.type === 'admin' || data?.data?.type === 'manager') {
        setUser({ isAdmin: true })
        navigate('/admin')
      } else {
        setUser({ isUser: true })
        navigate('/user')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputFocus = inputRef => {
    if (window.innerWidth <= 768) {
      inputRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center bg-white justify-between min-h-screen">
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
      onSubmit={handleSubmit}
      className="flex flex-col bg-white w-full max-w-3xl md:max-w-2xl pt-24 md:pt-36 p-8 shadow-lg"
    >
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl text-white bg-gradient-to-r from-cyan-950 via-teal-700 to-emerald-950 py-2 px-8 md:px-16 text-center rounded-xl">
          Register:
        </h1>
      </div>

      <div className="bg-gray-200 rounded-xl p-3 py-7 space-y-6">
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-center mt-6">
          <Link
            to="/login/register/step4"
            type="submit"
            className="bg-gradient-to-r from-cyan-950 via-teal-700 to-emerald-950 hover:bg-gradient-to-r hover:from-teal-700 hover:via-cyan-950 hover:to-emerald-950 text-white font-bold py-3 px-8 md:px-16 text-center rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Submit
          </Link>
        </div>
      </div>
    </form>
  </div>
</div>
  )
}

export default Step3
