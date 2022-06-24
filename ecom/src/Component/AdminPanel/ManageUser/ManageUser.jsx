import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ManageUser.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { DropdownButton, Dropdown } from "react-bootstrap";
import { Avatar } from "@mui/material";

function ManageUser() {
  const [allUser, setallUser] = useState([]);

  const refresh = () => {
    window.location.reload(false);
  };

  var colors = [
    "#FBC02D",
    "#4CAF50",
    "rgb(4, 209, 130)",
    "rgb(250, 140, 22)",
    "rgb(255, 107, 114)",
    "rgb(24, 144, 255)",
  ];

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("token")).token);
    axios
      .get("http://localhost:3001/manageUser/getAlluser", {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")).token,
        },
      })
      .then((response) => {
        setallUser(response.data.response);
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleMakeAdmin = (userID) => {
    axios
      .post(
        "http://localhost:3001/manageUser/makeAdmin",
        {
          userID: userID,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        refresh();
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  };

  const handleMakeUser = (userID) => {
    axios
      .post(
        "http://localhost:3001/manageUser/makeUser",
        {
          userID: userID,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        refresh();
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  };

  return (
    <div className="userListHolder">
      <div className="headingHolder">
        <h1>Manage Users</h1>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">email</TableCell>
              <TableCell align="left">role</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUser.length &&
              allUser.map((user, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user._id}
                  </TableCell>
                  <TableCell align="center">
                    <div style={{ display: "flex" }}>
                      <Avatar
                        sx={{
                          backgroundColor:
                            colors[Math.floor(Math.random() * colors.length)],
                        }}
                      >
                        {user.username[0].toUpperCase()}
                      </Avatar>
                      <h6 style={{ marginTop: "10px", marginLeft: "10px" }}>
                        {user.username}
                      </h6>
                    </div>
                  </TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.role}</TableCell>
                  <TableCell align="left">
                    <DropdownButton
                      title={<MoreVertIcon />}
                      sx={{ width: "100px" }}
                    >
                      {user.role === "user" ? (
                        <Dropdown.Item
                          onClick={(e) => {
                            handleMakeAdmin(user._id);
                          }}
                        >
                          Make Admin
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item
                          onClick={() => {
                            handleMakeUser(user._id);
                          }}
                        >
                          Make User
                        </Dropdown.Item>
                      )}
                    </DropdownButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ManageUser;
