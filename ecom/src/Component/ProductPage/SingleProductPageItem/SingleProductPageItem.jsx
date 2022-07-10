import React, { useEffect, useState } from "react";
import "./SingleProductPageItem.css";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import { useDispatch } from "react-redux";
import { addItem } from "../../../Feature/cartSlice";
import axios from "axios";

import Rating from "@mui/material/Rating";

function SingleProductPageItem({
  image,
  productname,
  price,
  stakedPrice,
  productID,
  rating,
  ratevotecount,
}) {
  const dispatch = useDispatch();

  const [liked, setliked] = useState();
  const [unlike, setunlike] = useState(true);
  const [check, setCheck] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/productPage/getWishListUser", {
        userID: localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token")).userID
          : "",
      })
      .then((response) => {
        if (response.data.wishlist.includes(productID)) {
          setliked(true);
          setCheck(true);
        }
      })
      .catch((err) => {
        console.log("Please Login");
      });
  }, []);

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

  const removeFromWish = (productID) => {
    axios
      .post("http://localhost:3001/productPage/removeFromwish", {
        userID: JSON.parse(localStorage.getItem("token")).userID,
        productID: productID,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err, "err");
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
                if (localStorage.getItem("token")) {
                  dispatch(
                    addItem({
                      productID: productID,
                      price: parseInt(price),
                      total: 1,
                    })
                  );
                  addToCart(price);
                } else {
                  console.log("please Login");
                }
              }}
            />
            {unlike && !check ? (
              <FavoriteBorderIcon
                className="iconGrid"
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    addATowish(productID);
                    setliked(true);
                    setunlike(false);
                    setCheck(true);
                  } else {
                    console.log("Please Login ");
                  }
                }}
              />
            ) : liked ? (
              <FavoriteOutlinedIcon
                className="iconGrid"
                onClick={() => {
                  removeFromWish(productID);
                  setliked(false);
                  setunlike(true);
                  setCheck(false);
                }}
              />
            ) : null}
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
        <div className="ratingAndVote">
          <Rating defaultValue={rating} precision={1} readOnly />
          <p>{ratevotecount}</p>
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
