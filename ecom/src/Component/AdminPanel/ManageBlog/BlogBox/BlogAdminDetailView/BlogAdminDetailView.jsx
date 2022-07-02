import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./BlogAdminDetailView.css";

function BlogAdminDetailView({ blogID }) {
  const [blogSoloData, setblogSoloData] = useState({});

  const approveFunction = () => {
    axios
      .post(
        "http://localhost:3001/handleBlog/approveBlog",
        {
          blogID: blogID,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err, "err in Approving");
      });
  };

  const deleteBlog = () => {
    axios
      .post(
        "http://localhost:3001/handleBlog/deleteBlog",
        {
          blogID: blogID,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err, "err in Approving");
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:3001/handleBlog/getBlogById", {
        blogID: blogID,
      })
      .then((response) => {
        console.log(response.data.response, "get blog");
        setblogSoloData(response.data.response);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);
  return (
    <div>
      <div>
        <p>Author : {blogSoloData?.authorID?.username}</p>
        <p>Date Of Publish : {blogSoloData?.createdAt?.split("T")[0]}</p>
      </div>
      <h1>{blogSoloData.title}</h1>
      {blogSoloData.blogImage && (
        <img
          src={`http://localhost:3001/static/${blogSoloData?.blogImage}`}
          width="100%"
          height="200px"
          style={{ objectFit: "cover" }}
        />
      )}
      {blogSoloData?.content?.split("\n").map((item) => (
        <p>{item}</p>
      ))}
      <Button
        className="DeleteBtn"
        onClick={() => {
          deleteBlog();
        }}
      >
        Delete
      </Button>
      {!blogSoloData?.approveByAdmin ? (
        <Button
          className="ApproveBtn"
          onClick={() => {
            approveFunction();
          }}
        >
          Approve
        </Button>
      ) : null}
    </div>
  );
}

export default BlogAdminDetailView;
