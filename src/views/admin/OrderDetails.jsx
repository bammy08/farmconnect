import logo from '../../images/category/1.png';

const OrderDetails = () => {
  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4 bg-[#0ea018] rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-gray-100">Order Details</h2>
          <select className="px-4 py-2 focus:border-orange-600 outline-none bg-[#88f18f] border border-green-800 rounded-md text-gray-600">
            <option value="">pending</option>
            <option value="">processing</option>
            <option value="">warehouse</option>
            <option value="">placed</option>
            <option value="">cancelled</option>
          </select>
        </div>
        <div className="p-4">
          <div className="flex gap-2 text-lg text-gray-100">
            <h2>#23456</h2>
            <span>20 May 2024</span>
          </div>
          <div className="flex flex-wrap">
            <div className="w-[30%]">
              <div className="pr-3 text-gray-100 text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Delivering to: Bamidele
                  </h2>
                  <p>
                    <span className="text-sm"> 9, Wobo Street</span>
                  </p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2>Payment status:</h2>
                  <span className="text-base">Paid</span>
                </div>
                <span className="text-base">Price: $5789</span>
                <div className="mt-4 flex flex-col gap-4 bg-green-300 rounded-md text-gray-600">
                  <div className="flex gap-3 text-sm ">
                    <img className="w-[45px] h-[45px]" src={logo} alt="logo" />
                    <div>
                      <h2>Apple</h2>
                      <p>
                        <span>Brand: </span>
                        <span>Apple </span>
                        <span className="text-sm">Quantity : 2</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-4 bg-green-300 rounded-md text-gray-600">
                  <div className="flex gap-3 text-sm ">
                    <img className="w-[45px] h-[45px]" src={logo} alt="logo" />
                    <div>
                      <h2>Apple</h2>
                      <p>
                        <span>Brand: </span>
                        <span>Apple </span>
                        <span className="text-sm">Quantity : 2</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-4 bg-green-300 rounded-md text-gray-600">
                  <div className="flex gap-3 text-sm ">
                    <img className="w-[45px] h-[45px]" src={logo} alt="logo" />
                    <div>
                      <h2>Apple</h2>
                      <p>
                        <span>Brand: </span>
                        <span>Apple </span>
                        <span className="text-sm">Quantity : 2</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[70%]">
              <div className="pl-3">
                <div className="mt-4 flex flex-col p-3 bg-green-300 rounded-md">
                  <div className="text-gray-700">
                    <div className="flex justify-start items-center gap-3">
                      <h2>Seller 1 Order:</h2>
                      <span>pending</span>
                    </div>
                    <div className="flex gap-3 text-sm mt-3">
                      <img
                        className="w-[45px] h-[45px]"
                        src={logo}
                        alt="logo"
                      />
                      <div>
                        <h2>Apple</h2>
                        <p>
                          <span>Brand: </span>
                          <span>Apple </span>
                          <span className="text-sm">Quantity : 2</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
