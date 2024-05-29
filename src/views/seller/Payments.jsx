import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {
  MdOutlineProductionQuantityLimits,
  MdOutlineShoppingCart,
} from 'react-icons/md';
import { TbCurrencyNaira } from 'react-icons/tb';

import { forwardRef } from 'react';
import { FixedSizeList as List } from 'react-window';

function handleOnWheel({ deltaY }) {
  console.log('handleOnWheel', deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm text-white font-medium">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">1200</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-1 px-2 rounded-md bg-orange-200 text-gray-500">
            Pending
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">18 May 2024</div>
      </div>
    );
  };

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5">
        <div className="flex justify-between items-center p-3 bg-[#f6e699] rounded-md gap-2">
          <div className="flex flex-col justify-start items-start text-[#0b0808]">
            <span className="flex justify-center items-center text-lg font-bold">
              <span>56500</span>
            </span>
            <span className="font-medium">Total Sales</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#d9d60f] flex justify-center items-center text-white">
            <TbCurrencyNaira size={30} />
          </div>
        </div>
        <div className="flex justify-between items-center p-3 bg-[#63eaa7] rounded-md gap-2">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <span className="text-lg font-bold">50000</span>
            <span className="font-medium">Available Amount</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#169d16] flex justify-center items-center text-white">
            <TbCurrencyNaira size={28} />
          </div>
        </div>
        <div className="flex justify-between items-center p-3 bg-[#9ea1e5] rounded-md gap-2">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <span className="text-lg font-bold">50000</span>
            <span className="font-medium">Withdrawal Amount</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#2947dc] flex justify-center items-center text-white">
            <TbCurrencyNaira size={30} />
          </div>
        </div>
        <div className="flex justify-between items-center p-3 bg-[#fae8e8] rounded-md gap-2">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <span className="text-lg font-bold">20000</span>
            <span className="font-medium"> Pending Amount</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#df6060] flex justify-center items-center text-white">
            <TbCurrencyNaira size={30} />
          </div>
        </div>
      </div>
      <div className="w-full grid grids-cols-1 md:grid-cols-2 gap-2 pb-4">
        <div className="bg-[#0ea018] rounded-md p-5 text-gray-100">
          <h2 className="text-lg">Make a Withdrawal</h2>
          <div className="pt-5 mb-5">
            <form>
              <div className="flex gap-3 flex-wrap">
                <input
                  className="px-3 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700 md:w-[75%]"
                  type="number"
                  placeholder="0"
                  name="amount"
                  min={0}
                />
                <button className="bg-orange-500 hover:shadow-orange-700/40 hover:shadow-md text-white rounded-md px-7 py-2">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div>
            <h2 className="text-lg mb-2">Pending Request</h2>
            <div className="overflow-x-auto w-full">
              <div className="flex rounded-md font-semibold bg-[#80f387] uppercase text-sm min-w-[340px] text-gray-600">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">Amount(NGN)</div>
                <div className="w-[25%] p-2">Status</div>
                <div className="w-[25%] p-2">Date</div>
              </div>
              {
                <List
                  height={350}
                  itemCount={10}
                  className="List"
                  style={{ minWidth: '340px' }}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
        <div className="bg-[#0ea018] rounded-md p-5 text-gray-100">
          <div>
            <h2 className="text-lg pb-4">Successful Withdrawal</h2>
            <div className="overflow-x-auto w-full">
              <div className="flex rounded-md font-semibold bg-[#80f387] uppercase text-sm min-w-[340px] text-gray-600">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">Amount(NGN)</div>
                <div className="w-[25%] p-2">Status</div>
                <div className="w-[25%] p-2">Date</div>
              </div>
              {
                <List
                  height={350}
                  itemCount={10}
                  className="List"
                  style={{ minWidth: '340px' }}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
