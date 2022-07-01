import React, { useState } from "react";
import "./BlogBox.css";
import moment from "moment";
import { Button } from "react-bootstrap";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import BlogAdminDetailView from "./BlogAdminDetailView/BlogAdminDetailView";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  height: "fitContent",
};

function BlogBox({ title, content, time, authorName, blogID, setflag }) {
  //model controoller
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //setCurrent Blog ID
  const [selectedBlog, setselectedBlog] = useState("");

  return (
    <div className="BlogSmallHolder">
      <div className="AuthorAndDate">
        <p>{authorName}</p>
        <p>{moment(time).fromNow()}</p>
      </div>
      <div className="BlogDataContainer">
        <h5>{title}</h5>
        <p>{content?.length > 88 ? `${content.slice(0, 130)}...` : content}</p>
      </div>
      <Button
        onClick={() => {
          handleOpen();
        }}
      >
        View
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex" }}>
            <BlogAdminDetailView blogID={blogID} />
            <p
              style={{
                fontSize: "30px",
                marginTop: "-20px",
                cursor: "pointer",
                color: "gray",
              }}
              onClick={() => {
                handleClose();
              }}
            >
              x
            </p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default BlogBox;
