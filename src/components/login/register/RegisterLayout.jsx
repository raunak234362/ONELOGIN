// RegisterLayout.jsx
import { Link, Route, Routes } from "react-router-dom";
// import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Register from "./Register";

const RegisterLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/login/register"></Link>
        {/* <Link to="/login/register/step2"></Link> */}
        <Link to="/login/register/step3"></Link>
        <Link to="/login/register/step4"></Link>
      </nav>
      <Routes>
        <Route path="/" element={<Register />} />
        {/* <Route path="/step2" element={<Step2 />} /> */}
        <Route path="/step3" element={<Step3 />} />
        <Route path="/step4" element={<Step4 />} />
      </Routes>
    </div>
  );
};

export default RegisterLayout;