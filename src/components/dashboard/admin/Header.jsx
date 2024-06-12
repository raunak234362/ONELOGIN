/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import user from '../../../assets/user.jpg'

const Header = ({ activeLink }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen)
  }

  const fetchLogout = async () => {
    const myHeaders = new Headers()
    myHeaders.append('authorization', `Bearer ${localStorage.getItem('token')}`)
    myHeaders.append('Cookie', `token=${localStorage.getItem('token')}`)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    await fetch(
      '/api/user/logout',
      requestOptions
    )
      .then(async response => {})
      .then(result => console.log(result))
      .catch(error => console.error(error))
    localStorage.removeItem('token')
    localStorage.removeItem('type')
    navigate('/')
  }

  return (
    <div className='flex sticky top-3 z-0  justify-between backdrop-blur-sm  items-center'>
      <h1 className='text-2xl text-black'>
        Admin:{' '}
        <span className='font-semibold'>
          {capitalizeFirstLetter(activeLink)}
        </span>
      </h1>
    </div>
  )
}

export default Header
