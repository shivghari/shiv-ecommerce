import React, { useEffect, useState } from "react";
import "./SoloBlogContainer.css";

import Blog1 from "./Blog1.png";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function SoloBlogContainer({ blogID }) {
  const [individualBlog, setindividualBlog] = useState([]);

  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:3001/handleBlog/getThisBlog", {
        blogID: blogID,
      })
      .then((response) => {
        setindividualBlog(response.data.response);
        console.log(response.data.response);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  return (
    <div className="BlogPostHolder">
      <div className="blogImage">
        <img
          src={`http://localhost:3001/static/${individualBlog.blogImage}`}
          alt="BlogThumbnail"
          className="curveImg"
        />
      </div>
      <div className="BlogdetailsContainer">
        <div className="writerDateHolder">
          <p className="blogWriter">
            <BorderColorIcon
              sx={{ fontSize: "20px", marginRight: "10px", color: "#FB2E86;" }}
            />
            {individualBlog?.authorID?.username}
          </p>
          <p className="blogdate">
            <CalendarMonthIcon
              sx={{ fontSize: "20px", marginRight: "10px", color: " #FFA454" }}
            />
            {moment(individualBlog?.createdAt).format("LL")}
          </p>
        </div>
        <div className="blogNameHolder">
          <p className="blogName">
            {individualBlog?.title?.length > 30
              ? `${individualBlog?.title.slice(0, 30)}...`
              : individualBlog?.title}
          </p>
          <p className="BlogDesc">
            {individualBlog?.content?.length > 80
              ? `${individualBlog?.content.slice(0, 100)}...`
              : individualBlog?.content}
          </p>
          <p
            className="BlogreadMore"
            onClick={() => {
              Navigate(`/thisBlog/${individualBlog?._id}`);
            }}
          >
            Read More
          </p>
        </div>
      </div>
    </div>
  );
}

export default SoloBlogContainer;
