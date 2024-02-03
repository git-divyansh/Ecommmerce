import React, { useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../slice/userSlice";
import { API_URL, endpoints } from "../../utils";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isuser, id } = useSelector((state) => state.user);
  const { order, favourite } = useSelector((state) => state.products);

  const uploadFetch = () => {
    if (favourite.length) {
      const newFav = {data : favourite, userid : id};
      fetch(`${API_URL}/${endpoints.FAVOURITES}`, {
        method: "POST",
        mode: "no-cors",
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

  useLayoutEffect(() => {
    window.addEventListener("beforeunload", uploadFetch);
    return () => {
      window.removeEventListener("beforeunload", uploadFetch);
    };
  }, []);

  const handleLogOut = () => {
    uploadFetch();
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="center">
          <h1 className="logo">ShopKart.</h1>
        </div>
        <div className="right">
          <Link
            to="/product-listing"
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="menu-item">Products</div>
          </Link>
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
