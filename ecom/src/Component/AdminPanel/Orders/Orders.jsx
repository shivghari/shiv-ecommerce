import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./Orders.css";

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

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import Form from "react-bootstrap/Form";

import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Orders() {
  const [orderDataList, setorderDataList] = useState([]);
  const [OrderUser, setOrderUser] = useState([]);
  const [CopyData, setCopyData] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedUserId, setselectedUserId] = useState("");

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
                {orderDataList &&
                  orderDataList.map((item) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.paymentID}
                      </TableCell>
                      <TableCell align="left">
                        {/* <div className="nameImgHolderOrder">
                      <img
                        src={image}
                        height="50px"
                        width="50px"
                        alt="Product"
                      /> */}
                        <h6 style={{ marginTop: "16px" }}>{item.username}</h6>
                        {/* </div> */}
                      </TableCell>
                      <TableCell align="left">
                        {item.orderDate.split("T")[0]}
                      </TableCell>
                      <TableCell align="left">{"Ready"}</TableCell>
                      <TableCell align="left">{"Paid"}</TableCell>
                      <TableCell align="left">{item.orderAmount} ₹</TableCell>
                      <TableCell align="left">
                        <DropdownButton
                          title={<MoreVertIcon />}
                          className="more"
                        >
                          <Dropdown.Item
                            onClick={() => {
                              console.log(item.paymentID);
                              setselectedUserId(item.userID);
                              handleOpen();
                            }}
                          >
                            View
                          </Dropdown.Item>
                        </DropdownButton>
                      </TableCell>
                    </TableRow>
                  ))}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <OrderDetails userID={selectedUserId} />
                  </Box>
                </Modal>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Orders;
