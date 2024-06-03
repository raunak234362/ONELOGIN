import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/logo.png"

const Footer = () => {
  return (
    <div className="mt-7 h-96 bg-slate-100 flex flex-col justify-between">
      <div className=" py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex justify-between gap-5">
          <div>
            <img src={logo} alt="Sitemark Logo" className="h-8" />
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Newsletter</h3>
              <p className="text-gray-600">
                Subscribe to our newsletter for weekly updates and promotions.
              </p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product</h3>
            <ul className="text-gray-600">
              <li>Features</li>
              <li>Testimonials</li>
              <li>Highlights</li>
              <li>Pricing</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="text-gray-600">
              <li>About us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Legal</li>
              <ul className="ml-4">
                <li>Terms</li>
                <li>Privacy</li>
              </ul>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-2 flex gap-2">
              <FaFacebook className="text-blue-600" />
              <FaTwitter className="text-blue-400" />
              <FaInstagram className="text-pink-500" />
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div className='bottom-1 mt-6 w-full h-16 flex bg-black justify-between items-center px-6'>
      <div className='copyright'>
        <p className='text-white'>
        Copyright © 2024 by Whiteboard Technologies Pvt. Ltd. All rights reserved.
        </p>
      </div>
      <div className='footer-link-icon flex flex-row gap-3 text-white'>
        <FaGithub />
        <FaXTwitter />
        <FaLinkedin />
      </div>
    </div>
    </div>
  )
}

export default Footer
