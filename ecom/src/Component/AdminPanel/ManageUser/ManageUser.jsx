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

import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";


import { DropdownButton, Dropdown } from "react-bootstrap";
import { Avatar } from "@mui/material";

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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

//here ends


function ManageUser() {
  const [allUser, setallUser] = useState([]);

  const refresh = () => {
    window.location.reload(false);
  };

  
  //Table Pagination Logic 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUser.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //end table Pagination

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

          {(rowsPerPage > 0
                  ? allUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : allUser
                ).map((user) => (
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

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
          </TableBody>
          <TableFooter>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={allUser.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ManageUser;
