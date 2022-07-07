import axios from "axios";
import React, { useState, useEffect } from "react";

const Banner = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bayut.p.rapidapi.com/agencies/list"
        );
        const data = await response;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className='text-4xl font-bold m-[8.2rem]'>
        Search Properties to rent
      </h1>
      <div className='text-center'>
        <div className='inline-flex h-16 justify-between items-center w-[85%] bg-slate-100'>
          <div className='flex flex-col justify-between items-center'>
            <span>Location</span>
            <input type='text' placeholder='location' />
          </div>
          <div>Date</div>
          <div>Price</div>
          <div>Property Type</div>
          <button className='border rounded-md hover:bg-blue-700 hover:text-white text-black font-semibold py-2 px-4 rounded hover:transition ease-in-out duration-300'>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
