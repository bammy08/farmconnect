import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';
import { getNav } from '../navigation/index';
import { BiLogOut } from 'react-icons/bi';

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNav('admin');
    setAllNav(navs);
  }, []);

  return (
    <div>
      <div
        className={`fixed duration-200 ${
          !showSidebar ? 'invisible' : 'visible'
        } w-screen h-screen bg-[#cdd0d280] top-0 left-0 z-10`}
        onClick={() => setShowSidebar(false)}
      ></div>
      <div
        className={`w-[260px] fixed bg-[#adecb6] z-30 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
          showSidebar ? 'left-0' : '-left-[260px] lg:left-0'
        }`}
      >
        <div className="h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[180px] h-[40px]">
            <img className="w-full h-full" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="px-[16px]">
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? 'bg-green-600 shadow-md text-white'
                      : ''
                  } px-3 py-2 rounded-sm flex justify-start font-semibold items-center gap-3 hover:pl-4 transition-all w-full mb-1`}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}

            <li>
              <button className="px-3 py-2 rounded-sm flex justify-start font-bold items-center gap-3 hover:pl-4 transition-all w-full mb-1  text-red-600">
                <span>
                  <BiLogOut />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
