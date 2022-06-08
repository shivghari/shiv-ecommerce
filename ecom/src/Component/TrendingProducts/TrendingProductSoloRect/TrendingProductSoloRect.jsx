import React from "react";
// import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TP2 from "../TP2.png";
import "./TrendingProductSoloRect.css";
import { Card } from "antd";

function TrendingProductSoloRect() {
  return (
    <div>
      <div>
        <Card sx={{ width: "400px", marginTop: "10px", marginBottom: "10px" }}>
          <CardContent>
            <div className="RectTrendHeading">
              <h1>23% of in all product.</h1>
            </div>
            <div className="textImageContainer">
              <div className="shopNowContainer">
                <p>Shop Now</p>
              </div>
              <div>
                <img src={TP2} alt="Trending Product" height="150px" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TrendingProductSoloRect;
