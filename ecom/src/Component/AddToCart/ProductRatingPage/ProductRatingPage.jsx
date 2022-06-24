import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import "./ProductRatingPage.css";

import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

function ProductRatingPage({ paymentID }) {
  const [alldata, setalldata] = useState([]);
  const [dataTouse, setdataTouse] = useState([]);

  const Navigate = useNavigate();

  const productRating = new Map();

  useEffect(() => {
    axios
      .post("http://localhost:3001/productPage/getOrderData", {
        paymentID: paymentID,
      })
      .then((response) => {
        var newArr = [];
        console.log(response.data.response[0].orderlist, "data");
        setalldata(response.data.response[0].orderlist);
        response.data.response[0].orderlist &&
          response.data.response[0].orderlist.map((item) => {
            var newObj = {};
            newObj["productName"] = item.productID?.prouctname;
            newObj["image"] = item.productID?.image;
            newObj["price"] = item.productID?.price;
            newObj["desc"] = item.productID?.desc;
            newObj["productID"] = item.productID?._id;

            newArr.push(newObj);
          });
        console.log("arr check : ", newArr);
        setdataTouse(newArr);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  const manageReview = () => {
    var newArr = [];
    productRating.forEach(function (value, key) {
      var newObj = {};
      newObj["productID"] = key;
      newObj["rating"] = value;
      newArr.push(newObj);
    });
    axios
      .post("http://localhost:3001/productRating/addRating", {
        ratingData: newArr,
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
      <div className="RatingHeading">
        <h4>Please Rate The Products You Buy</h4>
      </div>
      <Row>
        {dataTouse &&
          dataTouse.map((item) => (
            <Col>
              <div className="ratingPageContainer">
                <img
                  src={`http://localhost:3001/static/${item.image}`}
                  alt="product"
                  width={"100px"}
                  height={"100px"}
                />
                <div>
                  <p>{item.productName}</p>
                  <p>{item.price} ₹</p>
                  <p>{item.desc}</p>
                </div>
              </div>
              <br />
              <Rating
                defaultValue={0}
                precision={1}
                size="large"
                onChange={(e) => {
                  productRating.set(item.productID, e.target.value);
                  console.log(productRating);
                }}
              />
            </Col>
          ))}
      </Row>
      <Button
        onClick={() => {
          manageReview();
          Navigate("/ordercomplete");
        }}
      >
        Submit Review
      </Button>
    </div>
  );
}

export default ProductRatingPage;
