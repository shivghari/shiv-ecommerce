import React from "react";

import BackEclipsPink from "./BackEclipsdPink.png";
import "./SpecialProductDisplay1.css";
import { Button } from "react-bootstrap";
import Chair from "./Chair.png";

function SpecialProductDisplay1() {
  return (
    <div className="specialProductAllDeaitlsHolder">
      <div className="specialProductAndDecHolder">
        <div style={{ width: "fit-content" }}>
          <img
            src={BackEclipsPink}
            alt="specialProduct"
            className="imageBackround"
          />
          <img src={Chair} alt="specialProduct" className="specialImage" />
        </div>
        <div className="spacer"></div>
        <div className="specialProductDetailsHolder">
          <h1>Unique Feature Of Latest and Trending Product</h1>
          <div className="dotDescHolder">
            <div>
              <span class="dotPink"></span>
            </div>
            <p>
              All frames are constructed with hardwood and solid and laminates
            </p>
          </div>
          <div className="dotDescHolder">
            <div>
              <span class="dotBlue"></span>
            </div>
            <p>
              All frames are constructed with hardwood and solid and laminates
              All frames
            </p>
          </div>
          <div className="dotDescHolder">
            <div>
              <span class="dotGreen"></span>
            </div>
            <p>
              Aff frames are constructed with hardwood and solid and laminates
              with hardwood and solid and laminates
            </p>
          </div>
          <div className="buttonAndDetailsHolder">
            <Button className="specialAddtoCart">Add to Cart</Button>
            <div className="specialProductDetails">
              <p className="specialProductName">B&amp;B Italian Sofa</p>
              <p className="specialProductPrice">$32.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialProductDisplay1;
