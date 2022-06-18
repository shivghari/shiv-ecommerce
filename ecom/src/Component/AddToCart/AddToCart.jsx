import React, { useState } from "react";
import "./AddToCart.css";
import { useEffect } from "react";
import axios from "axios";

function AddToCart() {
  const [cartdata, setCartdata] = useState([]);
  const [displayProduct, setDisplayProduct] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/productPage/fetchCart", {
        userID: JSON.parse(localStorage.getItem("token")).userID,
      })
      .then((response) => {
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
            console.log(response.data.response);
            setDisplayProduct(response.data.response);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  //   const getProducts = () => {
  //     var cartProductArr = [];
  //     cartdata &&
  //       cartdata.map((item) => {
  //         axios
  //           .post("http://localhost:3001/productPage/getProduct", {
  //             productID: item.productID,
  //           })
  //           .then((response) => {
  //             cartProductArr.push(response.data.response);
  //             console.log(response.data.response);
  //             setDisplayProduct([...cartProductArr]);
  //           })
  //           .catch((err) => {
  //             console.lo(err);
  //           });
  //       });
  //   };

  return (
    <div>
      <div>Your Cart</div>
      <div>
        {/* <button
          onClick={() => {
            getProducts();
          }}
        >
          My CArt
        </button> */}
        <div>
          {displayProduct.length &&
            displayProduct.map((item) => (
              <div>
                <p>{item.prouctname}</p>
                <p>{item.image}</p>
                <p>{item.price}</p>
                <p>{item.tags}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
