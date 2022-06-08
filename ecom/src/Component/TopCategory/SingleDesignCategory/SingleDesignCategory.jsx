import "./SingleDesignCategory.css";
import React from "react";
import TP1 from "../TP1.png";
import { Button } from "react-bootstrap";

function SingleDesignCategory() {
  return (
    <div>
      <div className="CategoryhoverHolder">
        <div className="categoryCard">
          <img src={TP1} alt="Category Product" />
          <div className="categoryBtnContainer">
            <Button className="categoryBtn">View Shop</Button>
          </div>
        </div>
        <div className="categoryDisplay">
          <p className="categoryProductName">Mini LCW Chair</p>
          <p className="categoryProductPrice">$56.00</p>
        </div>
      </div>
    </div>
  );
}

export default SingleDesignCategory;
