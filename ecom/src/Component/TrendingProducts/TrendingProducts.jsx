import React from "react";
import TrendingProductSolo1 from "./TrendingProductSolo1/TrendingProductSolo1";
import TrendingProductSoloRect from "./TrendingProductSoloRect/TrendingProductSoloRect";
import TrendingProductRowSolo from "./TrendingProductRowSolo/TrendingProductRowSolo";
import { Row, Col } from "react-bootstrap";
import "./TrendingProducts.css";

function TrendingProducts() {
  return (
    <div className="trendingHolder">
      <div className="TrendingSecHeading">
        <h1>Trending Product</h1>
      </div>
      <Row className="TrendingRow">
        <Col lg={3} md={6} sm={6}>
          <TrendingProductSolo1 />
        </Col>
        <Col lg={3} md={6} sm={6}>
          <TrendingProductSolo1 />
        </Col>
        <Col lg={3} md={6} sm={6}>
          <TrendingProductSolo1 />
        </Col>
        <Col lg={3} md={6} sm={6}>
          <TrendingProductSolo1 />
        </Col>
      </Row>
      <Row className="TrendingRow">
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
    </div>
  );
}

export default TrendingProducts;
