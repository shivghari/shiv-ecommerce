import React from "react";
import "./WriteBlog.css";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Tag Selection input field inports
import { Select } from "antd";
import "antd/dist/antd.css";

function WriteBlog() {
  // text area auto resizing Logic
  var minRows = 10;
  const [blogTitle, setblogTitle] = useState("");
  const [rows, setRows] = React.useState(minRows);
  const [value, setValue] = React.useState(``);
  const [image, setImage] = useState();

  const [blogtag, setblogtag] = useState("");

  const Navigate = useNavigate();

  //secetion field
  const { Option } = Select;
  const children = [];

  const defaultTagOption = ["Technology", "React", "NodeJS", "Environment"];

  defaultTagOption.map((tag) => {
    children.push(<Option key={tag}>{tag}</Option>);
  });

  const handleChange = (value) => {
    setblogtag(`${value}`);
  };

  const submitBlog = (e) => {
    e.preventDefault();
    var blogdata = new FormData();
    blogdata.append("title", blogTitle);
    blogdata.append("content", value);
    blogdata.append(
      "authorID",
      localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token")).userID
        : ""
    );
    blogdata.append("blogImage", image);
    blogdata.append("blogtag", blogtag);
    axios
      .post("http://localhost:3001/handleBlog/addBlog", blogdata)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const rowlen = value.split("\n");

    if (rowlen.length > minRows) {
      setRows(rowlen.length);
    }
  }, [value]);

  return (
    <div className="write">
      <form className="writeForm">
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => {
              setblogTitle(e.target.value);
            }}
          />
        </div>
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="uploadedProduct"
            width="100%"
            height="300px"
            style={{ marginTop: "30px", objectFit: "cover" }}
          />
        ) : null}
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <AddIcon
              sx={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                border: "1px solid",
                fontSize: "20px",
                color: "gray",
                marginTop: "13px",
                marginLeft: "-30px",
              }}
            />
          </label>
          <input
            type="file"
            id="fileInput"
            className="fileInputField"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            style={{ visibility: "hidden" }}
          />
          <textarea
            rows={rows}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            id="blogContent"
          ></textarea>
        </div>
        <button
          className="writeSubmit"
          onClick={(e) => {
            submitBlog(e);
            Navigate("/showblog");
          }}
        >
          Publish
        </button>
        <Select
          className="selectBar"
          mode="tags"
          placeholder="Select Blog Category tags"
          onChange={handleChange}
        >
          {children}
        </Select>
      </form>
    </div>
  );
}

export default WriteBlog;
