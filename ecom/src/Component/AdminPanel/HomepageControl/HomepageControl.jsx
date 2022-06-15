import React from "react";
import FeatureProductControl from "./FeatureProductControl/FeatureProductControl";
import LatestProductControl from "./LatestProductControl/LatestProductControl";
import TopCategoryControl from "./TopCategoryControl/TopCategoryControl";
import { Nav, Tab } from "react-bootstrap";
import "./HomepageControl.css";

function HomepageControl() {
  return (
    <div>
      <Tab.Container defaultActiveKey={"featureProductControl"}>
        <Nav className="navLinkContainerHomeControl">
          <div className="adminLinkHomeControl">
            <Nav.Item>
              <Nav.Link eventKey={"featureProductControl"}>
                Feature Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={"latestProduct"}>Latest Product</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={"trendingProducts"}>
                Trending Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={"topCategories"}>Top Categories</Nav.Link>
            </Nav.Item>
          </div>
        </Nav>
        <Tab.Content className="adminContent">
          <Tab.Pane eventKey={"featureProductControl"}>
            <FeatureProductControl />
          </Tab.Pane>
          <Tab.Pane eventKey={"latestProduct"}>
            <LatestProductControl />
          </Tab.Pane>
          <Tab.Pane eventKey={"trendingProducts"}>
            <h1>Trending Products</h1>
          </Tab.Pane>
          <Tab.Pane eventKey={"topCategories"}>
            <TopCategoryControl />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default HomepageControl;
