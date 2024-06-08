import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  get_seller,
  seller_status,
  messageClear,
} from '../../store/Reducers/sellerReducer';

const SellerDetails = () => {
  const dispatch = useDispatch();
  const { seller, successMessage } = useSelector((state) => state.seller);
  const { sellerId } = useParams();
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      seller_status({
        sellerId,
        status,
      })
    );
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (seller) {
      setStatus(seller.status);
    }
  }, [seller]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#0ea018] rounded-md">
        <div className="w-full flex flex-wrap text-gray-100">
          <div className="w-full md:w-3/12 flex justify-center items-center py-3">
            <div>
              {seller?.image ? (
                <img src={seller?.image} alt="" className="max-w-full h-auto" />
              ) : (
                <span>No image uploaded</span>
              )}
            </div>
          </div>
          <div className="w-full md:w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2 className="font-semibold">Basic Info</h2>
              </div>
              <div className="flex flex-col gap-2 p-4 bg-green-200 rounded-md">
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>Name:</span>
                  <span>{seller?.username}</span>
                </div>
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>Email:</span>
                  <span>{seller?.email}</span>
                </div>
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>Role:</span>
                  <span>{seller?.role}</span>
                </div>
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>Status:</span>
                  <span>{seller?.status}</span>
                </div>
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>Payment Status:</span>
                  <span>{seller?.payment}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2 className="font-semibold">Contact</h2>
              </div>
              <div className="flex flex-col gap-2 p-4 bg-green-200 rounded-md">
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>Shop Name:</span>
                  <span>{seller?.shopInfo?.shopName}</span>
                </div>
                <div className="flex gap-2 font-semibold text-gray-600">
                  <span>Phone Number:</span>
                  <span>{seller?.shopInfo?.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4 py-3">
              <select
                className="px-4 py-2 focus:border-orange-600 outline-none bg-[#88f18f] border border-green-800 rounded-md text-black"
                name=""
                id=""
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">--Select Status--</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div>
                <button className="bg-orange-500 w-full md:w-[150px] hover:shadow-orange-700/40 hover:shadow-md text-white rounded-md px-7 py-2">
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
