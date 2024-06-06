/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Routes, Route } from "react-router-dom";
import LoginLayout from "./components/login/LoginLayout";
import { Landing } from "./components/landing/Landing";
import AdminLayout from "./components/dashboard/admin/AdminLayout";
import Login from "./components/login/Login";
import { useState } from "react";
import UserLayout from "./components/dashboard/user/UserLayout";
import { useUser } from "./hooks/useUser";

function App() {
  const { user } = useUser();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login/*" element={<LoginLayout />} />
        <Route
          path="/admin/*"
          element={
            user?.userGroup?.accessLevel === "admin" || user?.userGroup?.accessLevel === "manager"
              ? <AdminLayout />
              : <Login />
          }
        />
        <Route
          path="/user/*"
          element={
            user?.userGroup?.accessLevel === "user"
              ? <UserLayout />
              : <UserLayout />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
