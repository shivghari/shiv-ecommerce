import React from "react";
import { Nav, Tab } from "react-bootstrap";
import "./AdminPanel.css";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";

import AddProduct from "./AddProduct/AddProduct";
import AdminProductList from "./AdminProductList/AdminProductList";

function AdminPanel() {
  return (
    <div className="mainAdminbar">
      <Tab.Container defaultActiveKey={"ProductList"}>
        <Nav className="navLinkContainer">
          <div className="adminLinks">
            <Nav.Item>
              <Nav.Link eventKey={"ProductList"} className="admin-link-content">
                Product List
                <ListAltIcon />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={"addProduct"} className="admin-link-content">
                Add product
                <AddIcon />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={"editProduct"} className="admin-link-content">
                Edit Product
                <EditIcon />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={"orders"} className="admin-link-content">
                Orders
                <BookmarkBorderIcon />
              </Nav.Link>
            </Nav.Item>
          </div>
        </Nav>
        <Tab.Content className="adminContent">
          <Tab.Pane eventKey={"ProductList"}>
            <AdminProductList />
          </Tab.Pane>
          <Tab.Pane eventKey={"addProduct"}>
            <AddProduct />
          </Tab.Pane>
          <Tab.Pane eventKey={"editProduct"}>
            <h1>editProduct</h1>
          </Tab.Pane>
          <Tab.Pane eventKey={"orders"}>
            <h1>orders</h1>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default AdminPanel;
