import React, { useState, useEffect } from "react";
import "./DisplayBlogDetailView.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import ReletedBlogCoponent from "../ReletedBlogCoponent/ReletedBlogCoponent";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button } from "react-bootstrap";
import { useGetUserQuery } from "../../../Feature/FindUserSlice";

//drawer imports
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";

function DisplayBlogDetailView() {
  const Params = useParams();
  const [individualBlog, setindividualBlog] = useState({});
  const [unlike, setunlike] = useState(true);
  const [like, setlike] = useState(false);

  const [comment, setcomment] = useState("");
  const [commentData, setcommentData] = useState([]);
  const [toggle, settoggle] = useState(false);

  const { data } = useGetUserQuery(
    JSON.parse(localStorage.getItem("token")).userID
      ? JSON.parse(localStorage.getItem("token")).userID
      : ""
  );

  //drawer implimentation

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box sx={{ width: "400px" }} role="presentation">
      <List>
        <ListItem>
          <div className="userCommentContainer">
            <div className="drawerCloseButton">
              <div className="CommentUser">
                <Avatar sx={{ height: "32px", width: "32px" }}>A</Avatar>
                <p>{data?.username}</p>
              </div>
              <p onClick={toggleDrawer(anchor, false)}>X</p>
            </div>
            <textarea
              placeholder="What are your thought?"
              value={comment}
              onChange={(e) => {
                setcomment(e.target.value);
              }}
            />
            <div className="btnHolder">
              <Button
                variant="light"
                className="commentBtn cancel"
                onClick={() => {
                  setState({ right: false });
                }}
              >
                Cancel
              </Button>
              <Button
                className="commentBtn"
                onClick={() => {
                  settoggle(!toggle);
                  postComment(individualBlog._id);
                  setcomment("");
                  updatetheComment();
                }}
              >
                Post
              </Button>
            </div>
          </div>
        </ListItem>
        {commentData.map((comment) => (
          <ListItem>
            <div className="CommentDataHolder">
              <div className="postUser">
                <div className="avatarAndUsername">
                  <Avatar>{comment?.userID?.username[0].toUpperCase()}</Avatar>
                  <p>{comment?.userID?.username}</p>
                </div>
                <p>{moment(comment?.createdAt).format("MMMM d, YYYY")}</p>
              </div>
              <p className="commentContent">{comment?.comment}</p>
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  //end drawer implimentation

  const postComment = (blogID) => {
    axios
      .post("http://localhost:3001/handleBlog/addComment", {
        blogID: blogID,
        userID: localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token")).userID
          : "",
        comment: comment,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const likeBlog = (blogID) => {
    axios
      .post("http://localhost:3001/handleBlog/likeBlog", {
        blogID: blogID,
        userID: localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token")).userID
          : "",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const unlikeBlog = (blogID) => {
    axios
      .post("http://localhost:3001/handleBlog/unlikeBlog", {
        blogID: blogID,
        userID: localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token")).userID
          : "",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:3001/handleBlog/getThisBlog", {
        blogID: Params.blogID,
      })
      .then((response) => {
        setindividualBlog(response.data.response);
        if (
          response.data.response.likes.includes(
            JSON.parse(localStorage.getItem("token")).userID
          )
        ) {
          setlike(true);
          setunlike(false);
        } else {
          setlike(false);
          setunlike(true);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, [Params.blogID, like, unlike]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/handleBlog/fetchComment", {
        blogID: individualBlog._id,
      })
      .then((response) => {
        setcommentData(response.data.response.reverse());
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, [toggle, state]);

  const updatetheComment = () => {
    axios
      .post("http://localhost:3001/handleBlog/fetchComment", {
        blogID: individualBlog._id,
      })
      .then((response) => {
        setcommentData(response.data.response.reverse());
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  return (
    <div className="totalblogView">
      <div className="mainBlogViewContainer">
        <div className="blogDetails">
          <Avatar sx={{ bgcolor: "orange", marginTop: "10px" }}>
            {individualBlog?.authorID?.username?.[0].toUpperCase()}
          </Avatar>
          <div>
            <p className="blogAuthorName">
              {individualBlog?.authorID?.username}
            </p>
            <p className="PostedDate">
              {moment(individualBlog.createdAt).format("MMMM d, YYYY")}
            </p>
          </div>
        </div>
        <p className="mainblogHeading">{individualBlog.title}</p>
        {individualBlog.blogImage && (
          <img
            src={`http://localhost:3001/static/${individualBlog.blogImage}`}
            className="mainBlogImage"
            alt="blogPic"
          />
        )}
        <div className="mainblogContentHolder">
          {individualBlog?.content?.split("\n").map((item) => (
            <p className="blogContentText">{item}</p>
          ))}
        </div>
        <div className="tagContainer">
          {individualBlog?.blogtag?.split(",").map((tag) => (
            <p>{tag}</p>
          ))}
        </div>
        <div className="mainlikeAndCommentHolder">
          {unlike === true && like === false ? (
            <IconButton
              onClick={() => {
                setunlike(false);
                setlike(true);
                likeBlog(individualBlog._id);
              }}
            >
              <ThumbUpOutlinedIcon
                sx={{
                  fontSize: "25px",
                  color: "rgb(128, 126, 126)",
                  // marginRight: "20px",
                  textAlign: "center",
                }}
              />
              <span className="likecount">{individualBlog?.likes?.length}</span>
            </IconButton>
          ) : like === true && unlike === false ? (
            <IconButton
              onClick={() => {
                setunlike(true);
                setlike(false);
                unlikeBlog(individualBlog._id);
              }}
            >
              <ThumbUpIcon
                sx={{
                  fontSize: "25px",
                  color: "rgb(128, 126, 126)",
                  // marginRight: "20px",
                  textAlign: "center",
                }}
              />
              <span className="likecount">{individualBlog?.likes?.length}</span>
            </IconButton>
          ) : null}

          <IconButton onClick={toggleDrawer("right", true)}>
            <ModeCommentOutlinedIcon
              sx={{
                fontSize: "25px",
                color: "rgb(128, 126, 126)",
                // marginRight: "20px",
              }}
            />
          </IconButton>
        </div>
      </div>
      <div className="reletedBLogComponent">
        <ReletedBlogCoponent />
      </div>
      {/* Deawer Code */}
      <div>
        <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
      {/* Drawer Code Finished */}
    </div>
  );
}

export default DisplayBlogDetailView;
