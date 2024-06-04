/* eslint-disable react/no-unescaped-entities */
import { CgProfile } from "react-icons/cg";
import { ClientData, ClientUserData } from "../../../SampleData";
import { ImProfile } from "react-icons/im";

const Client = () => {
  return (
    <div>
    {/* Row Nav */}
      <div className="flex flex-row gap-2 mx-5 my-5">
        <div className="flex flex-col justify-center rounded-xl shadow-xl p-5 w-[25%] h-48 gap-5">
          <ImProfile className="text-3xl text-green-500 mx-auto text-center" />
          <h1 className="text-2xl font-bold text-gray-800 mx-auto">
            Add Client
          </h1>
          <button className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700">Add</button>
        </div>
        <div className="flex flex-col justify-center rounded-xl shadow-xl p-5 w-[25%] h-48 gap-5">
          <CgProfile className="text-3xl text-green-500 mx-auto text-center" />
          <h1 className="text-2xl font-bold  text-gray-800 mx-auto">
            Add Client User
          </h1>
          <button className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700">Add</button>
        </div>
        <div className="flex flex-col justify-center rounded-xl shadow-xl p-5 w-[25%] h-48 gap-5">
          <h1 className="text-2xl font-bold text-gray-800 mx-auto">
            Total Client
          </h1>
          <p className="text-2xl mx-auto">{ClientData.length}</p>
        </div>
        <div className="flex flex-col justify-center rounded-xl shadow-xl p-5 w-[25%] h-48 gap-5">
          <h1 className="text-2xl font-bold text-gray-800 mx-auto">
            Total Client User
          </h1>
          <p className="text-2xl mx-auto">{ClientUserData.length}</p>
        </div>
      </div>

    <div className="flex flex-row gap-5 mx-5 my-5">
        <div className="bg-white shadow-xl p-5">
            Pie Chart
        </div>
        <div className="bg-white shadow-xl p-5">
            Table
            </div>
        </div>

    {/* Client List */}
      <div className=" mx-5 p-5 my-10 h-96 table-container bg-white rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-left">Client List</h1>
        <div className="overflow-y-auto h-80 p-2">

        <table className="w-full h-full table-auto border-collapse text-center ">
          <thead>
            <tr className="bg-green-400 text-lg">
              <th className="px-1 py-3">S.No</th>
              <th className="px-3 py-3">Company Name</th>
              <th className="px-1 py-3">State</th>
              <th className="px-1 py-3">Country</th>
              <th className="px-3 py-3">Phone Number</th>
              <th className="px-1 py-3">Option</th>
            </tr>
          </thead>
          <tbody>
            {ClientData.map((data, index) => (
              <tr key={index} className="bg-gray-100 hover:bg-gray-200 text-lg">
                <td className="border px-1 py-3">{index + 1}</td>
                <td className="border px-3 py-3">{data.clientName}</td>
                <td className="border px-1 py-3">{data.state}</td>
                <td className="border px-1 py-3">{data.country}</td>
                <td className="border px-3 py-3">{data.phoneNumber}</td>
                <td className="border px-1 py-3"></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    {/* Client's User List */}
      <div className="mx-5 p-5 my-10 h-full table-container bg-white rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-left">Client's User List</h1>
        <div className="overflow-y-auto h-80">

        <table className="w-full table-auto border-collapse text-center ">
          <thead>
            <tr className="bg-green-400 text-lg">
              <th className="px-1 py-3">S.No</th>
              <th className="px-3 py-3">Client Name</th>
              <th className="px-1 py-3">Phone Number</th>
              <th className="px-1 py-3">Email</th>
              <th className="px-3 py-3">Company</th>
              <th className="px-1 py-3">Option</th>
            </tr>
          </thead>
          <tbody>
            {ClientUserData.map((data, index) => (
              <tr key={index} className="bg-gray-100 hover:bg-gray-200 text-lg">
                <td className="border px-1 py-3">{index + 1}</td>
                <td className="border px-3 py-3">{data.name}</td>
                <td className="border px-1 py-3">{data.phoneNumber}</td>
                <td className="border px-1 py-3">{data.email}</td>
                <td className="border px-3 py-3">{data.company}</td>
                <td className="border px-1 py-3"></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Client;
