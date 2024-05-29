import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import logo from '../../images/admin.jpg';
import logo2 from '../../images/seller.png';
import { FaList } from 'react-icons/fa6';

const ChatSeller = () => {
  const [show, setShow] = useState(false);
  const sellerId = 65;
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#0ea018] rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? '-left-[16px]' : '-left-[336px]'
            } md:left-0 md:relative transition-all `}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-green-200 md:bg-transparent overflow-y-auto">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-gray-600 md:text-white">
                <h2>Sellers</h2>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoMdClose />
                </span>
              </div>
              <div
                className={`h-[60px] flex justify-start gap-2 items-start text-white px-2 py-2  cursor-pointer bg-green-500 rounded-md`}
              >
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] rounded-full border-gray-500 md:border-gray-300 border-2  max-w-[38px] p-1"
                    src={logo}
                    alt="logo"
                  />
                  <div className="w-[10px] h-[10px] bg-green-600 md:bg-green-200 rounded-full absolute right-0 bottom-0"></div>
                </div>
                <div className="flex justify-center items-start flex-col w-full">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="mt-[6px]  font-medium text-gray-500 md:text-white ">
                      Bamidele Olusola
                    </h2>
                  </div>
                </div>
              </div>
              <div
                className={`h-[60px] flex justify-start gap-2 items-start text-white px-2 py-2 rounded-sm cursor-pointer`}
              >
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] rounded-full border-gray-500 md:border-gray-300 border-2  max-w-[38px] p-1"
                    src={logo}
                    alt="logo"
                  />
                  <div className="w-[10px] h-[10px] bg-green-600 md:bg-green-200 rounded-full absolute right-0 bottom-0"></div>
                </div>
                <div className="flex justify-center items-start flex-col w-full">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="mt-[6px]  font-medium text-gray-500 md:text-white ">
                      Bamidele Samuel
                    </h2>
                  </div>
                </div>
              </div>
              <div
                className={`h-[60px] flex justify-start gap-2 items-start text-white px-2 py-2 rounded-sm cursor-pointer`}
              >
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] rounded-full border-gray-500 md:border-gray-300 border-2  max-w-[38px] p-1"
                    src={logo}
                    alt="logo"
                  />
                  <div className="w-[10px] h-[10px] bg-green-600 md:bg-green-200 rounded-full absolute right-0 bottom-0"></div>
                </div>
                <div className="flex justify-center items-start flex-col w-full">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="mt-[6px]  font-medium text-gray-500 md:text-white ">
                      Bamidele Favour
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex justify-between items-center">
              {sellerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[45px] h-[45px] rounded-full border-gray-500 md:border-gray-300 border-2  max-w-[45px] p-1"
                      src={logo}
                      alt="logo"
                    />
                    <div className="w-[10px] h-[10px] bg-green-600 md:bg-green-200 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                </div>
              )}
              <div
                onClick={() => setShow(!show)}
                className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-green-500 shadow-lg hover:shadow-green-500/50 justify-center cursor-pointer items-center text-white"
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>
            <div className="py-4">
              <div className="bg-green-400 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                <div className="w-full flex justify-start items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 max-w-full lg:max-w-[85%]">
                    <div className="">
                      <img
                        className="w-[45px] h-[45px] rounded-full border-gray-500 md:border-gray-400 border-2  max-w-[45px] p-1"
                        src={logo}
                        alt="logo"
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-2 px-2 rounded-sm">
                      <span>How are you doing?</span>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end items-center py-3">
                  <div className="flex justify-start items-start gap-2 md:px-3 max-w-full lg:max-w-[85%]">
                    <div className="flex justify-center items-start flex-col w-full bg-red-500 shadow-lg shadow-red-500/50 text-white py-2 px-2 rounded-sm">
                      <span>How are you doing?</span>
                    </div>
                    <div className="">
                      <img
                        className="w-[45px] h-[45px] rounded-full border-gray-500 md:border-gray-400 border-2  max-w-[45px] p-1"
                        src={logo2}
                        alt="logo"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-start items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 max-w-full lg:max-w-[85%]">
                    <div className="">
                      <img
                        className="w-[45px] h-[45px] rounded-full border-gray-500 md:border-gray-400 border-2  max-w-[45px] p-1"
                        src={logo}
                        alt="logo"
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-2 px-2 rounded-sm">
                      <span>How can I order?</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form className="flex gap-3">
              <input
                type="text"
                placeholder="Type your message....."
                className="w-full justify-between items-center px-1 py-2 border border-green-300 focus:border-green-100 rounded-md outline-none bg-gray-100 text-gray-700"
              />
              <button className="bg-orange-500 w-[150px] font-bold hover:shadow-orange-700/40 hover:shadow-md text-white rounded-md px-7 py-2">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSeller;
