import React from "react";
import "./FeatureSec1.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import Button from "@mui/material/Button";

function FeatureSec1({ productPhoto, productname, productCode, productPrice }) {
  return (
    <div>
      <div className="cardContainer">
        <Card
          sx={{
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
                  }}
                />
                <FavoriteBorderOutlinedIcon
                  sx={{ fontSize: "18px", color: "#1389FF" }}
                />
                <ZoomInOutlinedIcon
                  sx={{ fontSize: "18px", color: "#1389FF" }}
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
            <div className="productDescription">
              <p className="productName">{productname}</p>
              <p className="productCode">{productCode}</p>
              <p className="productPrice">{productPrice}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FeatureSec1;
