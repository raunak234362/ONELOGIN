/* eslint-disable react/prop-types */
// LoginLayout.jsx
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import RegisterLayout from "./register/RegisterLayout";

const LoginLayout = () => {
  
  return (
    <div className="bg-gradient-to-r from-cyan-700 via-blue-950 to-slate-900 mt-0">
      <Routes>
        <Route path="" element={<Login/>} />
        <Route path="/register/*" element={<RegisterLayout />} />
      </Routes>
    </div>
  );
};

export default LoginLayout;