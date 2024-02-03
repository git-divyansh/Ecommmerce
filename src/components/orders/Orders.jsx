import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import tick_symbol from "../../assets/tick-symbol.png";
import { useSelector, useDispatch } from "react-redux";
import { removeFromTheCart } from "../../slice/productSlice";
import "./Orders.css";
import { API_URL, delivery, discount, endpoints } from "../../utils";

const Orders = () => {
  // To show the delivered modal
  const [delivered, setDilivered] = useState(false);
  const disPatch = useDispatch();
  const order = useSelector((state) => state.products.order);
  const { id } = useSelector((state) => state.user);

  let newOrder = [];
  order.map((item) => {
    const newItem = { ...item, quantity: 1 };
    newOrder.push(newItem);
  });

  const [currentOrder, setCurrentOrder] = useState(newOrder);

  // For handling the qunatity counter for every order in the cart
  const handleCounter = (id, flag) => {
    setCurrentOrder((prev) => {
      const newOrder = prev.map((item) => {
        //   console.log(typeof item.id);
        if (item.id === id) {
          return {
            ...item,
            quantity: flag
              ? item.quantity + 1
              : item.quantity === 0
              ? 0
              : item.quantity - 1,
          };
        } else return item;
      });
      return newOrder;
    });
  };

  const handleTrash = (id) => {
    setCurrentOrder((prev) => {
      const newObj = prev;
      const newOrder = newObj.filter((item) => item.id !== id);
      disPatch(removeFromTheCart(newOrder));
      return newOrder;
    });
  };

  console.log(currentOrder);

  // Change the flag
  const handleClickCheckout = () => {
    if (order.length) {
      const newOrder = { ...order, userid: id };
      fetch(`${API_URL}/${endpoints.ORDERS}`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(newOrder),
      }).then((response) => {
        response.json();
      });
    }
    setDilivered(!delivered);
  };

  const totalPrice = currentOrder.reduce(
    (accumulator, item) => accumulator + item.quantity * item.amount,
    0
  );
  const totalDiscount = discount * currentOrder.length;
  const totalDelivery = delivery * currentOrder.length;

  return (
    <div>
      {delivered && <div className="modal-background"></div>}
      {delivered && (
        <dialog open className="modal-delivered">
          <p>
            <img
              src={tick_symbol}
              style={{ height: "10rem", width: "10rem" }}
            />
          </p>
          <form method="dialog" className="form-in-modal">
            <p style={{ fontWeight: "700", fontSize: "20px" }}>
              Order placed succesfully
            </p>
            <p>It will be delivered in 5 days</p>
            <button onClick={() => setDilivered(!delivered)}>OK</button>
          </form>
        </dialog>
      )}
      <div className="cart-wrapper">
        <div className="cart-bottom">
          <h1>MY CART</h1>
          <div className="cart-info">
            <div className="cart-product">
              {currentOrder.map((item, id) => {
                // const totalPrice = currentOrder.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.amount, 0);
                // const totalDiscount = discount * currentOrder.length;
                // const totalDelivery = delivery * currentOrder.length;
                return (
                  <div key={id} className="cart-product-detail">
                    <img src={item.image} alt="" />
                    <div className="cart-product-details">
                      <span style={{ fontWeight: "700" }}>{item.title}</span>
                      <span style={{ fontSize: "18px" }}>
                        &#8377;{item.amount}
                      </span>
                      <div className="product-amount-container">
                        <FaMinus
                          className="remove"
                          onClick={(e) => handleCounter(item.id, false)}
                        />
                        <div className="cart-product-amount">
                          {item.quantity}
                        </div>
                        <MdAdd
                          id={item.id}
                          className="add"
                          onClick={(e) => handleCounter(item.id, true)}
                        />
                      </div>
                    </div>
                    <div className="detail-delete">
                      <FaRegTrashAlt
                        className="trash-button"
                        onClick={(e) => handleTrash(item.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="cart-summary">
          <h1>Price Details</h1>
          <div className="summary-item">
            <span className="si-text">Price</span>
            <span className="si-price">{totalPrice}</span>
          </div>
          <div className="summary-item">
            <span className="si-text">Discount Price</span>
            <span className="si-price">{totalDiscount}</span>
          </div>
          <div className="summary-item">
            <span className="si-text">Delivery Charge</span>
            <span className="si-price">{totalDelivery}</span>
          </div>
          <hr style={{ height: "2px", width: "90%" }} />
          <div className="summary-item">
            <span className="si-text">Total</span>
            <span className="si-price">
              {totalPrice + totalDelivery - totalDiscount}
            </span>
          </div>
          <button className="checkout-button" onClick={handleClickCheckout}>
            CHECKOUT NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
