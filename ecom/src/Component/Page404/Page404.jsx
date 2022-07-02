import React from "react";
import "./Page404.css";
import errorPage from "./404Page.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sponsers from "../Sponsers/Sponsers";

function Page404() {
  const Navigate = useNavigate();
  return (
    <div className="errorPageContainer">
      <img src={errorPage} alt="pageNotFound" />
      <h2>Opps..! The Page you requested not found!</h2>
      <Button
        className="HomeBtn"
        onClick={() => {
          Navigate("/");
        }}
      >
        Back To Home
      </Button>

      <Sponsers />
    </div>
  );
}

export default Page404;
