import React, { useEffect, useState } from "react";
import "../Login/Login.css";
import { Card } from "antd";
import { Button } from "react-bootstrap";
import { Alert } from "@mui/material";
import Sponsers from "../Sponsers/Sponsers";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [userID, setuserID] = useState("");
  const [OTP, setOTP] = useState("");
  const [varification, setvarification] = useState(false);

  const [passCheck, setpassCheck] = useState("");

  const [password, setpassword] = useState("");
  const [repass, setrepass] = useState("");

  const [toggle, settoggle] = useState(false);

  const [alert, setalert] = useState(null);

  const Navigate = useNavigate();

  useEffect(() => {
    if (password === repass && password !== "" && repass !== "") {
      setpassCheck("green");
    } else if (password === "" || repass === "") {
      setpassCheck("#C2C5E1");
    } else {
      setpassCheck("red");
    }
  }, [repass, password]);

  const sendUsername = () => {
    axios
      .post("http://localhost:3001/forgotPassword/getToken", {
        username: username,
      })
      .then((response) => {
        console.log(response);
        setemail(response.data.email);
        setuserID(response.data.userID);
        settoggle(true);
        localStorage.setItem("forgotPassToken", response.data.forgotPassToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const vewrifyOPT = () => {
    axios
      .post(
        "http://localhost:3001/forgotPassword/verifyOTP",
        { OTP: OTP },
        {
          headers: {
            Authorization: localStorage.getItem("forgotPassToken"),
          },
        }
      )
      .then((response) => {
        console.log(response.data.OTPverification);
        setvarification(response.data.OTPverification);
        settoggle(false);
        setalert(
          <Alert severity="success">
            OTP Matched - <strong>Please Fill Password</strong>
          </Alert>
        );
      })
      .catch((err) => {
        console.log(err, "err");
        setalert(
          <Alert severity="error">
            OTP Not Matched - <strong>Try Again</strong>
          </Alert>
        );
      });
  };

  const changePassword = () => {
    if (password === repass) {
      axios
        .post(
          "http://localhost:3001/forgotPassword/changePassword",
          { userID: userID, password: password },
          {
            headers: {
              Authorization: localStorage.getItem("forgotPassToken"),
            },
          }
        )
        .then((response) => {
          localStorage.removeItem("forgotPassToken");
          Navigate("/login");
        });
    } else {
      console.log("Enter Valid Password");
    }
  };

  return (
    <div>
      <div className="loginCardHolder">
        <Card className="LoginCard">
          <div className="LoginHeading">
            <h1>Forgot Password</h1>
            <p>Please Fill Following Details</p>
          </div>
          <div className="inputHolder">
            <input
              placeholder="Enter Registered Username"
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
            {toggle ? (
              <div>
                <input
                  placeholder="Enter OTP here"
                  onChange={(e) => {
                    setOTP(e.target.value);
                  }}
                />
                <p>Check Your Email : {email}</p>
              </div>
            ) : null}

            {varification ? (
              <div>
                <input
                  required
                  style={{ borderColor: passCheck }}
                  placeholder="Enter New Password"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
                <input
                  required
                  style={{ borderColor: passCheck }}
                  placeholder="re-Enter Password"
                  onChange={(e) => {
                    setrepass(e.target.value);
                  }}
                />
              </div>
            ) : null}

            <div className="loginBtnHolder">
              <Button
                className="loginBtn"
                onClick={() => {
                  if (toggle) {
                    vewrifyOPT();
                  } else if (varification) {
                    changePassword();
                  } else {
                    sendUsername();
                  }
                }}
              >
                {toggle
                  ? "Verify OTP"
                  : varification
                  ? "Change Password"
                  : "Forgot Password"}
              </Button>
              <br />
              {alert}
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
    </div>
  );
}

export default ForgotPassword;
