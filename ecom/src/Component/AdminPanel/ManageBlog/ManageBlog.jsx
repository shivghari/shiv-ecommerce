import React, { useState } from "react";
import { useEffect } from "react";
import "./ManageBlog.css";
import axios from "axios";
import BlogBox from "./BlogBox/BlogBox";
import { Row, Col } from "react-bootstrap";

function ManageBlog() {
  const [blogs, setblogs] = useState(``);
  const [flag, setflag] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/handleBlog/getAllBlog")
      .then((response) => {
        setblogs(response.data.response);
      })
      .catch((err) => {
        console.log("errInBlog", err);
      });
  }, [flag]);

  return (
    <div className="blogListHolder">
      <Row>
        {blogs &&
          blogs.map((item) => (
            <Col key={item._id}>
              <BlogBox
                title={item.title}
                content={item.content}
                time={item.createdAt}
                authorName={item.authorID.username}
                blogID={item._id}
                setflag={setflag}
                isVarified={item.approveByAdmin}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default ManageBlog;
