import React, { useEffect, useLayoutEffect, useState } from "react";
import { API_URL, endpoints } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import {
  setProduct,
  setFavourite,
  removeFavourite,
  addToCart,
  setFavouriteFetch,
} from "../../slice/productSlice";
import "./Products.css";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { favourite, order, products } = useSelector((state) => state.products);
  const { id, isuser } = useSelector((state) => state.user);

  // Fecthing the data in this block
  useLayoutEffect(() => {
    const productsFecting = async () => {
      try {
        // The URL and the names of the endpoints are decribed in another utils.js
        const response = await fetch(`${API_URL}/${endpoints.PRODUCTS}`);
        const data = await response.json();
        dispatch(setProduct(data));
      } catch (error) {
        console.log(console.error());
      }
    };

    const favFecting = async () => {
      try {
        // The URL and the names of the endpoints are decribed in another utils.js
        const response = await fetch(`${API_URL}/${endpoints.FAVOURITES}`);
        const res = await response.json();

        let arr = [];
        res.map((item) => {
          if (item.userid == id && item.data) {
            arr.push(item.data);
          }
        });
        if (arr.length > 0) dispatch(setFavouriteFetch(arr[arr.length - 1]));
      } catch (error) {
        console.log(console.error());
      }
    };
    // This function is an async await function for fecthing the product list
    favFecting();
    productsFecting();
  }, []);

  // This function will track whether the item should be included the favourites or not
  const changeConfig = (id) => {
    if (favourite.includes(id)) {
      dispatch(removeFavourite(id));
    } else {
      dispatch(setFavourite(id));
    }
  };

  const handleAddtoCart = (id) => {
    if (!isuser) {
      navigate("/");
    }
    let flag = true;
    order.map((item) => {
      if (item.id == id) {
        alert("Already in cart");
        flag = false;
      }
    });
    if (flag) {
      const newObj = products.filter((item) => item.id === id);
      dispatch(addToCart(newObj[0]));
    }
  };

  const orderIndexes = order.map((item) => {
    return item.id;
  });

  return (
    <div className="productlist-constainer">
      {products?.map((item) => {
        const flag = favourite.includes(item.id);
        const inCart = orderIndexes.includes(item.id);
        return (
          <div className="item-card-container" key={item.id}>
            <div className="item-card-wrapper">
              <img src={item.image} alt="" />
              <div className="product-details">
                <Link to={`/product/${item.id}`} className="title">
                  {item.title}
                </Link>
                <p className="price">&#8377;{item.amount}</p>
                <span className="rating">{item.rating}</span>
              </div>
              <div className="card-bottom">
                <span className="like">
                  <FaHeart
                    className="like-icons"
                    style={flag ? { color: "red" } : { color: "gray" }}
                    onClick={(e) => changeConfig(item.id)}
                  />
                </span>
                <span
                  className="addto-cart"
                  onClick={() => handleAddtoCart(item.id)}
                >
                  {!inCart ? (
                    <FaCartArrowDown className="like-icons" />
                  ) : (
                    <BsFillCartCheckFill className="like-icons" />
                  )}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
