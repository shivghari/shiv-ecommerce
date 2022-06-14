import React from "react";
import { Button } from "react-bootstrap";
import "./Orders.css";

import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

import { DropdownButton, Dropdown } from "react-bootstrap";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Form from "react-bootstrap/Form";

import axios from "axios";

import image from "./NA2.png";

function Orders() {
  return (
    <div>
      <div className="listHolder">
        <div className="search-select-holder">
          <div className="search-bar-holder">
            <input placeholder="Search.." />
            <Button variant="contained" sx={{ marginTop: "-5px" }}>
              <SearchIcon />
            </Button>
          </div>
          <div className="select-conatiner">
            <Form.Select aria-label="Default select example">
              <option value={"all"}>All</option>
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
                  <TableCell>ID</TableCell>
                  <TableCell align="left">product</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Order Status</TableCell>
                  <TableCell align="left">Payment Status</TableCell>
                  <TableCell align="left">Total</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {"#1234"}
                  </TableCell>
                  <TableCell align="left">
                    <div className="nameImgHolderOrder">
                      <img
                        src={image}
                        height="50px"
                        width="50px"
                        alt="Product"
                      />
                      <h6 style={{ marginTop: "16px" }}>{"Test User"}</h6>
                    </div>
                  </TableCell>
                  <TableCell align="left">{"13-06-1998"}</TableCell>
                  <TableCell align="left">{"Ready"}</TableCell>
                  <TableCell align="left">{"Paid"}</TableCell>
                  <TableCell align="left">{"$344.6"}</TableCell>
                  <TableCell align="left">
                    <DropdownButton title={<MoreVertIcon />} className="more">
                      <Dropdown.Item>View</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Preview</Dropdown.Item>
                    </DropdownButton>
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {"#1234"}
                  </TableCell>
                  <TableCell align="left">
                    <div className="nameImgHolderOrder">
                      <img
                        src={image}
                        height="50px"
                        width="50px"
                        alt="Product"
                      />
                      <h6 style={{ marginTop: "16px" }}>{"Test User"}</h6>
                    </div>
                  </TableCell>
                  <TableCell align="left">{"13-06-1998"}</TableCell>
                  <TableCell align="left">{"Ready"}</TableCell>
                  <TableCell align="left">{"Pending"}</TableCell>
                  <TableCell align="left">{"$344.6"}</TableCell>
                  <TableCell align="left">
                    <DropdownButton title={<MoreVertIcon />} className="more">
                      <Dropdown.Item>View</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Preview</Dropdown.Item>
                    </DropdownButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Orders;
