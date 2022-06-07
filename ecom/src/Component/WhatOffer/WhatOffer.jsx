import React from "react";
import "./WhatOffer.css";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import truck from "./delivery-truck.png";
import handMoney from "./handMoney.png";
import medal from "./medal.png";
import telephone from "./telephone.png";

import { Row, Col } from "react-bootstrap";

function WhatOffer() {
  return (
    <div className="WhatOfferContainer">
      <div className="WhatOfferHeading">
        <h1>What Sopex Offer</h1>
      </div>
      <div className="offerBoxHolder">
        <Row>
          <Col>
            <div className="offerBox">
              <img src={truck} alt="truck" />
              <h5>24/7 Support</h5>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text.
              </p>
            </div>
          </Col>
          <Col>
            <div className="offerBox">
              <img src={handMoney} alt="truck" />
              <h5>24/7 Support</h5>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text.
              </p>
            </div>
          </Col>
          <Col>
            <div className="offerBox">
              <img src={medal} alt="truck" />
              <h5>24/7 Support</h5>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text.
              </p>
            </div>
          </Col>
          <Col>
            <div className="offerBox">
              <img src={telephone} alt="truck" />
              <h5>24/7 Support</h5>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default WhatOffer;
