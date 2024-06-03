/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../../../assets/logo.png"
import { BiHome } from "react-icons/bi"

import profile from "../../../assets/user.jpg"
import { MdLogout } from "react-icons/md"
import { useState } from "react"
import { useUser } from "../../../hooks/useUser"



const Sidebar = ({ activeLink, handleNavLinkClick }) => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const {user} = useUser();

  const fetchLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access");
      const response = await fetch("https://wbt-onelogin.onrender.com/api/v1/user/logut/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/')
    }
  }

  const fetchUser = async () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${localStorage.getItem("token")}`);
    myHeaders.append("Cookie", `token=${localStorage.getItem("token")}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch("https://wbt-projecttimeline.onrender.com/api/user/all", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log(data?.data);
        setUsers(data?.data);
      })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };



  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="fixed left-0 flex flex-col justify-between h-screen px-0 py-4 border-green-500 border-r-2 ">
      <div className='navbar-section'>
        <div className="flex justify-center px-2">
          <img src={logo} className="w-60" />
        </div>
        <nav className="space-y-4 mt-11">
          <Link
            to="/user"
            onClick={() => handleNavLinkClick("user")}
            className={`flex items-center gap-2 px-5 py-2 transition-colors duration-300 ${pathname === "/user"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
              }`}
          >
            <BiHome className="text-xl" />
            <span>User</span>
          </Link>
          <Link
            to="/user/project"
            onClick={() => handleNavLinkClick("project")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${pathname === "/user/project"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
              }`}
          >
            <BiHome className="text-xl" />
            <span>Project</span>
          </Link>
          <Link
            to="/user/task"
            onClick={() => handleNavLinkClick("task")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${pathname === "/user/task"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
              }`}
          >
            <BiHome className="text-xl" />
            <span>Task</span>
          </Link>

        </nav>
      </div>
      <div className='profile-logout mb-4 px-4'>
      <div className='flex flex-row items-center gap-4 mb-4'>
          <img
            src={profile}
            alt='user profile'
            className='rounded-full w-10 cursor-pointer'
          />
          <p className='text-black'>{user?.username}</p>
        </div>
        <div className='flex flex-row items-center hover:bg-red-600 hover:text-white py-2 px-3 gap-4 mb-4  rounded-lg'>
          <MdLogout />
          <button
            onClick={fetchLogout}
            className='text-sm  hover:text-white w-full text-center'
          >
            Logout
          </button>
        </div>

      </div>


    </div>
  )
}

export default Sidebar
