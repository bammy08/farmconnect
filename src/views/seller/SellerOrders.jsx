import React, { useState } from 'react';
import Search from '../components/Search';
import Pagination from '../Pagination';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';

const SellerOrders = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <h1 className=" font-semibold text-lg mb-3">Orders</h1>
      <div className="w-full p-4 bg-[#0ea018] rounded-md">
        <Search />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-white uppercase">
            <thead className="text-sm text-white uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price (NGN)
                </th>

                <th scope="col" className="py-3 px-4">
                  Location
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>

                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    #35467
                  </td>

                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    8654
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    Port Harcourt
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>

                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to="/seller/dashboard/orders/details/4"
                        className="p-2 bg-green-300 rounded cursor-pointer "
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

export default SellerOrders;
