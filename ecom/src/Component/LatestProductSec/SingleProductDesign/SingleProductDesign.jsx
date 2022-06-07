import React from "react";
import "./SingleProductDesign.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";

function SingleProductDesign({
  productImage,
  productName,
  productPrice,
  strikedPrice,
}) {
  return (
    <div className="SingleproductCardContainer">
      <Card sx={{ width: "360px" }}>
        <CardContent>
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
                  />
                  <FavoriteBorderOutlinedIcon
                    sx={{
                      fontSize: "18px",
                      color: "#1389FF",
                      marginBottom: "10px",
                      cursor: "pointer",
                    }}
                  />
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
                <img src={productImage} alt="New Arrival" />
              </div>
            </div>
            <div className="productDesc">
              <p className="arrivalProductName">{productName}</p>
              <p className="arrivalProductPrice">
                {productPrice}{" "}
                <strike className="strikedprice">{strikedPrice}</strike>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SingleProductDesign;
