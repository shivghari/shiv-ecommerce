import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import TP1 from "../TP1.png";

function TrendingProductSolo1() {
  return (
    <div>
      <div>
        <Card
          sx={{
            width: "270px",
          }}
        >
          <CardContent>
            <div style={{ height: "20px", width: "100%" }}></div>
            <div>
              <img src={TP1} alt="Trndingproducts" />
            </div>
            <div>
              <p>Cantlivevr Chair</p>
              <p>
                $26.00 <strike>$42.00</strike>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TrendingProductSolo1;
