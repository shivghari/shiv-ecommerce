import "./DiscountItem.css";
import { Nav, Tab } from "react-bootstrap";
import "./DiscountItem.css";
import React from "react";
import DiscountItemContainer from "./DiscountItemContainer/DiscountItemContainer";
import DI1 from "./DiscountItemContainer/DI1.png";
import LatherChair from "./Lather Chair.png";
import WodenChair from "./wooden chair.png";

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
              <DiscountItemContainer
                Heading={"All Time Great Prices"}
                Name={"Wooden Chair"}
                Image={WodenChair}
              />
            </Tab.Pane>
            <Tab.Pane eventKey={"plasticChair"}>
              <DiscountItemContainer
                Heading={"20% Discount on All the products"}
                Name={"Eams Sofa Compact"}
                Image={DI1}
              />
            </Tab.Pane>
            <Tab.Pane eventKey={"sofaChair"}>
              <DiscountItemContainer
                Heading={"To make your house look good"}
                Name={"King Chair"}
                Image={LatherChair}
              />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
}

export default DiscountItem;
