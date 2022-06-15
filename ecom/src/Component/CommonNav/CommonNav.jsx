import React, { useEffect } from "react";
import "./CommonNav.css";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

import NativeSelect from "@mui/material/NativeSelect";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "../../Feature/FindUserSlice";
import { newUser } from "../../Feature/LoginUserSlice";
import { Button } from "react-bootstrap";

function CommonNav() {
  const Navigate = useNavigate();

  const loginUserName = useSelector((state) => state.newUser.username);
  const loginEmail = useSelector((state) => state.newUser.email);
  const loginUserRole = useSelector((state) => state.newUser.role);

  const dispatch = useDispatch();

  var userId;

  //manageing Sesssion on the userID stored in localStorage

  try {
    if (JSON.parse(localStorage.getItem("token")).userID) {
      userId = JSON.parse(localStorage.getItem("token")).userID;
    }
  } catch (e) {
    console.log(e.message);
    userId = "";
  }
  const { data } = useGetUserQuery(userId);

  console.log(data);
  useEffect(() => {
    if (data) {
      dispatch(
        newUser({ email: data.email, username: data.username, role: data.role })
      );
    }
  }, [data]);

  return (
    <div className="commonContainer">
      <div className="contentContainer">
        <div className="mailPhoneContainer">
          <div className="hideIcon">
            <MailOutlineIcon sx={{ marginTop: "10px" }} />
          </div>
          <p className="email">{loginEmail}</p>
          <div className="hideIcon">
            <PhoneInTalkIcon sx={{ marginTop: "10px" }} />
          </div>
          <p classaName="phone">{loginUserName}</p>
        </div>
        <div className="loginOtherContainer">
          <NativeSelect defaultValue={"English"} sx={{ color: "#fff" }}>
            <option value={"English"} className="options">
              English
            </option>
            <option value={"Hindi"} className="options">
              Hindi
            </option>
            <option value={"Gujrati"} className="options">
              Gujarati
            </option>
          </NativeSelect>
          <NativeSelect
            defaultValue={"USD"}
            sx={{ marginLeft: "5px", color: "#fff" }}
          >
            <option value={"USD"} className="options">
              USD
            </option>
            <option value={"Pound"} className="options">
              Pound
            </option>
            <option value={"Rupee"} className="options">
              Rupee
            </option>
          </NativeSelect>
          <div
            className="imgAndTag"
            onClick={() => {
              if (loginUserRole === "admin") {
                Navigate("/admin");
              } else {
                Navigate("/login");
              }
            }}
          >
            <p>{loginUserRole === "admin" ? "Admin Panel" : "Login"}</p>{" "}
            <PersonRoundedIcon style={{ marginTop: "10px" }} />
          </div>
          <div className="imgAndTag">
            <p>Wishlist</p> <FavoriteBorderIcon style={{ marginTop: "10px" }} />
          </div>
          <div className="imgAndTag">
            <ShoppingCartOutlinedIcon style={{ marginTop: "10px" }} />
          </div>
        </div>
        <div className="extraIconForResponsive">
          <PersonRoundedIcon
            style={{ marginTop: "10px", color: "#fff" }}
            onClick={() => {
              Navigate("/login");
            }}
          />
        </div>
        <Button
          onClick={() => {
            localStorage.clear();
            Navigate("/");
            dispatch(newUser({ email: "", username: "" }));
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default CommonNav;
