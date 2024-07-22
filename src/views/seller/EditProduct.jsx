import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdAddAPhoto } from 'react-icons/md';
import { FaWindowClose } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../store/Reducers/categoryReducer';
import {
  get_a_product,
  messageClear,
  product_image_update,
  update_product,
} from '../../store/Reducers/productReducer';
import { PulseLoader } from 'react-spinners';
import { overrideStyles } from '../../utils/utils';
import toast from 'react-hot-toast';
import { location } from '../../utils/location';

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { product, loader, errorMessage, successMessage } = useSelector(
    (state) => state.product
  );

  const [showCat, setShowCat] = useState(false);
  const [category, setCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [allCategory, setAllCategory] = useState(category);

  const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPrice, setNewPrice] = useState({ range: '', price: '' });
  const [editIndex, setEditIndex] = useState(-1);
  const [state, setState] = useState({
    name: '',
    description: '',
    discount: '',
    prices: [],
    stock: '',
    selectedState: '', // New state for selected state
    selectedCity: '', // New state for selected city
  });

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleAddPrice = () => {
    if (editIndex > -1) {
      const updatedPrices = state.prices.map((price, index) =>
        index === editIndex ? newPrice : price
      );
      setState({ ...state, prices: updatedPrices });
      setEditIndex(-1);
    } else {
      setState({ ...state, prices: [...state.prices, newPrice] });
    }
    setNewPrice({ range: '', price: '' });
    setIsModalOpen(false);
  };

  const handleEditPrice = (index) => {
    setNewPrice(state.prices[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setNewPrice({ ...newPrice, [name]: value });
  };

  const handleDeletePrice = (index) => {
    const updatedPrices = state.prices.filter((_, i) => i !== index);
    setState({ ...state, prices: updatedPrices });
  };

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let valueSearch = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(valueSearch);
    } else {
      setAllCategory(categories);
    }
  };

  useEffect(() => {
    if (Array.isArray(categories)) {
      setAllCategory(categories);
    }
  }, [categories]);

  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        product_image_update({
          oldImage: img,
          newImage: files[0],
          productId,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getCategory({ page: '', searchValue: '', parPage: '' }));
  }, []);

  useEffect(() => {
    dispatch(get_a_product(productId));
  }, [productId]);

  useEffect(() => {
    setState({
      name: product.name || '',
      description: product.description || '',
      discount: product.discount || '',
      prices: product.prices || [],
      stock: product.stock || '',
      selectedState: product.state || '', // Update with the actual state field from your product object
      selectedCity: product.city || '', // Update with the actual city field from your product object
    });
    setCategory(product.category || '');
    setImageShow(product.images || []);
  }, [product]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const updateSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name: state.name,
      description: state.description,
      discount: state.discount,
      prices: JSON.stringify(state.prices),
      stock: state.stock,
      category,
      state: state.selectedState, // Update with the actual state field
      city: state.selectedCity,
      images,
      productId,
    };

    dispatch(update_product(obj));
  };
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setStateValue(selectedState);
    const cities =
      location.find((loc) => loc.state === selectedState)?.cities || [];
    setCityValue('');
    setState({ ...state, selectedState, selectedCity: '' });
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCityValue(selectedCity);
    setState({ ...state, selectedCity });
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#0ea018] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-gray-100 text-lg font-semibold">Edit Product</h1>
          <Link
            to="/seller/dashboard/all-product"
            className="bg-green-200 hover:shadow-lg hover:shadow-green-500/50 text-gray-600 px-3 py-2 rounded-md"
          >
            All Products
          </Link>
        </div>
        <div>
          <form onSubmit={updateSubmit}>
            <div className="max-w-2xl mx-auto p-6 bg-green-200 rounded-lg shadow-md">
              <div className="flex flex-col w-full gap-1">
                <label className="text-lg font-semibold" htmlFor="Product Name">
                  Product Name
                </label>
                <input
                  onChange={inputHandle}
                  value={state.name}
                  className="px-4 py-2 mb-3 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="product name"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label className="text-lg font-semibold" htmlFor="Stock">
                  No of stocks
                </label>
                <input
                  onChange={inputHandle}
                  value={state.stock}
                  className="px-4 py-2  mb-3 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                  type="text"
                  name="stock"
                  id="stock"
                  placeholder="no of stock available"
                />
              </div>
              <div className="flex flex-col mb-3 w-full text-gray-700">
                <div className="flex flex-col w-full gap-1 relative">
                  <label className="text-lg font-semibold" htmlFor="Category">
                    Category
                  </label>
                  <input
                    readOnly
                    onClick={() => setShowCat(!showCat)}
                    onChange={inputHandle}
                    value={category}
                    className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                    type="text"
                    id="category"
                    placeholder="-- select state category --"
                  />
                  <div
                    className={`absolute top-[101%] bg-green-400 transition-all w-full ${
                      showCat ? 'scale-100' : 'scale-0'
                    }`}
                  >
                    <div className="w-full px-4 fixed py-2 text-gray-700">
                      <input
                        onChange={categorySearch}
                        value={searchValue}
                        className="px-3 py-1 focus:border-green-600 outline-none border border-green-400 rounded-md text-gray-600 overflow-hidden w-full"
                        type="text"
                        placeholder="search"
                      />
                    </div>
                    <div className="pt-14"></div>
                    <div className="overflow-y-scroll h-48 custom-scrollbar">
                      {Array.isArray(allCategory) && allCategory.length > 0 ? (
                        allCategory.map((c, i) => (
                          <p
                            key={i}
                            onClick={() => {
                              setCategory(c.name);
                              setShowCat(false);
                              setSearchValue('');
                            }}
                            className="px-4 py-1 cursor-pointer hover:bg-green-600 hover:text-gray-100"
                          >
                            {c.name}
                          </p>
                        ))
                      ) : (
                        <p className="px-4 py-1">No categories found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-700">
                  Prices
                </h3>
                {state.prices.map((price, index) => (
                  <div key={index} className="mb-4 flex-col flex md:flex-row ">
                    <div className="sm:flex-1 md:flex md:flex-row justify-between items-center md:gap-2 gap-2">
                      <label className="block mb-2">Range</label>
                      <input
                        type="text"
                        value={price.range}
                        readOnly
                        className="px-2 py-2  mb-3 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                      />
                      <label className="block mb-2">Price</label>
                      <input
                        type="text"
                        value={price.price}
                        readOnly
                        className="px-2 py-2  mb-3 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleEditPrice(index)}
                        className="px-4 py-2 md:p-2 bg-yellow-500 text-white rounded ml-2"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePrice(index)}
                        className="p-2 bg-red-500 text-white rounded ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 mb-4 bg-green-600 text-white rounded"
                >
                  Add Price
                </button>
              </div>

              {isModalOpen && (
                <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Add Price</h3>
                    <label className="block mb-2">Range</label>
                    <select
                      name="range"
                      value={newPrice.range}
                      onChange={handlePriceChange}
                      className="w-full p-2 mb-2 border rounded"
                      required
                    >
                      <option value="">Select Range</option>
                      <option value="per basket">Per basket</option>
                      <option value="per kg">per Kg</option>
                      <option value="1-10">1-10</option>
                      <option value="10-100">10-100</option>
                      <option value="100-500">100-500</option>
                    </select>

                    <label className="block mb-2">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={newPrice.price}
                      onChange={handlePriceChange}
                      className="w-full p-2 mb-2 border rounded"
                      required
                    />

                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="p-2 mr-2 bg-red-500 text-white rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddPrice}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col w-full gap-1 mb-3 text-gray-700">
                <label className="text-lg font-semibold" htmlFor="discount">
                  Discount
                </label>
                <input
                  min="0"
                  className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                  onChange={inputHandle}
                  value={state.discount}
                  type="number"
                  placeholder="%discount%"
                  name="discount"
                  id="discount"
                />
              </div>

              <div className="flex flex-col w-full gap-1 mt-3">
                <label
                  className="text-lg font-semibold"
                  htmlFor="Product State"
                >
                  State
                </label>
                <select
                  onChange={handleStateChange}
                  value={state.selectedState}
                  className="px-4 py-2 mb-3 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                  name="selectedState"
                  id="selectedState"
                >
                  <option value="">Select State</option>
                  {location.map((loc) => (
                    <option key={loc.state} value={loc.state}>
                      {loc.state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full gap-1 mt-3">
                <label className="text-lg font-semibold" htmlFor="Product City">
                  City
                </label>
                <select
                  onChange={handleCityChange}
                  value={state.selectedCity}
                  className="px-4 py-2 mb-3 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                  name="selectedCity"
                  id="selectedCity"
                  disabled={!state.selectedState}
                >
                  <option value="">Select City</option>
                  {stateValue &&
                    location
                      .find((loc) => loc.state === stateValue)
                      ?.cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                </select>
              </div>

              <div className="flex flex-col mb-3  w-full text-gray-700">
                <div className="flex flex-col w-full gap-1">
                  <label
                    className="text-lg font-semibold"
                    htmlFor="Description"
                  >
                    {' '}
                    Description
                  </label>
                  <textarea
                    cols={10}
                    rows={4}
                    onChange={inputHandle}
                    value={state.description}
                    className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                    type="text"
                    name="description"
                    id="description"
                    placeholder="description"
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-3 sm:gap-4 md:gap-3 gap-3 w-full text-gray-100 mb-4">
                {imageShow &&
                  imageShow.length > 0 &&
                  imageShow.map((img, i) => (
                    <div>
                      <label className="h-[180px]" htmlFor={i}>
                        <img className="h-full" src={img} alt="" />
                      </label>
                      <input
                        onChange={(e) => changeImage(img, e.target.files)}
                        type="file"
                        id={i}
                        className="hidden"
                      />
                    </div>
                  ))}
              </div>
              <div className="flex">
                <button
                  disabled={loader ? true : false}
                  type="submit"
                  className="bg-orange-500 w-[230px] hover:shadow-orange-700/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2"
                >
                  {loader ? (
                    <PulseLoader cssOverride={overrideStyles} />
                  ) : (
                    'Update Changes'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
