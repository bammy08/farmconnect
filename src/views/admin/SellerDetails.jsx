import logo from '../../images/admin.jpg';

const SellerDetails = () => {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <h2 className="text-lg mb-3 font-semibold"> Seller Details</h2>
      <div className="w-full p-4 bg-[#0ea018] rounded-md">
        <div className="w-full flex flex-wrap text-gray-100">
          <div className="w-3/12 flex justify-center items-center py-3">
            <div>
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2 className="font-semibold">Basic Info</h2>
              </div>
              <div className="flex justify-between text-sm flex-col gap-2 p-4  bg-green-200 rounded-md">
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>Name:</span>
                  <span>Olusola Bamidele</span>
                </div>
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>Email:</span>
                  <span>olusolabamidele33@gmail.com</span>
                </div>
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>Role:</span>
                  <span>Seller</span>
                </div>
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>Phone Number:</span>
                  <span>08035812488</span>
                </div>
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>Status:</span>
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2 className="font-semibold">Contact</h2>
              </div>
              <div className="flex justify-between text-sm flex-col gap-2 p-4  bg-green-200 rounded-md">
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span> Shop Name:</span>
                  <span>Olusola Bamidele</span>
                </div>
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>City:</span>
                  <span>Port Harcourt</span>
                </div>
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>State:</span>
                  <span>Rivers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form>
            <div className="flex gap-4 py-3">
              <select
                className="px-4 py-2 focus:border-orange-600 outline-none bg-[#88f18f] border border-green-800 rounded-md text-black"
                name=""
                id=""
              >
                <option value="">--Select Status--</option>
                <option value="active">Active</option>

                <option value="inactive">Inactive</option>
              </select>
              <div>
                <button className="bg-orange-500 w-[150px] hover:shadow-orange-700/40 hover:shadow-md text-white rounded-md px-7 py-2">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
