import React from "react";
import "./TrendingProductSolo1.css";
import CardContent from "@mui/material/CardContent";
import TP1 from "../TP1.png";
import { Card } from "antd";

function TrendingProductSolo1() {
  return (
    <div>
      <div>
        <Card
          sx={{
            width: "270px",
            marginBottom: "10px",
          }}
        >
          <CardContent>
            <div style={{ height: "20px", width: "100%" }}></div>
            <div>
              <img src={TP1} alt="Trndingproducts" />
            </div>
            <div className="solo1Desc">
              <p className="solo1name">Cantlivevr Chair</p>
              <p className="solo1price">
                $26.00 <strike className="solo1strickedPrice">$42.00</strike>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TrendingProductSolo1;
