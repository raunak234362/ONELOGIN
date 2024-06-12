/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { BiHome, BiMoney } from "react-icons/bi";
import { IoBagAdd } from "react-icons/io5";
import { GoProject } from "react-icons/go";
import { FaTasks, FaTools } from "react-icons/fa";

import profile from "../../../assets/user.jpg";
import { MdLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { Calendar, User, Users } from "lucide-react";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { ImOffice } from "react-icons/im";

const Sidebar = ({ activeLink, handleNavLinkClick }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const fetchLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access");
      const response = await fetch(
        "/api/v1/user/logut/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  };



  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="fixed left-0 flex flex-col justify-between h-screen px-0 pt-4 border-green-500 border-r-2">
      <div className="navbar-section">
        <div className="flex justify-center px-2">
          <img src={logo} className=" w-60" />
        </div>
        <nav className="space-y-4 mt-11">
          <Link
            to="/admin"
            onClick={() => handleNavLinkClick("dashboard")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${
              pathname === "/admin"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
            }`}
          >
            <BiHome className="text-xl" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/usergroup"
            onClick={() => handleNavLinkClick("department")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${
              pathname === "/admin/department"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700 "
            }`}
          >
            <Users className="text-xl" />
            <span>User Group</span>
          </Link>
          <Link
            to="/admin/user"
            onClick={() => handleNavLinkClick("user")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${
              pathname === "/admin/user"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
            }`}
          >
            <User className="text-xl" />
            <span>User</span>
          </Link>
          <Link
            to="/admin/fabricator"
            onClick={() => handleNavLinkClick("user")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${
              pathname === "/admin/fabricator"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
            }`}
          >
            <FaTools className="text-xl" />
            <span>Fabricator</span>
          </Link>
          {/* <Link
            to="/admin/client"
            onClick={() => handleNavLinkClick("user")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${
              pathname === "/admin/client"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
            }`}
          >
            <ImOffice className="text-xl" />
            <span>Client</span>
          </Link> */}
          <Link
            to="/admin/project"
            onClick={() => handleNavLinkClick("project")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${
              pathname === "/admin/project"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
            }`}
          >
            <GoProject className="text-xl" />
            <span>Project</span>
          </Link>
          <Link
            to="/admin/task"
            onClick={() => handleNavLinkClick("task")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${
              pathname === "/admin/task"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
            }`}
          >
            <FaTasks className="text-xl" />
            <span>Task</span>
          </Link>
          <Link
            to="/admin/calender"
            onClick={() => handleNavLinkClick("calender")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${
              pathname === "/admin/calender"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
            }`}
          >
            <Calendar className="text-xl" />
            <span>Calender</span>
          </Link>
        </nav>
      </div>
      <div className="profile-logout px-4">
        <div className="flex flex-row items-center gap-4 mb-4">
          <img
            src={profile}
            alt="user profile"
            className="rounded-full w-10 cursor-pointer"
          />
          <p className="text-black">{user?.username}</p>
        </div>
        <div className="flex flex-row items-center hover:bg-green-600 hover:text-white py-2 px-3 gap-4 mb-4  rounded-lg">
          <MdLogout className="text-2xl"/>
          <button
            onClick={fetchLogout}
            className="text-lg  hover:text-white w-full text-center"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
