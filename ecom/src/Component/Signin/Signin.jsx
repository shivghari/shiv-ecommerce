import "./Signin.css";
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Button } from "react-bootstrap";
import Sponsers from "../Sponsers/Sponsers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";

function Signin() {
  const Navigate = useNavigate();

  const [email, setemail] = useState("");
  const [userName, setuserName] = useState("");
  const [pass, setpass] = useState("");
  const [rePass, setrePass] = useState("");

  const [passCheck, setpassCheck] = useState("");
  const [alert, setalert] = useState(null);

  useEffect(() => {
    if (pass === rePass && pass !== "" && rePass !== "") {
      setpassCheck("green");
      setalert(null);
    } else if (pass === "" || rePass === "") {
      setpassCheck("#C2C5E1");
      setalert(null);
    } else {
      setpassCheck("red");
      setalert(<Alert severity="error">Password Not Matched!!</Alert>);
    }
  }, [rePass]);

  const handleSignin = (e) => {
    e.preventDefault();
    if (pass === rePass) {
      var signinData = new FormData();
      signinData.append("email", email);
      signinData.append("username", userName);
      signinData.append("pass", pass);

      axios
        .post("http://localhost:3001/signin", signinData)
        .then((response) => {
          console.log("res", response);
          setalert(<Alert severity="success">{response.data.message}</Alert>);
        })
        .catch((err) => {
          console.log("err", err);
          setalert(<Alert severity="error">"User Already Exists"</Alert>);
        });
    } else {
      console.log("Password Not Matched");
      setalert(<Alert severity="error">Password Not Matched!!</Alert>);
    }
  };

  return (
    <>
      <div className="signinCardHolder">
        <Card className="LoginCard">
          <div className="LoginHeading">
            <h1>Sign In</h1>
            <p>Enter Your Details for Careate an Account</p>
          </div>
          <div className="inputHolder">
            <input
              placeholder="Email Address"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              required
            />
            <input
              placeholder="username"
              onChange={(e) => {
                setuserName(e.target.value);
              }}
              required
            />
            <input
              placeholder="Password"
              style={{ borderColor: passCheck }}
              onChange={(e) => {
                setpass(e.target.value);
              }}
              required
            />
            <input
              placeholder="re-Enter Password"
              style={{ borderColor: passCheck }}
              onChange={(e) => {
                setrePass(e.target.value);
              }}
              required
            />

            <div className="loginBtnHolder">
              <Button className="loginBtn" onClick={handleSignin}>
                Create Account
              </Button>
            </div>
          </div>
          <div
            className="signUpLink"
            onClick={() => {
              Navigate("/login");
            }}
          >
            <p>Already have an Account?Plesae Login</p>
          </div>
        </Card>
        {alert}
      </div>
      <Sponsers />
    </>
  );
}

export default Signin;
