import "./Login.css";
import React, { useState } from "react";
import { Card } from "antd";
import { Button } from "react-bootstrap";
import Sponsers from "../Sponsers/Sponsers";

function Login() {
  const [useEmail, setuseEmail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <>
      <div className="loginCardHolder">
        <Card className="LoginCard">
          <div className="LoginHeading">
            <h1>Login</h1>
            <p>Please Login Using account details below</p>
          </div>
          <div className="inputHolder">
            <input
              placeholder="Email Address"
              onChange={(e) => {
                setuseEmail(e.target.value);
              }}
            />
            <input
              placeholder="Password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <p>Forget Password?</p>
            <div className="loginBtnHolder">
              <Button
                className="loginBtn"
                onClick={() => {
                  console.log("email", useEmail);
                  console.log("PAss", password);
                }}
              >
                Sign In
              </Button>
            </div>
          </div>
          <div className="signUpLink">
            <p>Don't have an Accont?Create Account</p>
          </div>
        </Card>
      </div>
      <Sponsers />
    </>
  );
}

export default Login;
