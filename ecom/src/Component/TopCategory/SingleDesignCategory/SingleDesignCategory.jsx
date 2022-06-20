import "./SingleDesignCategory.css";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SingleDesignCategory({ productName, price, image }) {
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
      </div>
    </div>
  );
}

export default SingleDesignCategory;
