import React from 'react';
import { FaImages } from 'react-icons/fa6';
import { FadeLoader } from 'react-spinners';
import logo from '../../images/seller.png';
import { FaRegEdit } from 'react-icons/fa';

const Profile = () => {
  const image = true;
  const loader = false;
  const status = 'active';
  const userInfo = true;

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#0ea018] rounded-md">
            <div className="flex justify-center items-center py-3">
              {image ? (
                <label
                  className="h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden"
                  htmlFor="img"
                >
                  <img src={logo} alt="logo" />
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  htmlFor="img"
                  className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-green-300 relative border-gray-100"
                >
                  <span>
                    <FaImages size={20} color="white" />
                  </span>
                  <span className="text-gray-200 font-semibold">
                    select an image
                  </span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input className="hidden" type="file" name="" id="img" />
            </div>
            <div className="px-0 md:px-5 py-2 ">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-green-200 rounded-md relative">
                <span className="p-2 bg-orange-500 text-white rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaRegEdit />
                </span>
                <div className="flex gap-2">
                  <span>Name: </span>
                  <span>Bamidele Olusola</span>
                </div>
                <div className="flex gap-2">
                  <span>Email: </span>
                  <span>olusolabamidele33@gmail.com</span>
                </div>
                <div className="flex gap-2">
                  <span>Phone No: </span>
                  <span>08035812488</span>
                </div>
                <div className="flex gap-2">
                  <span>Role: </span>
                  <span>Seller</span>
                </div>
                <div className="flex gap-2">
                  <span>Status: </span>
                  <span>Active</span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account: </span>
                  <p>
                    {status === 'active' ? (
                      <span className="bg-green-500 cursor-pointer px-1 py-1 rounded text-gray-100 text-sm">
                        Pending
                      </span>
                    ) : (
                      <span className="bg-blue-500 cursor-pointer px-1 py-1 rounded text-gray-100 text-sm">
                        Activate
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span>Location: </span>
                  <span>Rivers</span>
                </div>
              </div>
            </div>
            <div className="px-0 md:px-5 py-2">
              {userInfo && (
                <form>
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-white" htmlFor="shop">
                      Shop Name
                    </label>
                    <input
                      className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                      type="text"
                      name="shopName"
                      id="shop"
                      placeholder="Shop Name"
                    />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0">
            <div className="bg-[#0ea018] text-gray-100 rounded-md p-4">
              <h1 className="text-gray-100 text-lg font-semibold mb-4">
                Change Password
              </h1>
              <form>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label className="text-white" htmlFor="shop">
                    Email
                  </label>
                  <input
                    className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                    type="text"
                    name="shopName"
                    id="shop"
                    placeholder="example@gmail.com"
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3 ">
                  <label className="text-white" htmlFor="shop">
                    Old Password
                  </label>
                  <input
                    className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="old password"
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label className="text-white" htmlFor="shop">
                    New Password
                  </label>
                  <input
                    className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="new password"
                  />
                </div>
              </form>
              <div className="flex">
                <button className="bg-orange-500 hover:shadow-orange-700/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
