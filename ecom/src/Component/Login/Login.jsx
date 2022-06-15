import "./Login.css";
import React, { useState } from "react";
import { Card } from "antd";
import { Button } from "react-bootstrap";
import Sponsers from "../Sponsers/Sponsers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { newUser } from "../../Feature/LoginUserSlice";

function Login() {
  const [useEmail, setuseEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loginStatus, setloginStatus] = useState("#C2C5E1");

  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    var loginData = new FormData();
    if (useEmail && password) {
      loginData.append("email", useEmail);
      loginData.append("pass", password);

      axios
        .post("http://localhost:3001/login", loginData)
        .then((response) => {
          console.log(response.data);
          console.log(response.data);
          dispatch(
            newUser({
              userID: response.data.userID,
              token: response.data.token,
              username: response.data.username,
              email: response.data.email,
              role: response.data.role,
            })
          );
          localStorage.setItem(
            "token",
            JSON.stringify({
              token: response.data.token,
              userID: response.data.userID,
            })
          );
          setloginStatus("green");
        })
        .catch((err) => {
          console.log(err);
          setloginStatus("red");
        });
    }
  };

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
              style={{ borderColor: loginStatus }}
            />
            <input
              placeholder="Password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              style={{ borderColor: loginStatus }}
            />
            <p>Forget Password?</p>
            <div className="loginBtnHolder">
              <Button
                className="loginBtn"
                onClick={(e) => {
                  handleLogin(e);
                }}
              >
                Sign In
              </Button>
            </div>
          </div>
          <div
            className="signUpLink"
            onClick={() => {
              Navigate("/signin");
            }}
          >
            <p>Don't have an Accont?Create Account</p>
          </div>
        </Card>
      </div>
      <Sponsers />
    </>
  );
}

export default Login;
