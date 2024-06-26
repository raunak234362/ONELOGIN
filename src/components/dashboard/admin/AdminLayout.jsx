import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Project from "./Project";
import Task from "./Task";
import User from "./User";
import Header from "./Header";
import Footer from "./Footer";
import Fabricator from "./Fabricator";
import Calender from "./Calender";
import Client from "./Client";
import UserGroup from "./UserGroup";

const AdminLayout = () => {
  const [activeLink, setActiveLink] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
    setShowSidebar(false); // Close sidebar on link click in mobile view
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen relative">
      <div
        className={`fixed inset-0 z-0 bg-black bg-opacity-50  transition-opacity duration-300 md:hidden ${
          showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed inset-0 left-0 h-fit z-20 w-52  transform bg-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 md:shadow-none ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <Sidebar
            activeLink={activeLink}
            handleNavLinkClick={handleNavLinkClick}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 rounded-lg h-auto overflow-y-auto">
        {/* Header with Toggler Button */}
        <div className="flex justify-between items-center bg-white/70 p-4 rounded-lg shadow-lg shadow-green-200 mb-4 border-b border-green-700/80">
          <Header activeLink={activeLink} />
          <button
            className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={toggleSidebar}
          >
            {showSidebar ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 rounded-lg h-auto pb-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/project" element={<Project />} />
            <Route path="/client" element={<Client />} />
            <Route path="/task" element={<Task />} />
            <Route path="/user" element={<User />} />
            <Route path="/fabricator" element={<Fabricator />} />
            <Route path="/usergroup" element={<UserGroup />} />
            <Route path="/calender" element={<Calender />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
