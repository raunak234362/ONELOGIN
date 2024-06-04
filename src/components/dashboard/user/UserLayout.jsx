import { useState } from 'react'
import Sidebar from './Sidebar'
import {  Route, Routes } from 'react-router-dom'
import Header from './Header'
import Dashboard from './Dashboard'
import { FaBars, FaTimes } from 'react-icons/fa'
import Project from './Project'
import Task from './Task'

const UserLayout = () => {
  const [activeLink, setActiveLink] = useState('user')
  const [showSidebar, setShowSidebar] = useState(false)

  const handleNavLinkClick = link => {
    setActiveLink(link)
  }
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className='flex flex-col md:flex-row gap-5 min-h-screen relative'>
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
          showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-52 transform bg-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 md:shadow-none ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div onClick={e => e.stopPropagation()}>
          <Sidebar
            activeLink={activeLink}
            handleNavLinkClick={handleNavLinkClick}
          />
            
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1'>
        {/* Header with Toggler Button */}
        <div className='flex justify-between items-center bg-white/70 p-4 rounded-lg shadow-md mb-4 border-b border-neutral-700/80'>
          <Header activeLink={activeLink} />
          <button
            className='md:hidden text-gray-600 hover:text-gray-800 focus:outline-none'
            onClick={toggleSidebar}
          >
            {showSidebar ? (
              <FaTimes className='text-2xl' />
            ) : (
              <FaBars className='text-2xl' />
            )}
          </button>
        </div>

        {/* Content */}
        <div className='flex-1 rounded-lg h-auto pb-20'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/project' element={<Project />} />
            <Route path='/task' element={<Task />} />
            
          </Routes>
        </div>
        
      </div>
    </div>
  )
}

export default UserLayout
