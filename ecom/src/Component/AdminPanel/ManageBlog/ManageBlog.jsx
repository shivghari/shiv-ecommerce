import React, { useState } from "react";
import { useEffect } from "react";
import "./ManageBlog.css";
import axios from "axios";
import BlogBox from "./BlogBox/BlogBox";
import { Row, Col } from "react-bootstrap";

function ManageBlog() {
  const [blogs, setblogs] = useState(``);
  useEffect(() => {
    axios
      .get("http://localhost:3001/handleBlog/getAllBlog")
      .then((response) => {
        console.log(response.data.response, "inBlog");
        setblogs(response.data.response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className="blogListHolder">
      <Row>
        {blogs &&
          blogs.map((item) => (
            <Col>
              <BlogBox title={item.title} content={item.content} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default ManageBlog;
