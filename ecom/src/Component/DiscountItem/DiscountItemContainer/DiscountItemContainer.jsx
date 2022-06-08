import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import DI1 from "./DI1.png";
import "./DiscountItemContainer.css";

function DiscountItemContainer({ Heading, Name, Image }) {
  return (
    <div className="soloDiscountHolder">
      <div className="discountDesc">
        <h1>20% Discount Of All Product</h1>
        <div>
          <p className="discountProductName">Eams Sofa Compact</p>
        </div>
        <div>
          <p className="discountProductDetails">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut
          </p>
          <div className="discountPropertyHolder">
            <Row>
              <Col className="">
                <CheckIcon /> Material Expose Like Metal
              </Col>
              <Col>
                <CheckIcon /> Clear Lines and Geo Metric Figure
              </Col>
            </Row>
            <Row>
              <Col>
                <CheckIcon /> Simple Nuteral Colours
              </Col>
              <Col>
                <CheckIcon /> Material Expose Like Metal
              </Col>
            </Row>
          </div>
          <div className="discountItemBtnHolder">
            <Button className="discountItemBtn">Shop Now</Button>
          </div>
        </div>
      </div>
      <div className="discountImg">
        <img src={DI1} alt="Discount Item" height="497px" width="560px" />
      </div>
    </div>
  );
}

export default DiscountItemContainer;
