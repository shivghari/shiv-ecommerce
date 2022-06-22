import React, { useState } from "react";
import "./AddToCart.css";
import { useEffect } from "react";
import axios from "axios";

import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IconButton } from "@mui/material";

import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import cc from "./cc.png";

import {
  addItem,
  removeItem,
  clearCart,
  setUser,
} from "../../Feature/cartSlice";

//patment Script Loading Function

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function AddToCart() {
  const [cartdata, setCartdata] = useState([]);
  const [displayProduct, setDisplayProduct] = useState([]);

  const [purchase, setpurchase] = useState([]);

  const [paymentDetails, setpaymentDetails] = useState();

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalItem = useSelector((state) => state.cart.totalItem);
  const itemList = useSelector((state) => state.cart.cartItem);

  var data;

  const refresh = () => {
    window.location.reload(false);
  };

  //payment function

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    data = await fetch("http://localhost:3001/razorpay", {
      method: "POST",
      body: JSON.stringify({
        amount: totalAmount + 30,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((t) => t.json());

    console.log(data);
    setpaymentDetails(data);

    const options = {
      key: "rzp_test_uPoswECZOQZFCj",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Hecto Pay",
      description: "Thank you For Shopping..!",
      image: cc,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        localStorage.setItem("payamount", data.amount);
        localStorage.setItem("payid", data.id);
        checkout();
        dispatch(clearCart());
        clearUserCart();
        Navigate("/ordercomplete");
      },
      prefill: {
        name: "Shiv",
        email: "shiv@gmail.com",
        phone_number: "9664893918",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  //end patment function

  useEffect(() => {
    axios
      .post("http://localhost:3001/productPage/fetchCart", {
        userID: JSON.parse(localStorage.getItem("token")).userID,
      })
      .then((response) => {
        console.log(response.data.data[0].cart, "check Item ");
        setpurchase(response.data.data[0].cart);
        setCartdata(response.data.data[0].cart);
        var productIdArr = [];
        response.data.data[0].cart.map((i) => {
          productIdArr.push(i.productID);
        });

        axios
          .post("http://localhost:3001/thisProd", {
            productIDs: productIdArr,
          })
          .then((response) => {
            console.log(response.data.cartdata, "products");
            setDisplayProduct(response.data.cartdata);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  const checkout = () => {
    axios
      .post("http://localhost:3001/productPage/checkout", {
        userID: JSON.parse(localStorage.getItem("token")).userID,
        itemList: purchase,
        totalamount: parseInt(localStorage.getItem("payamount")) / 100,
        paymentid: localStorage.getItem("payid"),
      })
      .then((response) => {
        console.log(response);
        localStorage.removeItem("payamount");
        localStorage.removeItem("payid");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const clearUserCart = () => {
    axios.post("http://localhost:3001/productPage/clearCart", {
      userID: JSON.parse(localStorage.getItem("token")).userID,
    });
  };

  const addProductCount = (ID) => {
    axios
      .post("http://localhost:3001/productPage/addCount", {
        productID: ID,
        userID: JSON.parse(localStorage.getItem("token")).userID,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deductProductCount = (ID) => {
    axios
      .post("http://localhost:3001/productPage/deductCount", {
        productID: ID,
        userID: JSON.parse(localStorage.getItem("token")).userID,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deductProduct = (ID) => {
    axios
      .post("http://localhost:3001/productPage/deductProduct", {
        productID: ID,
        userID: JSON.parse(localStorage.getItem("token")).userID,
      })
      .then((response) => {
        console.log(response);
        refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <h1>Your Cart</h1>
      </div>
      <div className="toalCartContainer">
        <div>
          {displayProduct.length > 0 &&
            displayProduct.map((item) => (
              <div key={item._id}>
                <div className="cartproductContainer">
                  <div className="cartProductImageHolder">
                    <img
                      src={`http://localhost:3001/static/${item.image}`}
                      alt="product"
                      height="100px"
                      width="100px"
                    />
                  </div>
                  <div className="cartProductDetailsHolder">
                    <p className="cartprodName">{item.prouctname}</p>
                    <p className="cartProdDetails">{item.desc}</p>
                    <p>{item.price}₹</p>
                  </div>
                  <div className="manageQuetity">
                    <ArrowDropUpOutlinedIcon
                      className="iconscart"
                      onClick={() => {
                        dispatch(
                          addItem({
                            productID: item._id,
                            price: parseInt(item.price),
                          })
                        );
                        console.log(item._id, "rpoductID");
                        addProductCount(item._id);
                      }}
                    />
                    <input
                      defaultValue={0}
                      value={itemList[item._id]}
                      className="numberHolder"
                      readOnly={true}
                    />
                    <ArrowDropDownOutlinedIcon
                      className="iconscart"
                      onClick={() => {
                        dispatch(
                          removeItem({
                            productID: item._id,
                            price: parseInt(item.price),
                          })
                        );
                        if (itemList[item._id] > 1) {
                          deductProductCount(item._id);
                        } else {
                          deductProduct(item._id);
                        }
                      }}
                    />
                  </div>
                  {/* <Button
                    className="DeleteProductBtn"
                    onClick={() => {
                      deductProduct(item._id);
                    }}
                  >
                    Delete Product
                  </Button> */}
                  <IconButton
                    className="DeleteProductBtn"
                    sx={{ marginLeft: "50px", color: "red" }}
                    onClick={() => {
                      deductProduct(item._id);
                    }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          {displayProduct.length === 0 && (
            <div>
              <h1>Cart is Empty..Try to shopping </h1>
            </div>
          )}
        </div>
        <div className="totalAmountContainer">
          <div className="finalAmountDetails">
            <p>Total Item :</p>
            <p>{totalItem}</p>
          </div>
          <div className="finalAmountDetails">
            <p>total Amount : </p>
            <p>₹{totalAmount}</p>
          </div>
          <div className="finalAmountDetails">
            <p>Delivery Fees :</p>
            <p>₹30</p>
          </div>
          <hr className="horizontal_line" />
          <div className="finalAmountDetails">
            <p>Total Payable Amount :</p>
            <p>₹{totalAmount + 30}</p>
          </div>
          <div className="finalAmountDetails amountBtn">
            <Button
              className="btn-clear"
              onClick={() => {
                dispatch(clearCart());
                clearUserCart();
                refresh();
              }}
            >
              Clear Cart
            </Button>
            <Button
              className="btn-checkout"
              onClick={() => {
                displayRazorpay();
              }}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
