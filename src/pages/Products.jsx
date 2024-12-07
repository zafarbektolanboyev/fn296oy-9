import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://strapi-store-server.onrender.com/api/products`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardClick(id) {
    navigate(`/cart/${id}`);
  }

  return (
    <div className="container mx-auto mt-[50px]">
      <h2 className="text-center text-3xl font-bold mb-[20px]">Products</h2>
      <div className="wrapper flex flex-wrap gap-6 justify-center">
        {data?.length > 0 ? (
          data.map((el, index) => (
            <div
              key={index}
              className="card bg-base-100 w-96 shadow-xl cursor-pointer"
              onClick={() => handleCardClick(el.id)} // Pass product ID
            >
              <figure>
                <img
                  src={el.attributes.image}
                  alt={el.attributes.title}
                  className="w-full h-60 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{el.attributes.title}</h2>
                <p className="text-gray-700">${el.attributes.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </div>
    </div>
  );
}

export default Products;
