import React from "react";
import "./LatestProduct.css";
import { Nav, Tab } from "react-bootstrap";
import NewArrival from "./NewArrival/NewArrival";
import BestSeller from "./BestSeller/BestSeller";
import FeaturedList from "./FeaturedList/FeaturedList";
import SpecialOffer from "./SpecialOffer/SpecialOffer";

function LatestProduct() {
  return (
    <div className="latestProductSec">
      <div className="LatestProductHeading">
        <h1>Latest product</h1>
      </div>
      <div className="productContainer">
        <Tab.Container defaultActiveKey={"newArrival"}>
          <Nav>
            <div className="latestProductLinks">
              <Nav.Item>
                <Nav.Link eventKey={"newArrival"} style={{ color: "#151875" }}>
                  New Arrival
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={"bestSeller"}>Best Seller</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={"featured"}>Featured</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={"specialOffer"}>Special Offer</Nav.Link>
              </Nav.Item>
            </div>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey={"newArrival"}>
              <NewArrival />
            </Tab.Pane>
            <Tab.Pane eventKey={"bestSeller"}>
              <BestSeller />
            </Tab.Pane>
            <Tab.Pane eventKey={"featured"}>
              <FeaturedList />
            </Tab.Pane>
            <Tab.Pane eventKey={"specialOffer"}>
              <SpecialOffer />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default LatestProduct;
