import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEye } from 'react-icons/fa6';

const SellerRequest = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <h2 className="text-lg mb-3 font-semibold"> Seller Request</h2>

      <div className="w-full p-4 bg-[#0ea018] rounded-md">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-orange-600 outline-none bg-[#88f18f] border border-green-800 rounded-md text-black"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <input
            className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
            type="text"
            placeholder="search"
          />
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-sm text-white uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>

                <th scope="col" className="py-3 px-4">
                  Name
                </th>

                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>

                <th scope="col" className="py-3 px-4">
                  Status
                </th>

                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr className="border-b border-gray-600" key={i}>
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    {d}
                  </td>

                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    Bamidele
                  </td>

                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    olusolabamidele33@gmail.com
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    <span>inactive</span>
                  </td>

                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>

                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to="/admin/dashboard/seller-details/2"
                        className="p-2 bg-green-200 rounded text-gray-600 cursor-pointer "
                      >
                        <FaEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerRequest;
