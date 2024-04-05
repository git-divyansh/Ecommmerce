import React, { useState } from "react";
import "./login-register.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, endpoints } from "../../utils";

const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handlechange = (e) => {
    const key = e.target.id;
    const val = e.target.value;

    setValues((prev) => {
      return { ...prev, [key]: val };
    });
  };

  const handleSubmit = () => {
    if (values.password !== values.confirmpassword) {
      alert("Password not same");
      return;
    }

    const {confirmpassword, ...rest} = values;

    const makeOrderList = (id) => {
      const newOrder = {id : id, data : []}
      fetch(`${API_URL}/${endpoints.ORDERS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(newOrder),
      })
        .then((response) => {
          response.json();
        })
    }

    const makeFavouriteList = (id) => {
      const newFav = {id : id, data : []}
      fetch(`${API_URL}/${endpoints.FAVOURITES}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(newFav),
      })
        .then((response) => {
          response.json();
          
        })
    }

    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(rest),
    })
      .then((response) => {
        return response.json();
      }).then(data =>{
        console.log(data.id);
        makeFavouriteList(data.id);
        makeOrderList(data.id)
        navigate("/");
      })
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1>Register</h1>
        <form action="">
          <input
            id="email"
            placeholder="Email Address"
            type="text"
            onChange={handlechange}
          />
          <input
            id="password"
            placeholder="New Password"
            type="password"
            onChange={handlechange}
          />
          <input
            id="confirmpassword"
            placeholder="Confirm Password"
            type="password"
            onChange={handlechange}
          />
        </form>
        <div>
          <span>
            <Link to="/">Account exist? login</Link>
          </span>
          <button onClick={handleSubmit}>LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
