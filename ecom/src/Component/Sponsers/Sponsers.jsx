import React from "react";
import "./Sponsers.css";

import SP1 from "./typography1.png";
import SP2 from "./typography2.png";
import SP3 from "./typography3.png";
import SP4 from "./typography4.png";

function Sponsers() {
  return (
    <div className="logosHolder">
      <img src={SP1} alt="Sponcers Logo" className="sponserImgContainer" />
      <img src={SP2} alt="Sponcers Logo" className="sponserImgContainer" />
      <img src={SP3} alt="Sponcers Logo" className="sponserImgContainer" />
      <img src={SP4} alt="Sponcers Logo" className="sponserImgContainer" />
    </div>
  );
}

export default Sponsers;
