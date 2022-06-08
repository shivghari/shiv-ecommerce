import React from "react";
// import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TP3 from "../TP3.png";
import "./TrendingProductRowSolo.css";
import { Card } from "antd";

function TrendingProductRowSolo() {
  return (
    <Card style={{ height: "80px", width: "fit-content", margin: "auto" }}>
      <CardContent>
        <div className="productRowHolder">
          <div className="rowImageHolder">
            <img src={TP3} alt="Trending Product" />
          </div>
          <div className="rowproductDesc">
            <p className="rowProductName">Exclusive Seat Chair</p>
            <p className="rowProductPrice">
              <strike>$32.00</strike>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TrendingProductRowSolo;
