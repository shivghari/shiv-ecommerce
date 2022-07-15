import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./MostLikedBlog.css";
import { useNavigate } from "react-router-dom";

function MostLikedBlog() {
  const [allBlog, setallBlog] = useState();
  const Navigate = useNavigate();
  useEffect(() => {
    axios
      .post("http://localhost:3001/handleBlog/getAllDisplayBlog")
      .then((response) => {
        setallBlog(response.data.response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <div>
      {allBlog?.map((blog) => (
        <div>
          <div>
            <p>{blog.title}</p>
            <p>{blog.content}</p>
          </div>
          {blog.blogImage && (
            <div>
              <img
                src={`http://localhost:3001/static/${blog.blogImage}`}
                height="100px"
                width="100px"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MostLikedBlog;
