import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';

import { FaEdit, FaImage } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { PulseLoader } from 'react-spinners';
import { overrideStyles } from '../../utils/utils';
import Search from '../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  getCategory,
  messageClear,
} from '../../store/Reducers/categoryReducer';
import toast from 'react-hot-toast';

const Category = () => {
  const dispatch = useDispatch();

  const { loader, successMessage, errorMessage, categories } = useSelector(
    (state) => state.category
  );
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  const [imageShow, setImageShow] = useState('');
  const [state, setState] = useState({
    name: '',
    image: '',
  });

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setState({ ...state, image: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({ name: '', image: '' });
      setImageShow('');
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(getCategory(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#0ea018] rounded-md">
        <h1 className="text-white font-semibold text-lg">Category</h1>
        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 rounded-sm bg-orange-500 text-white font-bold hover:shadow-orange-700/40 hover:shadow-md cursor-pointer"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4 bg-[#0ea018] rounded-md">
            <Search
              setParPage={setParPage}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-white ">
                <thead className="text-sm text-white uppercase border-b border-slate-700">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      No
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Image
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Name
                    </th>

                    <th scope="col" className="py-3 px-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((d, i) => (
                    <tr key={i}>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {i + 1}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <img
                          className="w-[45px] h-[45px]"
                          src={d.image}
                          alt=""
                        />
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {d.name}
                      </td>

                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-start items-center gap-4">
                          <Link className="p-2 bg-yellow-400 rounded cursor-pointer ">
                            <FaEdit />
                          </Link>
                          <Link className="p-2 bg-red-400 rounded cursor-pointer ">
                            <FaTrash />
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
                showItem={4}
              />
            </div>
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? 'right-0' : '-right-[340px]'
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div className="bg-[#0ea018] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-white">
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold text-xl mb-4 w-full text-center">
                  Add Category
                </h1>
                <div
                  onClick={() => setShow(false)}
                  className="block lg:hidden cursor-pointer"
                >
                  <MdClose size={24} className="text-[#d0d2d6]" />
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="name">Category Name</label>
                  <input
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    className="px-4 py-2 rounded-md text-gray-500 outline-none focus:border-orange-600"
                    type="text"
                    id="name"
                    value={state.name}
                    name="category_name"
                    placeholder="Category name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-orange-600 w-full border-gray-200"
                  >
                    {imageShow ? (
                      <img
                        className="w-full h-full object-cover"
                        src={imageShow}
                        alt="imag"
                      />
                    ) : (
                      <>
                        <span>
                          <FaImage />
                        </span>
                        <span>Upload Image</span>
                      </>
                    )}
                  </label>
                  <input
                    onChange={imageHandle}
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                  />
                  <div>
                    <button
                      disabled={loader ? true : false}
                      type="submit"
                      className="bg-orange-500 w-full hover:shadow-orange-700/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2"
                    >
                      {loader ? (
                        <PulseLoader cssOverride={overrideStyles} />
                      ) : (
                        'Add Category'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
