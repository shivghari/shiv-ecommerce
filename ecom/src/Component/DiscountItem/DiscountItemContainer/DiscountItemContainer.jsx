import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";

import { useNavigate } from "react-router-dom";
import "./DiscountItemContainer.css";

function DiscountItemContainer({ Heading, Name, Image }) {
  const Navigate = useNavigate();

  return (
    <div className="soloDiscountHolder">
      <div className="discountDesc">
        <h1>{Heading}</h1>
        <div>
          <p className="discountProductName">{Name}</p>
        </div>
        <div>
          <p className="discountProductDetails">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut
          </p>
          <div className="discountPropertyHolder">
            <Row>
              <Col xs={12}>
                <CheckIcon /> Material Expose Like Metal
              </Col>
              <Col xs={12}>
                <CheckIcon /> Clear Lines and Geo Metric Figure
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <CheckIcon /> Simple Nuteral Colours
              </Col>
              <Col xs={12}>
                <CheckIcon /> Material Expose Like Metal
              </Col>
            </Row>
          </div>
          <div className="discountItemBtnHolder">
            <Button
              className="discountItemBtn"
              onClick={() => {
                Navigate("/productpage");
              }}
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
      <div className="discountImg" style={{ marginTop: "40px" }}>
        <img
          src={Image}
          alt="Discount Item"
          height="400px"
          width="400px"
          className="discountImagecss"
        />
      </div>
    </div>
  );
}

export default DiscountItemContainer;
