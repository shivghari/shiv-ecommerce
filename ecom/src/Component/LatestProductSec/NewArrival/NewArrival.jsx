import React from "react";
import SingleProductDesign from "../SingleProductDesign/SingleProductDesign";
import "./NewArrival.css";

import { Row, Col } from "react-bootstrap";

import NA1 from "../SingleProductDesign/NA1.png";

function NewArrival() {
  return (
    <div>
      <div className="ArrivalHolder">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={6} sm={6} lg={4}>
            <SingleProductDesign
              productImage={NA1}
              productName={"Comfort Handy Craft"}
              productPrice={"$42.00"}
              strikedPrice={"$55.00"}
            />
          </Col>
          <Col xs={24} md={6} sm={6} lg={4}>
            <SingleProductDesign
              productImage={NA1}
              productName={"Comfort Handy Craft"}
              productPrice={"$42.00"}
              strikedPrice={"$55.00"}
            />
          </Col>
          <Col xs={24} md={6} sm={6} lg={4}>
            <SingleProductDesign
              productImage={NA1}
              productName={"Comfort Handy Craft"}
              productPrice={"$42.00"}
              strikedPrice={"$55.00"}
            />
          </Col>
          <Col xs={24} md={6} sm={6} lg={4}>
            <SingleProductDesign
              productImage={NA1}
              productName={"Comfort Handy Craft"}
              productPrice={"$42.00"}
              strikedPrice={"$55.00"}
            />
          </Col>
          <Col xs={24} md={6} sm={6} lg={4}>
            <SingleProductDesign
              productImage={NA1}
              productName={"Comfort Handy Craft"}
              productPrice={"$42.00"}
              strikedPrice={"$55.00"}
            />
          </Col>
          <Col xs={24} md={6} sm={6} lg={4}>
            <SingleProductDesign
              productImage={NA1}
              productName={"Comfort Handy Craft"}
              productPrice={"$42.00"}
              strikedPrice={"$55.00"}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default NewArrival;
