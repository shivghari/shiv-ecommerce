import React from "react";
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
          href="#"
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
          >
            <Nav.Link href="#action1" className="links">
              Home
            </Nav.Link>
            <Nav.Link href="#action2" className="links">
              Pages
            </Nav.Link>
            <Nav.Link href="#action2" className="links">
              Product
            </Nav.Link>
            <Nav.Link href="#action2" className="links">
              Blog
            </Nav.Link>
            <Nav.Link href="#action2" className="links">
              Shop
            </Nav.Link>
            <Nav.Link href="#action2" className="links">
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
