import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { location } from '../../data';
import { MdAddAPhoto } from 'react-icons/md';
import { FaWindowClose } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../store/Reducers/categoryReducer';
import { addProduct } from '../../store/Reducers/productReducer';

const quantityRanges = [
  { label: 'Per kg', value: 'per_kg' },
  { label: '1-10 items', value: '1-10' },
  { label: '10-100 items', value: '10-100' },
  { label: '100-500 items', value: '100-500' },
  { label: '500 and above', value: '500+' },
];

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

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

  const [state, setState] = useState({
    name: '',
    description: '',
    discount: '',
    quantityRange: 'per_kg',
    prices: {
      per_kg: '',
      '1-10': '',
      '10-100': '',
      '100-500': '',
      '500+': '',
    },
    stock: '',
  });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('prices')) {
      const range = name.split('.')[1];
      setState({
        ...state,
        prices: {
          ...state.prices,
          [range]: value,
        },
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
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
    formData.append('quantityRange', state.quantityRange);
    Object.entries(state.prices).forEach(([range, price]) => {
      formData.append(`prices[${range}]`, price);
    });
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    dispatch(addProduct(formData));
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#0ea018] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-gray-100 text-lg font-semibold">Add Product</h1>
          <Link
            to="/seller/dashboard/all-product"
            className="bg-green-200 hover:shadow-lg hover:shadow-green-500/50 text-gray-600 px-3 py-2 rounded-md"
          >
            All Products
          </Link>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
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
              <div className="flex flex-col w-full gap-1 relative z-10">
                <label htmlFor="Category">Category</label>
                <input
                  readOnly
                  onClick={() => setShowCat(!showCat)}
                  onChange={inputHandle}
                  value={category}
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

            <div className="flex flex-col mb-3 md:flex-col gap-2 w-full text-gray-100">
              <div className="flex flex-col mb-3 md:flex-col gap-2 w-full text-gray-100">
                <label htmlFor="quantityRange">Quantity Range</label>
                <select
                  id="quantityRange"
                  name="quantityRange"
                  value={state.quantityRange}
                  onChange={inputHandle}
                  className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                >
                  {quantityRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col mb-3 md:flex-col gap-2 w-full text-gray-100">
                <label htmlFor={`price-${state.quantityRange}`}>
                  Price for{' '}
                  {
                    quantityRanges.find(
                      (range) => range.value === state.quantityRange
                    )?.label
                  }
                </label>
                <input
                  id={`price-${state.quantityRange}`}
                  name={`prices.${state.quantityRange}`}
                  type="number"
                  placeholder={`Price for ${
                    quantityRanges.find(
                      (range) => range.value === state.quantityRange
                    )?.label
                  }`}
                  value={state.prices[state.quantityRange]}
                  onChange={inputHandle}
                  className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
                />
              </div>

              <div className="flex flex-col w-full gap-1 mb-3 text-gray-100">
                <label htmlFor="discount">Discount</label>
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
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-green-300 w-full rounded-md"
                htmlFor="image"
              >
                <span>
                  <MdAddAPhoto size={30} />
                </span>
                <span>Select images</span>
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
              <button className="bg-orange-500 hover:shadow-orange-700/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
