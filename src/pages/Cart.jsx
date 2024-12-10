import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Cart() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://strapi-store-server.onrender.com/api/products/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setProduct(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <div className="container mx-auto mt-[50px]">
      {product ? (
        // <div>
        // <img
        //       src={product.attributes.image}
        //       alt={product.attributes.title}
        //       className="w-[250px] rounded-md  h-60 "
        //     />
        // </div>
        <div className="card bg-base-100 flex flex-row w-[600px] shadow-xl mx-auto">
          <div className="img">
            <img
              src={product.attributes.image}
              alt={product.attributes.title}
              className="w-[250px] rounded-md  h-60 cover"
            />
          </div>
          <div className="info">
            <div className="card-body w-[400px]">
              <h2 className="card-title">{product.attributes.title}</h2>
              <p className="text-gray-700">${product.attributes.price}</p>
              <p>{product.attributes.description}</p>
            </div>
            <button className="btn">Add to bag</button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading product...</p>
      )}
    </div>
  );
}

export default Cart;
