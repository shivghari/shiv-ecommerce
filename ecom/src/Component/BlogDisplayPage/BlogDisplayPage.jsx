import axios from "axios";
import React, { useEffect, useState } from "react";
import "./BlogDisplayPage.css";
import ModeIcon from "@mui/icons-material/Mode";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function BlogDisplayPage() {
  const [blogdata, setblogdata] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    axios
      .post("http://localhost:3001/handleBlog/getAllDisplayBlog")
      .then((response) => {
        setblogdata(response.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="blogPage">
      <div className="blogPart">
        <div className="SoloBlogHolder">
          {blogdata.map((item) => (
            <div key={item._id} className="singleBlog">
              {item.blogImage && (
                <img
                  src={`http://localhost:3001/static/${item.blogImage}`}
                  width="100%"
                  height="400px"
                  style={{
                    marginTop: "30px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              )}
              <div className="AuthorandDate">
                <div className="authorName">
                  <ModeIcon
                    sx={{
                      color: "#FB2E86",
                      marginRight: "5px",
                      marginTop: "5px",
                    }}
                  />
                  <p>{item.authorID.username}</p>
                </div>
                <div className="blogDate">
                  <CalendarMonthIcon
                    sx={{
                      color: "#FFA454",
                      marginRight: "5px",
                      marginTop: "5px",
                    }}
                  />
                  <p>{moment(item.createdAt).format("MMMM d, YYYY")}</p>
                </div>
              </div>
              <h3
                className="blogHeading"
                onClick={() => {
                  Navigate(`/thisBlog/${item._id}`);
                }}
              >
                {item.title}
              </h3>
              <p className="smallBlogContent">
                {item.content?.length > 100
                  ? `${item.content.slice(0, 150)}...`
                  : item.content}
              </p>
              <div className="readMoreBlock">
                <p
                  className="readMore"
                  onClick={() => {
                    Navigate(`/thisBlog/${item._id}`);
                  }}
                >
                  Read More
                </p>
                <span className="pinkDot"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="filterPart"></div>
    </div>
  );
}

export default BlogDisplayPage;
