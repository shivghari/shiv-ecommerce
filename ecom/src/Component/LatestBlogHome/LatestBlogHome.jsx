import "./LatestBlogHome.css";
import React from "react";
import SoloBlogContainer from "./SoloBlogContainer/SoloBlogContainer";

function LatestBlogHome() {
  return (
    <div className="BlogContainer">
      <div className="BlogHomeHeading">
        <h1>Latest Blog</h1>
      </div>
      <div className="BlogDisplayer">
        <SoloBlogContainer />
        <SoloBlogContainer />
        <SoloBlogContainer />
      </div>
    </div>
  );
}

export default LatestBlogHome;
