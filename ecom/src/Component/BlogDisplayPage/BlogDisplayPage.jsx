import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./BlogDisplayPage.css";
import ModeIcon from "@mui/icons-material/Mode";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import MostLikedBlog from "./MostLikedBlog/MostLikedBlog";

//pagination Imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { IconButton } from "@mui/material";

//Pagination Code for BLog Page
//table pagination Actions manage Function
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function BlogDisplayPage() {
  const [blogdata, setblogdata] = useState([]);
  const [copyblogdata, setcopyblogdata] = useState([]);
  const searchBLogString = useRef("");

  //Table Pagination Logic
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - blogdata.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //end table Pagination

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
          {(rowsPerPage > 0
            ? blogdata
                .reverse()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : blogdata.reverse()
          ).map((item, index) => (
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
          <div
            style={{ width: "fit-content", margin: "auto", fontSize: "16px" }}
          >
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={blogdata.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </div>
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
