import React, { useEffect } from "react";
import "./AdminProductList.css";
import Button from "@mui/material/Button";
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

import axios from "axios";
import { useGetProductsQuery } from "../../../Feature/FetchProducts";

function AdminProductList() {
  const refresh = () => {
    window.location.reload(false);
  };

  const { data } = useGetProductsQuery();

  const deleteProduct = (productId) => {
    console.log(productId);
    axios
      .post("http://localhost:3001/deleteProduct", { productId })
      .then((response) => {
        console.log("Delete Success");
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  };

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
            <DropdownButton
              id="dropdown-basic-button"
              title="Select Category"
              className="select-btn"
            >
              <Dropdown.Item href="#/action-1">All</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Cloths</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Bag</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Watch</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Cosmatics</Dropdown.Item>
            </DropdownButton>
          </div>
          <IconButton sx={{ marginLeft: "10px" }}>
            <RefreshIcon onClick={refresh} />
          </IconButton>
        </div>
        <div className="table-holder">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Item</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Stock</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((item, index) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell align="left">
                        <div className="nameImgHolder">
                          <img
                            src={`http://localhost:3001/static/${item.image}`}
                            height="50px"
                            width="50px"
                            alt="Product"
                          />
                          <h6 style={{ marginTop: "16px" }}>
                            {item.prouctname}
                          </h6>
                        </div>
                      </TableCell>
                      <TableCell align="left">{item.category}</TableCell>
                      <TableCell align="left">{item.price} ₹</TableCell>
                      <TableCell align="left">{item.costofitem}</TableCell>
                      <TableCell align="left">In stock</TableCell>
                      <TableCell align="left">
                        <DropdownButton
                          title={<MoreVertIcon />}
                          className="more"
                        >
                          <Dropdown.Item
                            href="#/action-1"
                            onClick={() => {
                              deleteProduct(item._id);
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            Preview
                          </Dropdown.Item>
                        </DropdownButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminProductList;
