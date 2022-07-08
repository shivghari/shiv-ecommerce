import React, { useState, useEffect } from "react";
import "./DisplayBlogDetailView.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import ReletedBlogCoponent from "../ReletedBlogCoponent/ReletedBlogCoponent";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

const style = {
  fontSize: "30px",
  color: "rgb(232, 232, 232)",
  marginLeft: "20px",
};

function DisplayBlogDetailView() {
  const Params = useParams();
  const [individualBlog, setindividualBlog] = useState({});
  useEffect(() => {
    axios
      .post("http://localhost:3001/handleBlog/getThisBlog", {
        blogID: Params.blogID,
      })
      .then((response) => {
        setindividualBlog(response.data.response);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, [Params.blogID]);
  return (
    <div className="totalblogView">
      <div className="mainBlogViewContainer">
        <div className="blogDetails">
          <Avatar sx={{ bgcolor: "orange", marginTop: "10px" }}>
            {individualBlog?.authorID?.username?.[0].toUpperCase()}
          </Avatar>
          <div>
            <p className="blogAuthorName">
              {individualBlog?.authorID?.username}
            </p>
            <p className="PostedDate">
              {moment(individualBlog.createdAt).format("MMMM d, YYYY")}
            </p>
          </div>
        </div>
        <p className="mainblogHeading">{individualBlog.title}</p>
        {individualBlog.blogImage && (
          <img
            src={`http://localhost:3001/static/${individualBlog.blogImage}`}
            className="mainBlogImage"
          />
        )}
        <div className="mainblogContentHolder">
          {individualBlog?.content?.split("\n").map((item) => (
            <p className="blogContentText">{item}</p>
          ))}
        </div>
        <div className="likeAndCommentHolder">
          <ThumbUpOutlinedIcon
            sx={{
              fontSize: "25px",
              color: "rgb(128, 126, 126)",
              marginRight: "20px",
            }}
          />
          <ModeCommentOutlinedIcon
            sx={{
              fontSize: "25px",
              color: "rgb(128, 126, 126)",
              marginRight: "20px",
            }}
          />
        </div>
      </div>
      <div className="reletedBLogComponent">
        <ReletedBlogCoponent />
      </div>
    </div>
  );
}

export default DisplayBlogDetailView;
