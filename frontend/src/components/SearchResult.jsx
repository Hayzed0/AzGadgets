import React from "react";
import { Link } from "react-router";

const SearchResult = ({ results, query, setOpenResult }) => {
  return (
    <div className="transition-all duration-300 ease-in-out absolute top-12 left-0 z-90 flex flex-col w-full bg-white rounded h-screen overflow-y-auto p-4 no-scrollbar">
      <div className="my-6 text-xl font-semibold">
        <h1>{query.toUpperCase()}</h1>
      </div>
      {results &&
        results.map((item) => (
          <Link
            to={`/products/${item._id}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={()=>setOpenResult(false)}
            key={item._id}
            className="flex w-full justify-between items-start border-b border-purple-400 max-h-60 cursor-pointer"
          >
            <div className="w-14 md:w-20 h-40">
              <img src={item.image} alt={item.model} />
            </div>
            <div className="flex flex-col w-1/2">
              <h1 className="text-sm lg:text-lg font-semibold">{item.model}</h1>
              <h1 className="text-sm lg:text-lg font-semibold">{item.color}</h1>
              <h1 className="text-sm lg:text-lg font-semibold">
                {item.brand.toUpperCase()}
              </h1>
            </div>
            <div className="flex  flex-col justify-end">
              <h1 className="text-sm lg:text-lg font-semibold">
                £{item.price}
              </h1>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default SearchResult;
