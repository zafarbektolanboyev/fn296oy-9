import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://strapi-store-server.onrender.com/api/products?featured=true`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setData(res.data.data); // Corrected API response handling
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleProducts() {
    navigate("/products");
  }

  return (
    <div className="container mt-[150px] pb-[50px]">
      <div className="hero flex flex-col mb-[150px]">
        <div className="content mx-auto gap-5">
          <h1 className="text-[#394E6A] text-7xl text-center">
            We are changing
            <br /> the way people shop
          </h1>
          <p className="text-2xl text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta <br /> temporibus asperiores aut
            obcaecati perferendis porro nobis.
          </p>
        </div>
        <button
          className="p-[15px] text-center bg-blue-600 rounded-xl text-white"
          onClick={handleProducts}
        >
          OUR PRODUCTS
        </button>
      </div>
      <div className="products mx-auto pl-[100px]">
        <h3 className="text-2xl ">Featured Products</h3>
        <div className="w-full h-[1px] mx-auto bg-gray-400"></div>
      </div>
      <div className="wrapper flex mx-auto mt-[30px] pl-[100px] pb-[150px] flex-wrap gap-5">
        {data?.length > 0 ? (
          data.map((el, index) => (
            <div className="card border p-2 cursor-pointer" key={index}>
              <img
                src={el.attributes.image}
                alt={el.attributes.title}
                className="w-[300px] h-[300px] rounded-md object-cover"
                
              />
              <h1 className="text-center text-2xl">{el.attributes.title}</h1>
              <h2 className="text-center text-2xl">${el.attributes.price}</h2>
            </div>
          ))
        ) : (
          <p>No featured products available</p>
        )}
      </div>
    </div>
  );
}

export default Home;
