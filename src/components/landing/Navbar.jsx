import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { useUser } from '../../hooks/useUser'
// import profile from '../../assets/profile-pictures/user5.jpg'
const Navbar = () => {
  
  const {user} = useUser();


  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  // const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen)
  }
  // const toggleProfileDropdown = () => {
  //   setProfileDropdownOpen(!profileDropdownOpen)
  // }
  return (
    <div className='nav sticky top-3 z-50 py-3 sm:w-3/4 sm:mx-auto  bg-white/70 border-b border-neutral-700/80 md:mx-auto rounded-3xl backdrop-blur-sm shadow-lg shadow-white-400/50'>
      <div className='container px-4 mx-auto relative text-m'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center flex-shrink-0'>
            <img className='h-10 w-auto mr-2' src={logo} alt='logo' />
          </div>
          <ul className='hidden md:flex mt-3 space-x-12'>
            <li className='hover:bg-green-500/50 px-3 rounded-xl'>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li className='hover:bg-green-500/50 px-3 rounded-xl'>
              Application
            </li>
            <li className='hover:bg-green-500/50 px-3 rounded-xl'>Service</li>
            <li className='hover:bg-green-500/50 px-3 rounded-xl'>FAQ</li>
          </ul>
          <div className='hidden md:flex justify-center space-x-12 items-center relative'>
            {
              console.log(user)
            }
            {
              (user) ? (
                <Link to={
                  (user?.userGroup?.accessLevel === 'admin' || user?.userGroup?.accessLevel === 'manager') ? "/admin/":"/user/"
                } className='bg-green-400 rounded-xl px-5 py-2'>Dashboard</Link>
              ) : (
                <Link to="/login" className='bg-green-400 rounded-xl px-5 py-2'>Login</Link>
              )
            }
          </div>
          {/* <div className='hidden md:flex justify-center space-x-12 items-center relative'>
            <div className='relative'>
              <img
                className='h-10 mx-auto object-cover rounded-full w-10 cursor-pointer'
                src={profile}
                alt='ProfileImg'
                onClick={toggleProfileDropdown}
              />
              {profileDropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Profile
                  </a>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div> */}
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
                {/* <div>
                  <img
                    className='h-10 mx-auto object-cover rounded-full w-10'
                    src={profile}
                    alt='ProfileImg'
                    onClick={toggleProfileDropdown}
                  />
                  {profileDropdownOpen && (
                    <div className='absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        Profile
                      </a>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </div> */}
                <button className='bg-green-300 px-10 py-1 rounded-2xl shadow-lg shadow-green-400/50'>
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
