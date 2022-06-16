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

import Form from "react-bootstrap/Form";

import axios from "axios";
// import { useGetProductsQuery } from "../../../Feature/FetchProducts";
import { useState, useEffect } from "react";
// import { getProduct } from "../../../Feature/productManage";
// import { useDispatch, useSelector } from "react-redux";

function AdminProductList() {
  // const dispatch = useDispatch();

  // const { data, isFetching } = useGetProductsQuery();

  const [filterProducts, setfilterProducts] = useState([]);
  const [deleteFlag, setdeleteFlag] = useState(false);
  const [copyData, setcopyData] = useState([]);

  // const Newdata = useSelector((state) => state.products);
  // console.log("new Data", Newdata.products.data);

  // console.log("Flag", deleteFlag);

  // useEffect(() => {
  //   dispatch(getProduct());
  //   setTimeout(() => {
  //     setfilterProducts(Newdata.products.data);
  //   }, 0);
  // }, [data, deleteFlag]);

  // useEffect(() => {
  //   dispatch(getProduct());
  //   setTimeout(() => {
  //     setfilterProducts(Newdata.products.data);
  //   }, 0);
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/fetchProduct",{
        headers : {
          "Authorization" : JSON.parse(localStorage.getItem("token")).token
        }
      })
      .then((response) => {
        setfilterProducts(response.data);
        setcopyData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteFlag]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/fetchProduct",{
        headers : {
          "Authorization" : JSON.parse(localStorage.getItem("token")).token
        }
      })
      .then((response) => {
        setfilterProducts(response.data);
        setcopyData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const refresh = () => {
    window.location.reload(false);
  };

  const deleteProduct = (productId) => {
    console.log(productId);
    axios
      .post("http://localhost:3001/deleteProduct", { productId }, {
        headers : {
          "Authorization" : JSON.parse(localStorage.getItem("token")).token
        }
      })
      .then((response) => {
        console.log("Delete Success", response);
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  };

  const categoryFilter = (category) => {
    const newArr = copyData.filter((item) => {
      if (item.category === category) {
        return item;
      }
    });
    console.log(newArr);
    if (newArr.length !== 0) {
      setfilterProducts(newArr);
    } else setfilterProducts(copyData);
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
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                categoryFilter(e.target.value);
              }}
            >
              <option value={"all"}>All</option>
              {copyData.length &&
                copyData.map((item) => (
                  <option value={item.category}>{`${item.category}`}</option>
                ))}
            </Form.Select>
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
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterProducts.length &&
                  filterProducts.map((item, index) => (
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
                            onClick={() => {
                              deleteProduct(item._id);
                              setdeleteFlag(!deleteFlag);
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
