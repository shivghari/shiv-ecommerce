import React from "react";
import "./BlogBox.css";

function BlogBox({ title, content }) {
  return (
    <div className="BlogSmallHolder">
      <div className="AuthorAndDate">
        <p>Shiv Ghariwala</p>
        <p>30/06/2022</p>
      </div>
      <div className="BlogDataContainer">
        <h5>{title}</h5>
        <p>{content?.length > 88 ? `${content.slice(0, 130)}...` : content}</p>
      </div>
    </div>
  );
}

export default BlogBox;
