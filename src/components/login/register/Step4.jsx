/* eslint-disable no-unused-vars */
import { useState } from "react";
import login from '../../../assets/images/login3.webp'
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from "react-router-dom";

const Step4 = () => {
    const [otp, setOTP] = useState('');
//   const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

//   const handleCaptchaVerification = (value) => {
//     setCaptchaVerified(true);
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='flex flex-col md:flex-row bg-white items-center justify-between min-h-screen '>
      <div className='relative bg-cover bg-center h-1/2 md:h-screen md:w-[60%] overflow-hidden'>
        <div className='relative z-10 flex flex-col items-center justify-center h-full'>
          <ul className='  text-2xl bg-white p-4 rounded-xl border-2 border-white bg-opacity-40 py- text-white text-center space-y-2 gap-5'>
            <li className='hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:via-green-500 hover:to-neutral-50'>
              Experience seamless access across platforms with our single-login
              solution.
            </li>
            <li className='hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:via-green-500 hover:to-neutral-50'>
              Enhanced security, convenience, and scalability
            </li>
          </ul>
        </div>
        <img
          src={login}
          alt='login'
          className='absolute inset-0 w-full h-full object-cover blur-sm'
        />
      </div>
      <div className='md:w-[40%] h-1/2 md:h-screen  flex items-center justify-center'>
      <form onSubmit={handleSubmit} className="flex flex-col bg-white w-full h-screen max-w-3xl pt-40 p-8 shadow-lg">
      <div className='flex justify-center'>
            <h1 className='flex justify-center text-4xl px-60 text-white bg-gradient-to-r from-cyan-950 via-teal-700 to-emerald-950 mb-10 w-56 py-2 text-center rounded-xl'>
              Register:
            </h1>
          </div>
          <div className='bg-gray-200 rounded-xl p-3 h-auto py-7'>
        <div className="mb-4">
          <label htmlFor="otp" className="block font-bold mb-2">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleOTPChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <ReCAPTCHA
            sitekey="YOUR_SITE_KEY"
            // onChange={handleCaptchaVerification}
          />
        </div>
        <div className='flex justify-center'>
              <Link
                to='/login'
                type='submit'
                className=' bg-gradient-to-r from-cyan-950 via-teal-700 to-emerald-950 hover:bg-gradient-to-r hover:from-teal-700 hover:via-cyan-950 hover:to-emerald-950 hover:delay-1000 text-white font-bold py-3 px-52 text-center rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300'
              >
                Sumbit
              </Link>
            </div>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Step4
