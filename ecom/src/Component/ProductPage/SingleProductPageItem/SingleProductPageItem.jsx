import React, { useState } from "react";
import "./SingleProductPageItem.css";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import { useDispatch } from "react-redux";
import { addItem } from "../../../Feature/cartSlice";
import axios from "axios";

function SingleProductPageItem({
  image,
  productname,
  price,
  stakedPrice,
  productID,
}) {
  const dispatch = useDispatch();

  const [liked, setliked] = useState(false);
  const [unlike, setunlike] = useState(true);

  const addToCart = (price) => {
    axios
      .post("http://localhost:3001/productPage/addToCart", {
        userID: JSON.parse(localStorage.getItem("token")).userID,
        productID: productID,
        productPrice: price,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addATowish = (productID) => {
    axios
      .post("http://localhost:3001/productPage/addTowish", {
        userID: JSON.parse(localStorage.getItem("token")).userID,
        productID: productID,
      })
      .then((response) => {
        console.log("data", response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="productCard">
        <div className="imgiconHolder">
          <div className="iconHolder">
            <ZoomInIcon className="iconGrid" />
            <ShoppingCartIcon
              className="iconGrid"
              onClick={() => {
                dispatch(
                  addItem({
                    productID: productID,
                    price: parseInt(price),
                    total: 1,
                  })
                );
                addToCart(price);
              }}
            />
            <FavoriteBorderIcon
              className="iconGrid"
              onClick={() => {
                addATowish(productID);
              }}
            />
          </div>
          <div>
            <img
              src={`http://localhost:3001/static/${image}`}
              alt="product Img"
              height="150px"
              width="150px"
            />
          </div>
        </div>
        <div className="dataHolder">
          <p>{productname}</p>
          <div className="priceHolder">
            <p>{price}₹</p> <strike>{stakedPrice}₹</strike>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductPageItem;
