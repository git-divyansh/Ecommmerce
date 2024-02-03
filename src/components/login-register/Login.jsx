import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login-register.css";
import { useSelector, useDispatch } from "react-redux";
import { API_URL, endpoints } from "../../utils";
import { setUser } from "../../slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const key = e.target.id;
    const val = e.target.value;

    setValues((prev) => {
      return { ...prev, [key]: val };
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/${endpoints.USERS}`);
      const data = await response.json();
      data.map((item) => {
        if (item.email === values.email && item.password === values.password) {
          dispatch(setUser(item.id));
          navigate("/product-listing");
        }
      });
    } catch (error) {
      console.log(console.error());
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1>LOGIN</h1>
        <form action="">
          <input
            id="email"
            placeholder="Email Address"
            type="text"
            onChange={handlechange}
          />
          <input
            id="password"
            placeholder="Password"
            type="password"
            onChange={handlechange}
          />
        </form>
        <div>
          <span>
            <Link to="/register">new User? Create New Account</Link>
          </span>
          <button onClick={handleLogin}>LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
