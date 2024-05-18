import React from 'react';
import { FaUsers } from 'react-icons/fa6';
import {
  MdOutlineProductionQuantityLimits,
  MdOutlineShoppingCart,
} from 'react-icons/md';
import { TbCurrencyNaira } from 'react-icons/tb';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import admin_logo from '../../images/admin.jpg';

const AdminDashboard = () => {
  const state = {
    series: [
      {
        name: 'Orders',
        data: [34, 65, 34, 65, 34, 34, 34, 56, 23, 67, 23, 45],
      },
      {
        name: 'Revenue',
        data: [34, 32, 45, 32, 34, 34, 43, 56, 65, 67, 45, 78],
      },
      {
        name: 'Sellers',
        data: [78, 32, 34, 54, 65, 34, 54, 21, 54, 43, 45, 43],
      },
    ],
    options: {
      color: ['#181ee8', '#181ee8'],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: 'transparent',
        foreColor: '#d0d2d6',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: ['smooth', 'straight', 'stepline'],
        lineCap: 'butt',
        colors: '#f0f0f0',
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      legend: {
        position: 'top',
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apl',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: '550px',
            },
          },
        },
      ],
    },
  };

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-3 bg-[#f6e699] rounded-md gap-2">
          <div className="flex flex-col justify-start items-start text-[#0b0808]">
            <span className="flex justify-center items-center text-2xl font-bold">
              <TbCurrencyNaira size={30} />
              <span>565</span>
            </span>
            <span className="font-semibold">Total Sales</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#d9d60f] flex justify-center items-center text-white">
            <TbCurrencyNaira size={30} />
          </div>
        </div>
        <div className="flex justify-between items-center p-3 bg-[#63eaa7] rounded-md gap-2">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <span className="text-2xl font-bold">50</span>
            <span className="font-semibold">Products</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#169d16] flex justify-center items-center text-white">
            <MdOutlineProductionQuantityLimits size={28} />
          </div>
        </div>
        <div className="flex justify-between items-center p-3 bg-[#9ea1e5] rounded-md gap-2">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <span className="text-2xl font-bold">45</span>
            <span className="font-semibold">Sellers</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#2947dc] flex justify-center items-center text-white">
            <FaUsers size={30} />
          </div>
        </div>
        <div className="flex justify-between items-center p-3 bg-[#fae8e8] rounded-md gap-2">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <span className="text-2xl font-bold">20</span>
            <span className="font-semibold">Orders</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#df6060] flex justify-center items-center text-white">
            <MdOutlineShoppingCart size={30} />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="bg-[#0ea018] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#0ea018]  rounded-md p-4 text-white ">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-white">
                Recent seller message
              </h2>
              <Link className="font-semibold text-sm text-white">View all</Link>
            </div>
            <div className="flex flex-col gap-2 pt-6 text-white">
              <ol className="relative border-1 border-green-600 ml-4">
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4ce26c] rounded-full z-10">
                    <img
                      className="w-full h-full rounded-full shadow-lg"
                      src={admin_logo}
                      alt="admin-logo"
                    />
                  </div>
                  <div className="p-3 bg-green-200 text-black rounded-lg border border-green-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link>Admin</Link>
                      <time className="text-sm mb-1 font-normal sm:order-last sm:mb-0">
                        2 days ago
                      </time>
                    </div>
                    <div className="p-2 text-xs text-white font-normal bg-green-700 rounded-lg border border-green-800">
                      hello there, how are you?
                    </div>
                  </div>
                </li>
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4ce26c] rounded-full z-10">
                    <img
                      className="w-full h-full rounded-full shadow-lg"
                      src={admin_logo}
                      alt="admin-logo"
                    />
                  </div>
                  <div className="p-3 bg-green-200 text-black rounded-lg border border-green-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link>Admin</Link>
                      <time className="text-sm mb-1 font-normal sm:order-last sm:mb-0">
                        2 days ago
                      </time>
                    </div>
                    <div className="p-2 text-xs text-white font-normal bg-green-700 rounded-lg border border-green-800">
                      hello there, how are you?
                    </div>
                  </div>
                </li>
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4ce26c] rounded-full z-10">
                    <img
                      className="w-full h-full rounded-full shadow-lg"
                      src={admin_logo}
                      alt="admin-logo"
                    />
                  </div>
                  <div className="p-3 bg-green-200 text-black rounded-lg border border-green-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link>Admin</Link>
                      <time className="text-sm mb-1 font-normal sm:order-last sm:mb-0">
                        2 days ago
                      </time>
                    </div>
                    <div className="p-2 text-xs text-white font-normal bg-green-700 rounded-lg border border-green-800">
                      hello there, how are you?
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-[#0ea018] rounded-md mt-6">
        <div className="flex justify-between item-center">
          <h2 className="font-semibold text-lg text-white pb-1">
            Recent Orders
          </h2>
          <Link className="font-semibold text-sm text-white">View All</Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-white uppercase border-b border-slate-700">
            <thead className="text-sm text-white uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    #7563523
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    $654
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <Link> View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
