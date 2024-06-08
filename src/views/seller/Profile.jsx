import React, { useEffect, useState } from 'react';
import { FaImages } from 'react-icons/fa6';
import { FadeLoader, PulseLoader } from 'react-spinners';
import { FaEdit, FaRegEdit } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
  add_profile_info,
  messageClear,
  profile_image_upload,
} from '../../store/Reducers/authReducer';
import toast from 'react-hot-toast';
import { overrideStyles } from '../../utils/utils';

const Profile = () => {
  const [state, setState] = useState({
    phone: '',
    shopName: '',
  });

  const dispatch = useDispatch();
  const { userInfo, loader, successMessage } = useSelector(
    (state) => state.auth
  );

  const status = 'active';

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const addImage = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage]);

  const addInfo = (e) => {
    e.preventDefault();
    console.log('Dispatching add_profile_info with state: ', state);
    dispatch(add_profile_info(state));
  };

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#0ea018] rounded-md">
            <div className="flex justify-center items-center py-3">
              {userInfo?.image ? (
                <label
                  htmlFor="img"
                  className="h-[210px] w-[300px] relative p-3 cursor-pointer overflow-hidden"
                >
                  <img className="w-full h-full" src={userInfo.image} alt="" />
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
                  className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>
                    <FaImages />
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={addImage}
                type="file"
                className="hidden"
                id="img"
              />
            </div>
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-green-200 rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer text-white">
                  <FaEdit />
                </span>
                <div className="flex gap-2">
                  <span>Name : </span>
                  <span>{userInfo.username}</span>
                </div>
                <div className="flex gap-2">
                  <span>Email : </span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex gap-2">
                  <span>Role : </span>
                  <span>{userInfo.role}</span>
                </div>
                <div className="flex gap-2">
                  <span>Status : </span>
                  <span>{userInfo.status}</span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account : </span>
                  <p>
                    {userInfo.payment === 'inactive' ? (
                      <span className="bg-red-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded ">
                        {userInfo.payment}
                      </span>
                    ) : (
                      <span className="bg-blue-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded ">
                        click active
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-0 md:px-5 py-2">
              {!userInfo?.shopInfo ? (
                <form onSubmit={addInfo}>
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-white" htmlFor="shop">
                      Shop Name
                    </label>
                    <input
                      onChange={inputHandle}
                      value={state.shopName}
                      className="px-4 py-2 mb-3 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                      type="text"
                      name="shopName"
                      id="shop"
                      placeholder="Shop Name"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-white" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      onChange={inputHandle}
                      value={state.phone}
                      className="px-4 py-2 mb-3 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="e.g 08035812488"
                    />
                  </div>
                  <button
                    disabled={loader ? true : false}
                    type="submit"
                    className="bg-orange-500 w-[230px] hover:shadow-orange-700/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2"
                  >
                    {loader ? (
                      <PulseLoader cssOverride={overrideStyles} />
                    ) : (
                      'Update Info'
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-green-200 rounded-md relative">
                  <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer text-white">
                    <FaEdit />
                  </span>
                  <div className="flex gap-2">
                    <span>Shop Name : </span>
                    <span>{userInfo.shopInfo?.shopName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Phone Number : </span>
                    <span>{userInfo.shopInfo?.phone}</span>
                  </div>
                </div>
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
