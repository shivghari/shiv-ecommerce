import React from "react";
import "../HomeSec1/HomeSec1.css";
// import Button from "@mui/material/Button";
// import Lamp from "./homepagelight.png";
// import Eclips from "./EllipsePink.png";
// import Chair from "./chairPink.png";

function SliderComponent({ Lamp, Eclips, Chair, Button, BigHeading }) {
  return (
    <div>
      <div className="Sec1-background">
        <img src={Lamp} alt="lightLamp" className="lamp" />
        <div className="firstDisplay">
          <div className="slider-Content">
            <div className="smallDesc">
              <p>Best Furniture For your Castle...</p>
            </div>
            <div className="big-heading">
              <h1>{BigHeading}</h1>
            </div>
            <div className="extra-desc">
              Loream Ipsom and very iasoaj akjshnfa kasf ksflafas kahsoifas
              aisasfalsi
            </div>
            <div className="btnContainer">
              <Button
                size="large"
                variant="contained"
                className="shopNowbtn"
                sx={{ backgroundColor: "#FB2E86" }}
              >
                Shop Now
              </Button>
            </div>
          </div>
          <img src={Chair} alt="eclipsBack" className="eclipsPink" />
        </div>
      </div>
    </div>
  );
}

export default SliderComponent;
