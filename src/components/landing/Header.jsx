/* eslint-disable react/no-unescaped-entities */
import image1 from "../../assets/images/image1.png"

const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="header-content">
          <h1 className="xl:text-6xl sm:text-md text-center mt-10 font-semibold">Whiteboard's OneLogin</h1>
          <p className="text-center text-2xl text-gray-950 mt-3">
            Whiteboard's OneLogin is the easiest way to add authentication to your web and
            mobile apps.
          </p>
          <div className="mt-8 flex justify-center">
            <input
              type="text"
              placeholder="Search email..."
              className="px-4 py-2 mr-1 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-64 rounded-2xl"
            />
            <button className="px-4 py-2 ml-1 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 rounded-2xl">
              Search
            </button>
          </div>
            <p className="text-center mt-2 text-1m">By clicking "Start now" you agree to our Terms & Conditions.</p>
        </div>
        <div className="flex justify-center mt-20 ">
            <img src={image1} alt="image1" className="rounded-2xl shadow-lg shadow-green-400/50 w-9/12" />
        </div>
      </div>
    </div>
  )
}

export default Header
