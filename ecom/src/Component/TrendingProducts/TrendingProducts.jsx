import React from "react";
import TrendingProductSolo1 from "./TrendingProductSolo1/TrendingProductSolo1";
import TrendingProductSoloRect from "./TrendingProductSoloRect/TrendingProductSoloRect";
import TrendingProductRowSolo from "./TrendingProductRowSolo/TrendingProductRowSolo";
import { Row, Col } from "react-bootstrap";
import "./TrendingProducts.css";

function TrendingProducts() {
  return (
    <div className="tremdingHolder">
      <Row>
        <Col lg={3}>
          <TrendingProductSolo1 />
        </Col>
        <Col lg={3}>
          <TrendingProductSolo1 />
        </Col>
        <Col lg={3}>
          <TrendingProductSolo1 />
        </Col>
        <Col lg={3}>
          <TrendingProductSolo1 />
        </Col>
      </Row>
      <Row>
        <Col>
          <TrendingProductSoloRect />
        </Col>
        <Col>
          <TrendingProductSoloRect />
        </Col>
        <Col>
          <Row>
            <TrendingProductRowSolo />
          </Row>
          <Row>
            <TrendingProductRowSolo />
          </Row>
          <Row>
            <TrendingProductRowSolo />
          </Row>
        </Col>
      </Row>

      {/* <TrendingProductSolo1 />
      <TrendingProductSoloRect />
      <TrendingProductRowSolo /> */}
    </div>
  );
}

export default TrendingProducts;
