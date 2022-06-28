import React, { useEffect, useState } from "react";
import "./UserMailManagePage.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Dropdown, DropdownButton } from "react-bootstrap";

import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import { IconButton } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import moment from "moment";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import MailDetailView from "./MailDetailView/MailDetailView";

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

function UserMailManagePage() {
  const [mailData, setmailData] = useState([]);
  const [selectedConversationID, setselectedConversationID] = useState("");

  //model controoller
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Table Pagination Logic 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - mailData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //end table Pagination

  useEffect(() => {
    axios
      .get("http://localhost:3001/contactus/getAllmail", {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")).token,
        },
      })
      .then((response) => {
        setmailData(response.data.response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <div className="mailContactHolder">
      <div className="listHolder">
      <div>
        <h2>Mails</h2>
      </div>
      <div className="table-holder">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Customer Name</TableCell>
                <TableCell align="left">Mail</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              
            {(rowsPerPage > 0
                  ? mailData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : mailData
                ).map((item) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={item._id}
                  >
                    <TableCell align="left" sx={{ width: "200px" }}>
                      <h6>{item.username}</h6>
                    </TableCell>
                    <TableCell align="left">
                      <div>
                        <h6>{item.subject}</h6>
                        <p>
                          {item.message.length > 88
                            ? `${item.message.slice(0, 130)}...`
                            : item.message}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      {moment(item.createdAt).fromNow()}
                    </TableCell>
                    <TableCell align="left">
                      <DropdownButton title={<MoreVertIcon />} className="more">
                        <Dropdown.Item
                          onClick={() => {
                            setselectedConversationID(item._id);
                            handleOpen();
                          }}
                        >
                          View
                        </Dropdown.Item>
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
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={mailData.length}
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <MailDetailView selectedConversationID={selectedConversationID} />
            </Box>
          </Modal>
        </TableContainer>
      </div>
      </div>
    </div>
  );
}

export default UserMailManagePage;
