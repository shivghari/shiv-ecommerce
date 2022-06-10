import "./LatestBlogHome.css";
import React from "react";
import SoloBlogContainer from "./SoloBlogContainer/SoloBlogContainer";
import { Col, Row } from "react-bootstrap";

function LatestBlogHome() {
  return (
    <div className="BlogContainer">
      <div className="BlogHomeHeading">
        <h1>Latest Blog</h1>
      </div>
      <div className="BlogDisplayer">
        <Row>
          <Col xs={12} md={6} lg={4}>
            <SoloBlogContainer />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <SoloBlogContainer />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <SoloBlogContainer />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default LatestBlogHome;
