import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { category, location } from '../../data';
import { MdAddAPhoto } from 'react-icons/md';
import { FaWindowClose } from 'react-icons/fa';

const EditProduct = () => {
  const [showCat, setShowCat] = useState(false);
  const [categories, setCategories] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [allCategory, setAllCategory] = useState(category);

  const [showLoc, setShowLoc] = useState(false);
  const [locations, setLocations] = useState('');
  const [searchLocValue, setSearchLocValue] = useState('');
  const [allLocation, setAllLocation] = useState(Object.keys(location));
  const [filteredCities, setFilteredCities] = useState([]);

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const [state, setState] = useState({
    name: '',
    description: '',
    discount: '',
    price: '',
    bulkPrice: '',
    stock: '',
  });

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
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

  const changeImage = (img, files) => {
    if (files.length > 0) {
    }
  };

  useEffect(() => {
    setState({
      name: 'Apple',
      description: 'Freshly harvested apples for sale at bulk price',
      discount: '5',
      price: '3000',
      bulkPrice: '2700',
      stock: '300000',
    });
    setCategories('Fruits');
    setLocations('Abia, Aba North');
    setImageShow(['../../images/admin.jpg']);
  }, []);

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
          <form>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-gray-100">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="Product Name"> Product Name</label>
                <input
                  onChange={inputHandle}
                  value={state.name}
                  className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="product name"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="Stock">No of stocks</label>
                <input
                  onChange={inputHandle}
                  value={state.stock}
                  className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                  type="text"
                  name="stock"
                  id="stock"
                  placeholder="no of stock available"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-gray-100">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="Category">Category</label>
                <input
                  readOnly
                  onClick={() => setShowCat(!showCat)}
                  onChange={inputHandle}
                  value={categories}
                  className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                  type="text"
                  id="category"
                  placeholder="-- select product category --"
                />
                <div
                  className={`absolute top-[101%] bg-green-200 transition-all w-full ${
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
                          categories === c.name && 'bg-green-600 text-gray-100'
                        }`}
                        onClick={() => {
                          setShowCat(false);
                          setCategories(c.name);
                          setSearchValue('');
                          setAllCategory(category);
                        }}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="Discount"> Discount</label>
                <input
                  onChange={inputHandle}
                  value={state.discount}
                  className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="discount"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-gray-100">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="Price"> Price (NGN) </label>
                <input
                  onChange={inputHandle}
                  value={state.price}
                  className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                  type="number"
                  name="price"
                  id="price"
                  placeholder="price"
                />
              </div>

              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="Location">Location</label>
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
                  className={`absolute top-[101%] bg-green-200 transition-all w-full ${
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
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-gray-100">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="Description"> Description</label>
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
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="Bulk Price">Bulk price</label>
                <input
                  onChange={inputHandle}
                  value={state.bulkPrice}
                  className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                  type="number"
                  name="bulkPrice"
                  id="bulkPrice"
                  placeholder="bulkPrice"
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-3 sm:gap-4 md:gap-3 gap-3 w-full text-gray-100 mb-4">
              {imageShow.map((img, i) => (
                <div>
                  <label htmlFor={i}>
                    <img src={img} alt="" />
                  </label>
                  <input
                    onChange={(e) => changeImage(img, e.target.files)}
                    className="hidden"
                    type="file"
                    id={i}
                  />
                </div>
              ))}
            </div>
            <div className="flex">
              <button className="bg-orange-500 hover:shadow-orange-700/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
