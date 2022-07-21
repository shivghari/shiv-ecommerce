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

import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";

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
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

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

  //Table Pagination Logic
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filterProducts.length)
      : 0;

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
                {(rowsPerPage > 0
                  ? filterProducts.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filterProducts
                ).map((item, index) => (
                  <TableRow>
                    <TableCell component="th" scope="row" align="left">
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
                      <DropdownButton title={<MoreVertIcon />} className="more">
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
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={filterProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
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
