import React, { useEffect } from "react";
import "./WebNavbar.css";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

function WebNavbar() {
  const Navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg" className="webnav">
      <Container fluid>
        <Navbar.Brand
          className="logo"
          onClick={() => {
            Navigate("/");
          }}
        >
          Hecto
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
            id="scrollNav"
          >
            <Nav.Link
              className="links"
              onClick={() => {
                Navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              className="links"
              onClick={() => {
                Navigate("/productpage");
              }}
            >
              Product
            </Nav.Link>
            <Nav.Link className="links">Blog</Nav.Link>
            <Nav.Link className="links">Shop</Nav.Link>
            <Nav.Link
              className="links"
              onClick={() => {
                Navigate("/contactus");
              }}
            >
              Contact
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default WebNavbar;
