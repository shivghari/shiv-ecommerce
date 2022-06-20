import "./SubscribeBar.css";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SubscribeBar() {
  const Navigate = useNavigate();
  return (
    <div className="BackGroundCover">
      <div className="subscribeBarContent">
        <h1>Get Latest Update By Subscribe Our Newsletter</h1>
        <div>
          <Button
            className="subscribeBtn"
            size="lg"
            onClick={() => {
              Navigate("/productpage");
            }}
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SubscribeBar;
