import React from "react";
import "./ReletedBlogCoponent.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReletedBlogCoponent() {
  const [blogList, setblogList] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/handleBlog/getAllBlog")
      .then((response) => {
        setblogList(response.data.response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  const Params = useParams();
  return (
    <div className="mainrelatedBlogContainer">
      <p className="moreLikethis">More like this</p>
      {blogList &&
        blogList?.map((blog) => (
          <div className="reletedBlogList">
            <div className="reletedBlogDetails">
              <p
                className="reletedBlogTitle"
                onClick={() => {
                  Navigate(`/thisBlog/${blog._id}`);
                }}
              >
                {
                  /* {blog.title.length > 20
                    ? `${blog.title.slice(0, 20)}..`
                    : blog.title} */ blog.title
                }
              </p>
              <p className="reletedBlogContent">{`${blog.content.slice(
                0,
                70
              )}...`}</p>
            </div>
            {blog.blogImage ? (
              <img
                src={`http://localhost:3001/static/${blog.blogImage}`}
                height="90px"
                width="90px"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  Navigate(`/thisBlog/${blog._id}`);
                }}
              />
            ) : null}
          </div>
        ))}
    </div>
  );
}

export default ReletedBlogCoponent;
