import React from "react";
import "./SingleProductPageItem.css";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
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

  const addToCart = () => {
    axios
      .post("http://localhost:3001/productPage/addToCart", {
        userID: JSON.parse(localStorage.getItem("token")).userID,
        productID: productID,
      })
      .then((response) => {
        console.log(response);
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
                  })
                );
                addToCart();
              }}
            />
            <FavoriteBorderIcon className="iconGrid" />
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
