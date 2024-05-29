import { useState } from 'react';
import { LuArrowDownSquare } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import Search from '../components/Search';

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4 bg-[#0ea018] rounded-md">
        <Search />
        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left text-white">
            <div className="text-sm text-white uppercase border-b border-slate-700">
              <div className="flex justify-between items-center">
                <div className="py-3 w-[25%] font-semibold">Order Id</div>
                <div className="py-3 w-[13%] font-semibold">Price (NGN)</div>
                <div className="py-3 w-[18%] font-semibold">Payment status</div>
                <div className="py-3 w-[18%] font-semibold">order status</div>
                <div className="py-3 w-[18%] font-semibold">action</div>
                <div className="py-3 w-[8%] font-bold">
                  <LuArrowDownSquare size={20} />
                </div>
              </div>
            </div>
            <div className=" text-gray-200  ">
              <div className="flex justify-between items-start border-b border-slate-700">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap">
                  #34567
                </div>
                <div className="py-3 w-[13%] font-medium">400</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">
                  <Link to="/admin/dashboard/order-details/3">View</Link>
                </div>
                <div
                  onClick={(e) => setShow(!show)}
                  className="py-3 w-[8%] font-bold cursor-pointer"
                >
                  <LuArrowDownSquare size={20} />
                </div>
              </div>
              <div
                className={
                  show
                    ? 'block border-b border-slate-700 bg-green-200 text-black rounded-md'
                    : 'hidden'
                }
              >
                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                    #3457
                  </div>
                  <div className="py-3 w-[13%] font-medium">600</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                </div>
                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                    #3457
                  </div>
                  <div className="py-3 w-[13%] font-medium">600</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                </div>
              </div>
            </div>
            <div className=" text-gray-200  ">
              <div className="flex justify-between items-start border-b border-slate-700">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap">
                  #34567
                </div>
                <div className="py-3 w-[13%] font-medium">400</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">
                  <Link>View</Link>
                </div>
                <div
                  onClick={(e) => setShow(!show)}
                  className="py-3 w-[8%] font-bold cursor-pointer"
                >
                  <LuArrowDownSquare size={20} />
                </div>
              </div>
              <div
                className={
                  show
                    ? 'block border-b border-slate-700 bg-green-200 text-black rounded-md'
                    : 'hidden'
                }
              >
                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                    #3457
                  </div>
                  <div className="py-3 w-[13%] font-medium">600</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                </div>
                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                    #3457
                  </div>
                  <div className="py-3 w-[13%] font-medium">600</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                </div>
              </div>
            </div>
            <div className=" text-gray-200  ">
              <div className="flex justify-between items-start border-b border-slate-700">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap">
                  #34567
                </div>
                <div className="py-3 w-[13%] font-medium">400</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">
                  <Link>View</Link>
                </div>
                <div
                  onClick={(e) => setShow(!show)}
                  className="py-3 w-[8%] font-bold"
                >
                  <LuArrowDownSquare size={20} />
                </div>
              </div>
              <div
                className={
                  show
                    ? 'block border-b border-slate-700 bg-green-200 text-black rounded-md'
                    : 'hidden'
                }
              >
                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                    #3457
                  </div>
                  <div className="py-3 w-[13%] font-medium">600</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                </div>
                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                    #3457
                  </div>
                  <div className="py-3 w-[13%] font-medium">600</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                </div>
              </div>
            </div>
          </div>
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

export default Orders;
