import "./LatestBlogHome.css";
import React from "react";
import SoloBlogContainer from "./SoloBlogContainer/SoloBlogContainer";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function LatestBlogHome() {
  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/handleBlog/getAllDisplayBlog")
      .then((response) => {
        setblogs(response?.data?.response?.reverse()?.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="BlogContainer">
      <div className="BlogHomeHeading">
        <h1>Latest Blog</h1>
      </div>
      <div className="BlogDisplayer">
        <Row>
          {blogs &&
            blogs.map((blog) => (
              <Col xs={12} md={6} lg={4}>
                <SoloBlogContainer blogID={blog._id} />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default LatestBlogHome;
