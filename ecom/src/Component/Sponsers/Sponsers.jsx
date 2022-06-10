import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Sponsers.css";

import SP1 from "./typography1.png";
import SP4 from "./typography4.png";

function Sponsers() {
  return (
    <div className="logosHolder">
      <Row>
        <Col xs={6} lg={3}>
          <img src={SP1} alt="Sponcers Logo" className="sponserImgContainer" />
        </Col>
        <Col xs={6} lg={3}>
          <img src={SP4} alt="Sponcers Logo" className="sponserImgContainer" />
        </Col>
        <Col xs={6} lg={3}>
          <img src={SP1} alt="Sponcers Logo" className="sponserImgContainer" />
        </Col>
        <Col xs={6} lg={3}>
          <img src={SP4} alt="Sponcers Logo" className="sponserImgContainer" />
        </Col>
      </Row>
    </div>
  );
}

export default Sponsers;
