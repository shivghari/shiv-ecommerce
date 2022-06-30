import React, { useEffect, useState } from "react";
import "./FeatureSec1.css";

// import Card from "@mui/material/Card";
import { Card } from "antd";
import CardContent from "@mui/material/CardContent";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { addItem } from "../../Feature/cartSlice";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";

function FeatureSec1({
  productPhoto,
  productname,
  productCode,
  productPrice,
  productRating,
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
        console.count(err);
      });
  };

  const addATowish = (productID) => {
    axios
      .post("http://localhost:3001/productPage/addTowish", {
        userID: JSON.parse(localStorage.getItem("token")).userID,
        productID: productCode,
      })
      .then((response) => {
        console.log("data", response);
      })
      .catch((err) => {
        console.count(err);
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
        console.count(err, "err");
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
        console.count(err);
      });
  }, []);

  return (
    <div>
      <div className="cardContainer">
        <Card
          style={{
            width: "270px",
            height: "430px",
          }}
        >
          <CardContent>
            <div style={{ height: "20px", width: "100%" }}>
              <div className="cardIcons">
                <ShoppingCartOutlinedIcon
                  sx={{
                    fontSize: "18px",
                    color: "#1389FF",
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
                  sx={{ fontSize: "18px", color: "#1389FF", cursor: "pointer" }}
                />
              </div>
            </div>
            <div className="imageContainer">
              <img
                src={productPhoto}
                alt="Feature products"
                className="productImg"
              />
            </div>
            <div style={{ height: "40px" }}>
              <div className="btnContainer">
                <Button
                  variant="contained"
                  size="small"
                  sx={{ fontSize: "11px", backgroundColor: "#08D15F" }}
                >
                  View Details
                </Button>
              </div>
            </div>
            <Rating defaultValue={productRating} precision={1} readOnly />
            <div className="productDescription">
              <p className="productName">{productname}</p>
              <p className="productCode">{productCode}</p>
              <p className="productPrice">{productPrice} ₹</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FeatureSec1;
