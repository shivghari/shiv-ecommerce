import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./Orders.css";
import { useTheme } from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

import { DropdownButton, Dropdown } from "react-bootstrap";
import OrderDetails from "./OrderDetails/OrderDetails";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import Form from "react-bootstrap/Form";

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



function Orders() {
  const [orderDataList, setorderDataList] = useState([]);
  const [OrderUser, setOrderUser] = useState([]);
  const [CopyData, setCopyData] = useState([]);

  //orderDetails Page Props State
  const [custName, setcustName] = useState("");
  const [selectedorderDate, setselectedorderDate] = useState("");
  const [totalOrderAmount, settotalOrderAmount] = useState("");
  const [selectedUserID, setselectedUserID] = useState("");

  //model controoller
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedPatmentId, setselectedPatmentId] = useState("");

  //Table Pagination Logic 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderDataList.length) : 0;

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
      .post(
        "http://localhost:3001/findUser/allUsersDetails",
        {},
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        console.log(response.data.reponse);
        var orderDataArr = [];
        var userSelect = [];
        response.data.reponse.map((item) => {
          item.orderID.map((i) => {
            var newObj = {};
            newObj["userID"] = item._id;
            newObj["username"] = item.username;
            newObj["email"] = item.email;
            newObj["orderDate"] = i.updatedAt;
            newObj["paymentID"] = i.paymentid;
            newObj["orderAmount"] = i.totalamount;

            orderDataArr.push(newObj);
            if (!userSelect.includes(item.username)) {
              userSelect.push(item.username);
            }
          });
        });
        console.log(orderDataArr);
        setorderDataList(orderDataArr);
        setOrderUser(userSelect);
        setCopyData(orderDataArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterList = (username) => {
    const newArr = CopyData.filter((item) => {
      if (item.username === username) {
        return item;
      }
    });
    if (newArr.length !== 0) {
      setorderDataList(newArr);
    } else setorderDataList(CopyData);
  };

  const orderSearch = (paymentID) => {
    const newArr = CopyData.filter((item) => {
      if (item.paymentID.toLowerCase().includes(paymentID.toLowerCase())) {
        return item;
      }
    });
    if (newArr.length !== 0) {
      setorderDataList(newArr);
    } else setorderDataList(CopyData);
  };

  return (
    <div>
      <div className="listHolder">
        <div>
          <h1>Orderd Completed</h1>
        </div>
        <div className="search-select-holder">
          <div className="search-bar-holder">
            <input
              placeholder="Search.."
              onChange={(e) => {
                orderSearch(e.target.value);
              }}
            />
            <Button variant="contained" sx={{ marginTop: "-5px" }}>
              <SearchIcon />
            </Button>
          </div>
          <div className="select-conatiner">
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                filterList(e.target.value);
              }}
            >
              <option value={"all"}>All</option>
              {OrderUser &&
                OrderUser.map((item) => <option value={item}>{item}</option>)}
            </Form.Select>
          </div>
          <IconButton sx={{ marginLeft: "10px" }}>
            <RefreshIcon />
          </IconButton>
        </div>
        <div className="table-holder">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell align="left">Customer Name</TableCell>
                  <TableCell align="left">Order Date</TableCell>
                  <TableCell align="left">Order Status</TableCell>
                  <TableCell align="left">Payment Status</TableCell>
                  <TableCell align="left">Total Amount</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                    {(rowsPerPage > 0
                  ? orderDataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : orderDataList
                ).map((item) => (
                  <TableRow>
                    <TableCell component="th" scope="row" align="left">
                      {item.paymentID}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left" >
                      {item.username}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {item.orderDate.split("T")[0]}
                    </TableCell>
                    <TableCell align="left">
                      {"Ready"}
                    </TableCell>
                    <TableCell align="left">
                      {"Paid"}
                    </TableCell>
                    <TableCell align="left">
                    {item.orderAmount}
                    </TableCell>
                    <TableCell align="left">
                    <DropdownButton
                                title={<MoreVertIcon />}
                                className="more"
                              >
                                <Dropdown.Item
                                  onClick={() => {
                                    console.log(item.paymentID);
                                    setselectedPatmentId(item.paymentID);
                                    settotalOrderAmount(item.orderAmount);
                                    setselectedorderDate(
                                      item.orderDate.split("T")[0]
                                    );
                                    setcustName(item.username);
                                    setselectedUserID(item.userID);
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
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={orderDataList.length}
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
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <OrderDetails
            paymentID={selectedPatmentId}
            totalOrderAmount={totalOrderAmount}
            selectedorderDate={selectedorderDate}
            custName={custName}
            selectedUserID={selectedUserID}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default Orders;
