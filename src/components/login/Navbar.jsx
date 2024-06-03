import { Menu, X } from 'lucide-react'
import { useState } from 'react'
// import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  // const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen)
  }
  // const toggleProfileDropdown = () => {
  //   setProfileDropdownOpen(!profileDropdownOpen)
  // }
  return (
    <div className='nav sticky top-5 z-50 py-3 sm:w-3/4 sm:mx-auto bg-white/70 border-b border-neutral-700/80 mt-0 md:mx-auto rounded-3xl backdrop-blur-sm shadow-lg shadow-white-400/50'>
      <div className='container px-4 mx-auto relative text-m'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center flex-shrink-0'>
            <img className='h-10 w-auto mr-2' src={logo} alt='logo' />
          </div>
          <ul className='hidden md:flex mt-3 space-x-12'>
            {/* <li className='hover:bg-green-500/50 px-3 rounded-xl'>
              <Link to='/dashboard'>Dashboard</Link>
            </li> */}
            <li className='hover:bg-green-500/50 px-3 rounded-xl'>
              Application
            </li>
            <li className='hover:bg-green-500/50 px-3 rounded-xl'>Service</li>
            <li className='hover:bg-green-500/50 px-3 rounded-xl'>FAQ</li>
          </ul>
          <div className='hidden md:flex justify-center space-x-12 items-center relative'>
            <div className='relative'>
              <button className=' px-5 py-2 bg-green-300 hover:bg-green-700 rounded-xl'>Register</button>
            </div>
          </div>
          <div className='md:hidden flex justify-end'>
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className='fixed top-0 left-0 right-0 bottom-0 z-20 bg-neutral-100/80 flex justify-center items-center md:hidden'>
            <div className='bg-white w-full max-w-md p-6 rounded-2xl'>
              <div className='flex justify-between items-center mb-6'>
                
                <button className=' bg-gradient-to-r from-slate-900 via-sky-950 to-gray-900 px-10 py-1 rounded-2xl shadow-lg shadow-green-400/50'>
                  Logout
                </button>
              </div>
              <ul className='space-y-4'>
                <li>Dashboard</li>
                <li>Application</li>
                <li>Feautures/Service</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
