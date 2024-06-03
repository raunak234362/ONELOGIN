import { FaGithub, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

const Footer = () => {
  return (
    <div className='fixed w-full h-14 bottom-0 flex bg-zinc-500 justify-between items-center px-6'>
    <div className='copyright'>
      <p className='text-white'>
      Copyright © 2024 by Whiteboard Technologies Pvt. Ltd. All rights reserved.
      </p>
    </div>
    <div className='footer-link-icon flex flex-row gap-3'>
      <FaGithub />
      <FaXTwitter />
      <FaLinkedin />
    </div>
  </div>
  )
}

export default Footer
