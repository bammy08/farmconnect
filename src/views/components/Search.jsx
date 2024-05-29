import React from 'react';

const Search = ({ setParPage, setSearchValue, searchValue }) => {
  return (
    <div className="flex justify-between items-center">
      <select
        onChange={(e) => setParPage(parseInt(e.target.value))}
        className="px-4 py-2 focus:border-orange-600 outline-none bg-[#88f18f] border border-green-800 rounded-md text-black"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        className="px-4 py-2 focus:border-orange-600 outline-none bg-gray-100 border border-green-800 rounded-md text-gray-700"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
