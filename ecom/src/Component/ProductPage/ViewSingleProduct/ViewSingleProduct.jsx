import React, { useState, useEffect } from "react";
import "./ViewSingleProduct.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { Button } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import RelatedProductComponent from "../RelatedProductComponent/RelatedProductComponent";
import { useDispatch } from "react-redux";
import Sponsers from "../../Sponsers/Sponsers";
import { addItem } from "../../../Feature/cartSlice";

function ViewSingleProduct() {
  const Params = useParams();
  const [product, setProduct] = useState();
  const [rating, setrating] = useState();

  //wish button useState
  const [liked, setliked] = useState();
  const [unlike, setunlike] = useState(true);
  const [check, setCheck] = useState();

  //plays vital role....
  const [category, setcategory] = useState("");

  const dispatch = useDispatch();

  //add to cart function
  const addToCart = (productID, price) => {
    axios
      .post("http://localhost:3001/productPage/addToCart", {
        userID: JSON.parse(localStorage.getItem("token")).userID,
        productID: productID,
        productPrice: price,
      })
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  //add to wish And Remove from Wish function
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

  //already in wishlist cehcking

  useEffect(() => {
    axios
      .post("http://localhost:3001/productPage/getWishListUser", {
        userID: localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token")).userID
          : "",
      })
      .then((response) => {
        console.log("wishlist", response);
        if (response?.data?.wishlist?.includes(product?._id)) {
          console.log("product already in wish list");
          setliked(true);
          setCheck(true);
        }
      })
      .catch((err) => {
        console.log("Please Login");
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/fetchProduct/getPerticularProduct",
        {
          productID: Params.productID,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token"))
              ? JSON.parse(localStorage.getItem("token")).token
              : "",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
        setrating(response.data.rating);
        setcategory(response.data.category);
      })
      .catch((err) => {
        console.log(err, "err in product page");
      });
  }, [Params]);

  return (
    <div>
      <div className="zoomProductContainer">
        <div className="productImageContainer">
          <div className="ImageColumn">
            <img
              src={`http://localhost:3001/static/${product?.image}`}
              width="125px"
              height="125px"
              className="ColumnImageStyle"
            />
            <br />
            <img
              src={`http://localhost:3001/static/${product?.image}`}
              width="125px"
              height="125px"
              className="ColumnImageStyle"
            />
            <br />
            <img
              src={`http://localhost:3001/static/${product?.image}`}
              width="125px"
              height="125px"
              className="ColumnImageStyle"
            />
          </div>
          <div className="SoloBogImage">
            <img
              src={`http://localhost:3001/static/${product?.image}`}
              width="350px"
              height="400px"
              className="ColumnImageStyle"
            />
          </div>
        </div>
        <div className="ViewProductDetalisContainer">
          <p className="ViewProductNamePage">{product?.prouctname}</p>
          <div className="ratingAndGui">
            {rating !== undefined ? (
              <Rating defaultValue={product?.rating} precision={1} readOnly />
            ) : null}
            <p>({product?.ratevotecount})</p>
          </div>
          <div className="ViewProductPriceContainer">
            <p className="ViewProductPrice">₹ {product?.price}</p>
            <strike className="ViewProductStakedPrice">
              ₹ {product?.stakedprice}
            </strike>
          </div>
          <p className="ViewPRodctDesc">
            {product?.desc} this is the wonderfull product and I have bough it
            and working very fine and.
          </p>
          <div className="ViewButtonAddtoCartButtonHolder">
            <Button
              className="ViewButtonAddtoCartButton"
              onClick={() => {
                if (localStorage.getItem("token")) {
                  dispatch(
                    addItem({
                      productID: product._id,
                      price: parseInt(product?.price),
                      total: 1,
                    })
                  );
                  addToCart(product?._id, product?.price);
                } else {
                  console.log("please Login");
                }
              }}
            >
              Add To Cart
            </Button>
            {unlike && !check ? (
              <FavoriteBorderIcon
                onClick={() => {
                  addATowish(product?._id);
                  setunlike(false);
                  setliked(true);
                  setCheck(true);
                }}
                fontSize="large"
                sx={{ marginLeft: "10px" }}
              />
            ) : liked ? (
              <FavoriteOutlinedIcon
                onClick={() => {
                  removeFromWish(product?._id);
                  setliked(false);
                  setunlike(true);
                  setCheck(false);
                }}
                fontSize="large"
                sx={{ marginLeft: "10px" }}
              />
            ) : null}
          </div>
          <div className="tagsAndCategories">
            <p>Categories : {product?.category}</p>
            <p>Tags : {product?.tags}</p>
          </div>
        </div>
      </div>
      <div className="relatedProductComponent">
        {category && (
          <RelatedProductComponent
            productCategory={product?.category}
            neglateProductID={product?._id}
          />
        )}
      </div>
      <div>
        <Sponsers />
      </div>
    </div>
  );
}

export default ViewSingleProduct;
