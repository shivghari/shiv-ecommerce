import React from "react";
import "./SoloBlogContainer.css";

import Blog1 from "./Blog1.png";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function SoloBlogContainer() {
  return (
    <div className="BlogPostHolder">
      <div className="blogImage">
        <img src={Blog1} alt="BlogThumbnail" className="curveImg" />
      </div>
      <div className="BlogdetailsContainer">
        <div className="writerDateHolder">
          <p className="blogWriter">
            <BorderColorIcon
              sx={{ fontSize: "20px", marginRight: "10px", color: "#FB2E86;" }}
            />
            Steve Smith
          </p>
          <p className="blogdate">
            <CalendarMonthIcon
              sx={{ fontSize: "20px", marginRight: "10px", color: " #FFA454" }}
            />
            21 August,2022
          </p>
        </div>
        <div className="blogNameHolder">
          <p className="blogName"> Top essencial Trends in 2022</p>
          <p className="BlogDesc">
            More off this less hello samlande lied much over tightly circa horse
            taped mightly
          </p>
          <p className="BlogreadMore">Read More</p>
        </div>
      </div>
    </div>
  );
}

export default SoloBlogContainer;
