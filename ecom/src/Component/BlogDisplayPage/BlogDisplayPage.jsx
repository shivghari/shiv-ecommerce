import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./BlogDisplayPage.css";
import ModeIcon from "@mui/icons-material/Mode";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import MostLikedBlog from "./MostLikedBlog/MostLikedBlog";

function BlogDisplayPage() {
  const [blogdata, setblogdata] = useState([]);
  const [copyblogdata, setcopyblogdata] = useState([]);
  const searchBLogString = useRef("");

  const searchByTag = (tag) => {
    if (tag === "all") {
      setblogdata(copyblogdata);
    }
    var newSearchBlog = blogdata?.filter((blog) => {
      if (blog.blogtag.toLowerCase().includes(tag.toLowerCase())) {
        return blog;
      }
    });

    if (newSearchBlog.length > 0) {
      setblogdata(newSearchBlog);
    } else {
      setblogdata(copyblogdata);
    }
  };

  const handleBlogSearch = () => {
    console.log(searchBLogString.current.value);
    if (searchBLogString.current.value) {
      var searchBlog = blogdata.filter((blog) => {
        if (
          blog.title
            .toLowerCase()
            .includes(searchBLogString.current.value.toLowerCase())
        ) {
          return blog;
        }
      });
      if (searchBlog.length > 0) {
        setblogdata(searchBlog.reverse());
      } else {
        setblogdata(copyblogdata);
      }
    } else {
      setblogdata(copyblogdata);
    }
  };

  const Navigate = useNavigate();
  useEffect(() => {
    axios
      .post("http://localhost:3001/handleBlog/getAllDisplayBlog")
      .then((response) => {
        setblogdata(response.data.response.reverse());
        setcopyblogdata(response.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="blogPage">
      <div className="blogPart">
        <div className="SoloBlogHolder">
          {blogdata.reverse().map((item) => (
            <div key={item._id} className="singleBlog">
              {item.blogImage && (
                <img
                  src={`http://localhost:3001/static/${item.blogImage}`}
                  width="100%"
                  height="400px"
                  alt="blogImg"
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
              <div className="blogtagDiv">
                {item?.blogtag
                  ? item?.blogtag?.split(",")?.map((tag) => <p>{tag}</p>)
                  : null}
              </div>
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
      <div className="filterPart">
        <div className="searchBarIconContainer">
          <input
            placeholder="Search Blog"
            className="inpuSearchHolder"
            onChange={() => {
              handleBlogSearch();
            }}
            ref={searchBLogString}
          ></input>
        </div>
        <div className="CategoryButtonContainer">
          <h3 className="TagHeading">Top Tags</h3>
          <button
            className="tagButton"
            onClick={() => {
              searchByTag("All");
            }}
          >
            All
          </button>
          <button
            className="tagButton"
            onClick={() => {
              searchByTag("Technology");
            }}
          >
            Technology
          </button>
          <button
            className="tagButton"
            onClick={() => {
              searchByTag("Environment");
            }}
          >
            Environment
          </button>
          <button
            className="tagButton"
            onClick={() => {
              searchByTag("Nature");
            }}
          >
            Nature
          </button>
          <button
            className="tagButton"
            onClick={() => {
              searchByTag("e-commerce");
            }}
          >
            E-commerce WebApp
          </button>
          <button
            className="tagButton"
            onClick={() => {
              searchByTag("Programing");
            }}
          >
            Programing
          </button>
          <button
            className="tagButton"
            onClick={() => {
              searchByTag("MongoDB");
            }}
          >
            MongoDB
          </button>
        </div>
        <div className="MostLikedBlogComponentContainer">
          <MostLikedBlog />
        </div>
      </div>
    </div>
  );
}

export default BlogDisplayPage;
