import "./AdminProductList.css";
import ProductDetailPage from "./ProductDetailPage/ProductDetailPage";

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

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import Form from "react-bootstrap/Form";

import axios from "axios";
// import { useGetProductsQuery } from "../../../Feature/FetchProducts";
import { useState, useEffect } from "react";
// import { getProduct } from "../../../Feature/productManage";
// import { useDispatch, useSelector } from "react-redux";

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

function AdminProductList() {
  // const dispatch = useDispatch();

  // const { data, isFetching } = useGetProductsQuery();

  const [filterProducts, setfilterProducts] = useState([]);
  const [deleteFlag, setdeleteFlag] = useState(false);
  const [copyData, setcopyData] = useState([]);
  const [filterMenu, setfilterMenu] = useState([]);

  const [SelectedproductID, setSelectedproductID] = useState();

  //model control
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      .get("http://localhost:3001/fetchProduct", {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")).token,
        },
      })
      .then((response) => {
        setfilterProducts(response.data);
        setcopyData(response.data);

        var filterArr = [];
        response.data.map((item) => {
          if (!filterArr.includes(item.category)) {
            filterArr.push(item.category);
          }
        });

        setfilterMenu(filterArr);
        console.log(filterArr, "filter Arr");

        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteFlag]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/fetchProduct", {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")).token,
        },
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
      .post(
        "http://localhost:3001/deleteProduct",
        { productId },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
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

  const searchProduct = (searchString) => {
    const newArr = copyData.filter((item) => {
      if (item.prouctname.toLowerCase().includes(searchString.toLowerCase())) {
        return item;
      }
    });
    if (newArr.length !== 0) {
      setfilterProducts(newArr);
    } else setfilterProducts(copyData);
  };

  // const orderSearch = (paymentID) => {
  //   const newArr = CopyData.filter((item) => {
  //     if (item.paymentID.toLowerCase().includes(paymentID.toLowerCase())) {
  //       return item;
  //     }
  //   });
  //   if (newArr.length !== 0) {
  //     setorderDataList(newArr);
  //   } else setorderDataList(CopyData);
  // };

  return (
    <div>
      <div className="listHolder">
        <div className="search-select-holder">
          <div className="search-bar-holder">
            <input
              placeholder="Search.."
              onChange={(e) => {
                searchProduct(e.target.value);
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
                categoryFilter(e.target.value);
              }}
            >
              <option value={"all"}>All</option>
              {filterMenu.length &&
                filterMenu.map((item) => (
                  <option value={item}>{`${item}`}</option>
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
                          <h6
                            style={{
                              marginTop: "16px",
                              width: "150px",
                              marginLeft: "10px",
                            }}
                          >
                            {item.prouctname}
                          </h6>
                        </div>
                      </TableCell>
                      <TableCell align="left">{item.category}</TableCell>
                      <TableCell align="left">{item.price} ₹</TableCell>
                      <TableCell align="left">{item.costofitem}</TableCell>
                      <TableCell align="left">
                        {/* {item.costofitem < 10 ? (
                          <p>
                            <span class="dot-limited"></span> Limited Stock
                          </p>
                        ) : (
                          <p>
                            <span class="dot-instock"></span> In Stock
                          </p>
                        )} */}

                        {item.costofitem <= 0 ? (
                          <p>
                            <span class="dot-outofStock"></span> Out Of Stock
                          </p>
                        ) : item.costofitem < 5 ? (
                          <p>
                            <span class="dot-limited"></span> Limited Stock
                          </p>
                        ) : (
                          <p>
                            <span class="dot-instock"></span> In Stock
                          </p>
                        )}
                      </TableCell>
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
                          <Dropdown.Item
                            href="#/action-2"
                            onClick={() => {
                              handleOpen();
                              setSelectedproductID(item._id);
                            }}
                          >
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ProductDetailPage SelectedproductID={SelectedproductID} />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AdminProductList;
