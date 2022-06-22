import React from "react";
import { Nav, Tab } from "react-bootstrap";
import "./AdminPanel.css";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import AddProduct from "./AddProduct/AddProduct";
import AdminProductList from "./AdminProductList/AdminProductList";
import AdminEditProduct from "./AdminEditProduct/AdminEditProduct";
import Orders from "./Orders/Orders";
import HomepageControl from "./HomepageControl/HomepageControl";
import ManageUser from "./ManageUser/ManageUser";

function AdminPanel() {
  return (
    <div className="mainAdminbar">
      <Tab.Container defaultActiveKey={"orders"}>
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
            <Nav.Item>
              <Nav.Link
                eventKey={"homepagecontrol"}
                className="admin-link-content"
              >
                HomePage <HomeIcon />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={"manageusers"} className="admin-link-content">
                Users <AdminPanelSettingsIcon />
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
            <AdminEditProduct />
          </Tab.Pane>
          <Tab.Pane eventKey={"orders"}>
            <Orders />
          </Tab.Pane>
          <Tab.Pane eventKey={"homepagecontrol"}>
            <HomepageControl />
          </Tab.Pane>
          <Tab.Pane eventKey={"manageusers"}>
            <ManageUser />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default AdminPanel;
