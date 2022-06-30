import "./SingleDesignCategory.css";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

function SingleDesignCategory({ productName, price, image, rating }) {
  const Navigate = useNavigate();
  return (
    <div>
      <div className="CategoryhoverHolder">
        <div className="categoryCard">
          <img
            src={`http://localhost:3001/static/${image}`}
            alt="Category Product"
            height="170px"
            width="170px"
          />
          <div className="categoryBtnContainer">
            <Button
              className="categoryBtn"
              onClick={() => {
                Navigate("/productpage");
              }}
            >
              View Shop
            </Button>
          </div>
        </div>
        <div className="categoryDisplay">
          <p className="categoryProductName">{productName}</p>
          <p className="categoryProductPrice">{`$${price}`}</p>
        </div>
        <Rating defaultValue={rating} precision={1} readOnly />
      </div>
    </div>
  );
}

export default SingleDesignCategory;
