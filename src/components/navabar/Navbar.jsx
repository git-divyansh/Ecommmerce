import React, { useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, setUser } from "../../slice/userSlice";
import { API_URL, endpoints } from "../../utils";
import { setFavouriteFetch, updateFromTheCart } from "../../slice/productSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isuser, id } = useSelector((state) => state.user);
  const { order, favourite } = useSelector((state) => state.products);

  const uploadFetch = () => {
    if(!isuser)
      return;
    if (favourite.length) {
      const newFav = {data : favourite, id : id};
      fetch(`${API_URL}/${endpoints.FAVOURITES}/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(newFav),
      }).then((response) => {
        response.json();
      });
    }
  };

  useEffect(() => {
    if(!isuser)
      return;
    const setOrder = async () => {
      try {
        // The URL and the names of the endpoints are decribed in another utils.js
        const response = await fetch(`${API_URL}/${endpoints.ORDERS}/${id}`);
        const res = await response.json();
        dispatch(updateFromTheCart(res.data));
      } catch (error) {
        console.log(console.error());
      }
    }

    setOrder();
  }, [])

  useLayoutEffect(() => {
    if(!isuser)
      return;
    window.addEventListener("beforeunload", uploadFetch);
    return () => {
      window.removeEventListener("beforeunload", uploadFetch);
    };
  }, []);

  const handleLogOut = () => {
    uploadFetch();
    dispatch(removeUser());
    dispatch(updateFromTheCart([]));
    dispatch(setFavouriteFetch([]));
    navigate("/");
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="center">
          <h1 className="logo">ShopKart.</h1>
        </div>
        <div className="right">           
            <a className="menu-item" onClick={() => {navigate("/product-listing")}}>Products</a>
          <div className="menu-item" onClick={handleLogOut}>
            {!isuser ? "Login in" : "Log Out"}
          </div>
          <div className="menu-item">
            <Badge badgeContent={order.length} color="primary">
              <Link to="/cart">
                <ShoppingCartOutlinedIcon />
              </Link>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
