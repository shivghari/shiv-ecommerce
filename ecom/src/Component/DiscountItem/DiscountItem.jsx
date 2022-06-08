import "./DiscountItem.css";
import { Nav, Tab } from "react-bootstrap";
import "./DiscountItem.css";
import React from "react";
import DiscountItemContainer from "./DiscountItemContainer/DiscountItemContainer";

function DiscountItem() {
  return (
    <div className="discountItemcontentHolder">
      <div className="discountItemHeading">
        <h1>Discount Item</h1>
      </div>
      <Tab.Container defaultActiveKey={"woodChair"}>
        <div className="discountLinks">
          <Nav>
            <Nav.Item>
              <Nav.Link eventKey={"woodChair"}>Wood Chair</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={"plasticChair"}>Plastic Chair</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={"sofaChair"}>Sofa Chair</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div>
          <Tab.Content>
            <Tab.Pane eventKey={"woodChair"}>
              <DiscountItemContainer />
            </Tab.Pane>
            <Tab.Pane eventKey={"plasticChair"}>
              <DiscountItemContainer />
            </Tab.Pane>
            <Tab.Pane eventKey={"sofaChair"}>
              <DiscountItemContainer />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
}

export default DiscountItem;
