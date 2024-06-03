/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login from '../../assets/images/login.jpg'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  // const responseData = pm.response.json();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        emailInputRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('https://wbt-onelogin.onrender.com/api/v1/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }
  
      const responseData = await response.json();
      console.log(responseData);
  
      localStorage.setItem('access', responseData?.data?.accessToken);
      localStorage.setItem('refresh', responseData?.data?.refreshToken);
      
      navigate('/')
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };



  const handleInputFocus = inputRef => {
    if (window.innerWidth <= 768) {
      inputRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className='flex flex-col md:flex-row bg-white items-center justify-between min-h-screen'>
      <div className='relative bg-cover bg-center h-1/2 md:h-screen md:w-[60%] overflow-hidden'>
        <div className='relative z-10 flex flex-col items-center justify-center h-full'>
          <ul className='text-2xl bg-white p-4 rounded-xl border-2 border-white bg-opacity-40 text-white text-center space-y-2 gap-5'>
            <li className='hover:text-transparent hover:bg-clip-text sm:text-xs md:text-base hover:bg-gradient-to-r hover:from-cyan-400 hover:via-green-500 hover:to-neutral-50'>
              Experience seamless access across platforms with our single-login
              solution.
            </li>
            <li className='hover:text-transparent hover:bg-clip-text sm:text-xs md:text-base hover:bg-gradient-to-r hover:from-cyan-400 hover:via-green-500 hover:to-neutral-50'>
              Enhanced security, convenience, and scalability
            </li>
          </ul>
        </div>
        <img
          src={login}
          alt='login'
          className='absolute inset-0 w-full h-full object-cover blur-sm'
        />
      </div>
      <div className='md:w-[40%] h-1/2 md:h-screen flex items-center justify-center'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white w-full md:max-w-lg p-8 shadow-lg'
        >
          <div className='flex justify-center'>
            <h1 className='text-4xl text-white bg-gradient-to-r from-cyan-950 via-teal-700 to-emerald-950 mb-10 py-2 px-4 text-center rounded-xl'>
              Login:
            </h1>
          </div>

          {error && <div className='text-red-500 mb-4'>{error}</div>}

          <div className='mb-6'>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='username'
            >
              Username
            </label>
            <input
              ref={emailInputRef}
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500'
              type='text'
              id='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              onFocus={() => handleInputFocus(emailInputRef)}
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              ref={passwordInputRef}
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500'
              type='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => handleInputFocus(passwordInputRef)}
            />
          </div>

          <button
            type='submit'
            className='bg-gradient-to-r from-cyan-950 via-teal-700 to-emerald-950 hover:bg-gradient-to-r hover:from-teal-700 hover:via-cyan-950 hover:to-emerald-950 text-white font-bold py-3 px-6 text-center rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300'
          >
            Login
          </button>
          <div className='mt-5 text-center flex flex-col md:flex-row md:justify-between'>
            <Link
              to='/forgot-password'
              className='text-md text-sky-600 hover:text-green-700'
            >
              Forgot Password?
            </Link>
            {/* <p className="mt-2 md:mt-0">
              Don't have access? Click here{' '}
              <Link to="/login/register" className="text-sky-500">
                to register
              </Link>
            </p> */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
