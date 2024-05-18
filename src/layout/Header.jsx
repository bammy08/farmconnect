import React from 'react';
import { FaList } from 'react-icons/fa';
import admin_logo from '../images/admin.jpg';

const Header = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className="fixed top-0 left-0 w-full py-1 px-2 lg:px-7 z-30">
      <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#eeb592] px-5 transition-all">
        <div
          className="flex w-[35px] lg:hidden h-[35px] rounded-sm bg-green-500 shadow-lg hover:shadow-green-500/50 justify-center items-center cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <span className="text-white">
            <FaList />
          </span>
        </div>

        <div className="hidden md:block">
          <input
            className="px-3 py-2 outline-none focus:border-green-300 border bg-transparent border-orange-700 rounded-md text-white overflow-hidden"
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>
        <div className="flex justify-center items-center gap-3 relative">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end">
                <h2 className="font-semibold">Olusola Bamidele</h2>
                <span className="text-[14px] w-full font-normal">Admin</span>
              </div>
              <img
                className="w-12 h-12 rounded-full overflow-hidden"
                src={admin_logo}
                alt="admin-logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
