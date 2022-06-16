import "./SingleDesignCategory.css";
import React from "react";
import { Button } from "react-bootstrap";

function SingleDesignCategory({ productName, price, image }) {
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
            <Button className="categoryBtn">View Shop</Button>
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
