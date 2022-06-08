import "./SubscribeBar.css";
import React from "react";
import { Button } from "react-bootstrap";

function SubscribeBar() {
  return (
    <div className="BackGroundCover">
      <div className="subscribeBarContent">
        <h1>Get Latest Update By Subscribe Our Newsletter</h1>
        <div>
          <Button className="subscribeBtn" size="lg">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SubscribeBar;
