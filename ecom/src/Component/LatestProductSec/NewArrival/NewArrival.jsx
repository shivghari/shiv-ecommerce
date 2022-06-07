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
          <Col>
            <SingleProductDesign
              productImage={NA1}
              productName={"Comfort Handy Craft"}
              productPrice={"$42.00"}
              strikedPrice={"$55.00"}
            />
          </Col>
          <Col>
            <SingleProductDesign
              productImage={NA1}
              productName={"Comfort Handy Craft"}
              productPrice={"$42.00"}
              strikedPrice={"$55.00"}
            />
          </Col>
          <Col>
            <SingleProductDesign
              productImage={NA1}
              productName={"Comfort Handy Craft"}
              productPrice={"$42.00"}
              strikedPrice={"$55.00"}
            />
          </Col>
          <Col>
            <SingleProductDesign
              productImage={NA1}
              productName={"Comfort Handy Craft"}
              productPrice={"$42.00"}
              strikedPrice={"$55.00"}
            />
          </Col>
          <Col>
            <SingleProductDesign
              productImage={NA1}
              productName={"Comfort Handy Craft"}
              productPrice={"$42.00"}
              strikedPrice={"$55.00"}
            />
          </Col>
          <Col>
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
