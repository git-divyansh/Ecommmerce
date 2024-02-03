import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL, endpoints } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa";
import {
  removeFavourite,
  setFavourite,
  addToCart,
} from "../../slice/productSlice";
import "./singleProduct.css";

const Singleproduct = () => {
  const dispatch = useDispatch();

  // Extracting the product id from the params
  const { id } = useParams();

  const [productDetail, setProductDetail] = useState({});

  useEffect(() => {
    const productsFecting = async () => {
      try {
        // The URL and the names of the endpoints are decribed in another utils.js
        const response = await fetch(`${API_URL}/${endpoints.PRODUCTS}`);
        const data = await response.json();

        // Seperating the product we need from the rest
        setProductDetail(data.filter((items) => items.id === id)[0]);
      } catch (error) {
        console.log(console.error());
      }
    };

    // This function is an async await function for fecthing the product list
    productsFecting();
  }, []);

  // Calling the updated redux states of favourite products
  const { order, favourite } = useSelector((state) => state.products);

  // creating dynamic style state for the favourites button
  const [styleConfig, setStyleConfig] = useState(() => {
    if (favourite.includes(parseInt(productDetail.id))) return { color: "red" };
    else return { color: "white" };
  });

  console.log(favourite.includes(productDetail.id));

  // Creating the function to change the style of favourite button
  const changeStyleConfig = () => {
    if (favourite.includes(productDetail.id)) {
      dispatch(removeFavourite(productDetail.id));
      setStyleConfig({ color: "white" });
    } else {
      dispatch(setFavourite(productDetail.id));
      setStyleConfig({ color: "red" });
    }
  };

  const handleAddtoCart = () => {
    let flag = true;
    order.map((item) => {
      if (item.id == productDetail.id) {
        alert("Already in cart");
        flag = false;
      }
    });
    if(flag)
      dispatch(addToCart(productDetail));
  };

  return (
    <div className="singleproduct-container">
      <div className="singleproduct-wrapper">
        <div className="leftpart">
          <img src={productDetail.image} alt="" />
        </div>
        <div className="rightpart">
          <div className="name-detail-price">
            <div className="title-like">
              <h1>{productDetail.title}</h1>
              <span>
                <FaHeart
                  className="like-icon"
                  style={styleConfig}
                  onClick={changeStyleConfig}
                />
              </span>
            </div>
            <p className="description">{productDetail.description}</p>
            <p className="amount">&#8377;{productDetail.amount}</p>
          </div>
          <div className="buynow-basket">
            <Link to="/cart" className="route-link">
              <button className="buy-button">BUY NOW</button>
            </Link>
            <button className="basket-button" onClick={handleAddtoCart}>
              ADD TO BASKET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singleproduct;
