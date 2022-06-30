import React, { useEffect, useState } from "react";
import "./SingleProductDesign.css";

// import Card from "@mui/material/Card";
import { Card } from "antd";
import { Rating } from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addItem } from "../../../Feature/cartSlice";
import axios from "axios";

function SingleProductDesign({
  productImage,
  productName,
  productPrice,
  strikedPrice,
  rating,
  productCode,
}) {
  const [liked, setliked] = useState();
  const [unlike, setunlike] = useState(true);
  const [check, setCheck] = useState();

  const dispatch = useDispatch();

  const addToCart = (price) => {
    axios
      .post("http://localhost:3001/productPage/addToCart", {
        userID: JSON.parse(localStorage.getItem("token"))
          ? JSON.parse(localStorage.getItem("token")).userID
          : "",
        productID: productCode,
        productPrice: productPrice,
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
        userID: JSON.parse(localStorage.getItem("token"))
          ? JSON.parse(localStorage.getItem("token")).userID
          : "",
        productID: productCode,
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
        userID: JSON.parse(localStorage.getItem("token"))
          ? JSON.parse(localStorage.getItem("token")).userID
          : "",
        productID: productCode,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:3001/productPage/getWishListUser", {
        userID: JSON.parse(localStorage.getItem("token"))
          ? JSON.parse(localStorage.getItem("token")).userID
          : "",
      })
      .then((response) => {
        if (response.data.wishlist.includes(productCode)) {
          setliked(true);
          setCheck(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="SingleproductCardContainer">
      <Card style={{ width: "300px" }}>
        <div className="card-content">
          <div className="ImgIconContainer">
            <div className="IconListHolder">
              <div className="iconList">
                <ShoppingCartOutlinedIcon
                  sx={{
                    fontSize: "18px",
                    color: "#1389FF",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    dispatch(
                      addItem({
                        productID: productCode,
                        price: parseInt(productPrice),
                        total: 1,
                      })
                    );
                    addToCart(productPrice);
                  }}
                />
                {unlike && !check ? (
                  <FavoriteBorderOutlinedIcon
                    sx={{
                      fontSize: "18px",
                      color: "#1389FF",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                    onClick={() => {
                      addATowish(productCode);
                      setliked(true);
                      setunlike(false);
                      setCheck(true);
                    }}
                  />
                ) : liked ? (
                  <FavoriteIcon
                    sx={{
                      fontSize: "18px",
                      color: "#1389FF",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                    onClick={() => {
                      removeFromWish(productCode);
                      setliked(false);
                      setunlike(true);
                      setCheck(false);
                    }}
                  />
                ) : null}

                <ZoomInOutlinedIcon
                  sx={{
                    fontSize: "18px",
                    color: "#1389FF",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            <div className="imgComtainer">
              <img
                src={productImage}
                alt="New Arrival"
                height="200px"
                width="200px"
              />
            </div>
          </div>
          <Rating defaultValue={rating} precision={1} readOnly />
          <div className="productDesc">
            <p className="arrivalProductName">{productName}</p>
            <p className="arrivalProductPrice">
              {productPrice}{" "}
              <strike className="strikedprice">{strikedPrice}</strike>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SingleProductDesign;
