import { forwardRef } from 'react';
import { FixedSizeList as List } from 'react-window';

function handleOnWheel({ deltaY }) {
  console.log('handleOnWheel', deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
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
        <div className="w-[25%] p-2 whitespace-nowrap">
          <button className="bg-orange-500 py-1 px-2 rounded-md shadow-lg hover:shadow-orange-800/50 cursor-pointer text-sm">
            Confirm
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#0ea018] rounded-md">
        <h2 className="text-xl font-medium text-white mb-4">
          Withdrawal Request
        </h2>
        <div className="w-full">
          <div className="overflow-x-auto w-full">
            <div className="flex rounded-md font-semibold bg-[#80f387] uppercase text-sm min-w-[340px]">
              <div className="w-[25%] p-2">No</div>
              <div className="w-[25%] p-2">Amount(NGN)</div>
              <div className="w-[25%] p-2">Status</div>
              <div className="w-[25%] p-2">Date</div>
              <div className="w-[25%] p-2">Action</div>
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
  );
};

export default PaymentRequest;
