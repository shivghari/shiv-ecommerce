import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./MostLikedBlog.css";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

function MostLikedBlog() {
  const [allBlog, setallBlog] = useState();
  const Navigate = useNavigate();
  useEffect(() => {
    axios
      .post("http://localhost:3001/handleBlog/getAllDisplayBlog")
      .then((response) => {
        var mostLiked = response?.data?.response?.sort((a, b) => {
          return b?.likes.length - a?.likes.length;
        });
        setallBlog(mostLiked.slice(0, 5));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <div className="conponentContainer">
      <h2 className="componentHeading">Most Liked Blogs.</h2>
      {allBlog?.map((blog) => (
        <div
          className="mostLikedBlogContainer"
          onClick={() => {
            Navigate(`/thisBlog/${blog._id}`);
          }}
        >
          <div className="mostLikeBlogDataContainer">
            <p className="mostLikedBlogTitle">
              {blog.title.length > 20
                ? `${blog.title.slice(0, 20)}...`
                : blog.title}
            </p>
            <p className="mostLikedBlogContent">{`${blog.content.slice(
              0,
              33
            )}...`}</p>
            <div className="likeAndCountHolder">
              <FavoriteIcon fontSize="14px" />
              <p>{blog.likes.length}</p>
            </div>
          </div>
          {blog.blogImage && (
            <div>
              <img
                src={`http://localhost:3001/static/${blog.blogImage}`}
                height="50px"
                width="70px"
                style={{
                  marginTop: "5px",
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MostLikedBlog;
