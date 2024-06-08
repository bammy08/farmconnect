import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { location } from '../../data';
import { MdAddAPhoto } from 'react-icons/md';
import { FaWindowClose } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../store/Reducers/categoryReducer';
import { addProduct, messageClear } from '../../store/Reducers/productReducer';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';
import { overrideStyles } from '../../utils/utils';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { errorMessage, successMessage, loader } = useSelector(
    (state) => state.product
  );

  const [showCat, setShowCat] = useState(false);
  const [category, setCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [allCategory, setAllCategory] = useState([]);

  const [showLoc, setShowLoc] = useState(false);
  const [locations, setLocations] = useState('');
  const [searchLocValue, setSearchLocValue] = useState('');
  const [allLocation, setAllLocation] = useState(Object.keys(location));
  const [filteredCities, setFilteredCities] = useState([]);

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
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setNewPrice({ ...newPrice, [name]: value });
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
      setAllCategory(category);
    }
  };

  const locationSearch = (e) => {
    const value = e.target.value;
    setSearchLocValue(value);
    if (value) {
      let valueSearch = allLocation.filter(
        (loc) => loc.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllLocation(valueSearch);
    } else {
      setAllLocation(Object.keys(location));
    }
  };

  const handleStateClick = (stateName) => {
    setLocations(stateName);
    setFilteredCities(location[stateName]);
    setSearchLocValue('');
    setAllLocation(Object.keys(location));
    setShowLoc(false);
  };

  const handleCityClick = (cityName) => {
    setLocations(locations + ', ' + cityName);
    setFilteredCities([]);
  };

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];
      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };

  const removeImg = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);

    setImages(filterImage);
    setImageShow(filterImageUrl);
  };
  useEffect(() => {
    dispatch(getCategory({ page: '', searchValue: '', parPage: '' }));
  }, []);

  useEffect(() => {
    setAllCategory(categories);
  }, [categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', state.name);
    formData.append('description', state.description);
    formData.append('stock', state.stock);
    formData.append('discount', state.discount);
    formData.append('category', category);
    formData.append('location', locations);
    formData.append('shopName', 'Chiko Farms');

    formData.append('prices', JSON.stringify(state.prices));

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    dispatch(addProduct(formData));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: '',
        description: '',
        discount: '',
        stock: '',
        prices: [],
      });
      setImageShow([]);
      setImages([]);
      setCategory('');
      setLocations('');
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#0ea018] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-gray-100 text-lg font-semibold">Add Product</h1>
          <Link
            to="/seller/dashboard/all-state"
            className="bg-green-200 hover:shadow-lg hover:shadow-green-500/50 text-gray-600 px-3 py-2 rounded-md"
          >
            All Products
          </Link>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
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
                    <div className="flex justify-start items-start flex-col h-[200px] overflow-y-scroll  text-gray-700">
                      {allCategory.map((c, i) => (
                        <span
                          className={`px-4 py-2 hover:bg-green-500 hover:shadow-lg w-full cursor-pointer ${
                            categories === c.name &&
                            'bg-green-600 text-gray-100'
                          }`}
                          onClick={() => {
                            setShowCat(false);
                            setCategory(c.name);
                            setSearchValue('');
                            setAllCategory(categories);
                          }}
                        >
                          {c.name}
                        </span>
                      ))}
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

              <div className="flex flex-col w-full gap-1 relative mb-3">
                <label className="text-lg font-semibold" htmlFor="Location">
                  Location
                </label>
                <input
                  readOnly
                  onClick={() => setShowLoc(!showLoc)}
                  onChange={inputHandle}
                  value={locations}
                  className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                  type="text"
                  id="location"
                  placeholder="--select a location--"
                />
                <div
                  className={`absolute top-[101%] bg-green-400 transition-all w-full ${
                    showLoc ? 'scale-100' : 'scale-0'
                  }`}
                >
                  <div className="w-full px-4 fixed py-2 text-gray-700">
                    <input
                      onChange={locationSearch}
                      value={searchLocValue}
                      className="px-3 py-1 focus:border-green-600 outline-none border border-green-400 rounded-md text-gray-600 overflow-hidden w-full"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-y-scroll text-gray-700">
                    {filteredCities.length === 0
                      ? allLocation.map((loc, i) => (
                          <span
                            key={i}
                            className={`px-4 py-2 hover:bg-green-500 hover:shadow-lg w-full cursor-pointer ${
                              locations === loc && 'bg-green-600 text-gray-100'
                            }`}
                            onClick={() => handleStateClick(loc)}
                          >
                            {loc}
                          </span>
                        ))
                      : filteredCities.map((city, i) => (
                          <span
                            key={i}
                            className={`px-4 py-2 hover:bg-green-500 hover:shadow-lg w-full cursor-pointer ${
                              locations.includes(city) &&
                              'bg-green-600 text-gray-100'
                            }`}
                            onClick={() => handleCityClick(city)}
                          >
                            {city}
                          </span>
                        ))}
                  </div>
                </div>
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
                {imageShow.map((img, i) => (
                  <div className="h-[180px] relative">
                    <label htmlFor={i}>
                      <img
                        className="w-full h-full rounded object-cover"
                        src={img.url}
                        alt=""
                      />
                    </label>
                    <input
                      onChange={(e) => changeImage(e.target.files[0], i)}
                      className="hidden"
                      type="file"
                      id={i}
                    />
                    <span
                      onClick={() => removeImg(i)}
                      className="p-1 z-10 cursor-pointer bg-green-300 text-red-600 hover:shadow-md hover:shadow-green-400 absolute top-1 right-1"
                    >
                      <FaWindowClose />
                    </span>
                  </div>
                ))}
                <label
                  className="flex justify-center items-center flex-col h-[180px] cursor-pointer bg-green-400 hover:border-green-300 w-full rounded-md"
                  htmlFor="image"
                >
                  <span>
                    <MdAddAPhoto size={30} />
                  </span>
                  <span className="">Select images</span>
                </label>
                <input
                  onChange={imageHandle}
                  className="hidden"
                  multiple
                  type="file"
                  id="image"
                />
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
                    'Add Product'
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

export default AddProduct;
