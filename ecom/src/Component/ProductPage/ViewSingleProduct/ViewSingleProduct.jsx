import React, { useState, useEffect } from "react";
import "./ViewSingleProduct.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { Button } from "react-bootstrap";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ViewSingleProduct() {
  const Params = useParams();
  const [product, setProduct] = useState();
  const [rating, setrating] = useState();
  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/fetchProduct/getPerticularProduct",
        {
          productID: Params.productID,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
        setrating(response.data.rating);
      })
      .catch((err) => {
        console.log(err, "err in product page");
      });
  }, []);
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
            {rating != undefined ? (
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
            <Button className="ViewButtonAddtoCartButton">Add To Cart</Button>
            <FavoriteBorderIcon fontSize="medium" sx={{ marginLeft: "10px" }} />
          </div>
          <div className="tagsAndCategories">
            <p>Categories : {product?.category}</p>
            <p>Tags : {product?.tags}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleProduct;
