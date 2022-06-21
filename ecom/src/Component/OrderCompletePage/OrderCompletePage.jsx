import "./OrderCompletePage.css";

import React from "react";
import clock from "./clock.png";
import notepad from "./notepad.png";

import { useNavigate } from "react-router-dom";

import Sponsers from "../Sponsers/Sponsers";
import { Button } from "react-bootstrap";

function OrderCompletePage() {
  const Navigate = useNavigate();
  return (
    <div>
      <div className="OrderPageContainer">
        <div>
          <img src={clock} alt="clock" width="80px" height="80px" />
        </div>
        <div className="orderCompletetextHolder">
          <h1>Your Order is Complete!</h1>
          <p>
            Thank you for your order! Your order is being processed and will be
            completed within 3-6 hours. You will receive an email confirmation
            when your order is completed.
          </p>
          <Button
            className="orderCompleteButton"
            onClick={() => {
              Navigate("/productpage");
            }}
          >
            Continue Shopping
          </Button>
        </div>
        <div className="notePadHolder">
          <img
            src={notepad}
            alt="notepad"
            width="80px"
            height="80px"
            className="notepadImg"
          />
        </div>
      </div>
      <Sponsers />
    </div>
  );
}

export default OrderCompletePage;
