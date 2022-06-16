import React, { useState } from "react";
import "./UserAccount.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserAccount() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [residentAddress, setresidentAddress] = useState("");
  const [deliveryAddress, setdeliveryAddress] = useState("");
  const [mobNumber, setmobNumber] = useState("");

  const Navigate = useNavigate();

  const refresh = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/userDataManage/getUserData",
        {
          userID: JSON.parse(localStorage.getItem("token")).userID,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        setusername(response.data.response[0].username);
        setemail(response.data.response[0].email);
        setresidentAddress(
          response.data.response[0].recidencyaddress
            ? response.data.response[0].recidencyaddress
            : ""
        );
        setdeliveryAddress(
          response.data.response[0].deliveryaddress
            ? response.data.response[0].deliveryaddress
            : ""
        );
        setmobNumber(
          response.data.response[0].mobile
            ? response.data.response[0].mobile
            : ""
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleEdit = (userID) => {
    var dataEdit = new FormData();
    dataEdit.append("userID", userID);
    dataEdit.append("username", username);
    dataEdit.append("email", email);
    dataEdit.append("residentAddress", residentAddress);
    dataEdit.append("deliveryAddress", deliveryAddress);
    dataEdit.append("mobNumber", mobNumber);

    axios
      .post("http://localhost:3001/userDataManage/editUserData", dataEdit, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")).token,
        },
      })
      .then((response) => {
        console.log(response.data.response);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const halndleDelete = () => {
    axios
      .post(
        "http://localhost:3001/userDataManage/deleteUser",
        {
          userID: JSON.parse(localStorage.getItem("token")).userID,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        Navigate("/");
        refresh();
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  return (
    <div>
      <div className="UserInfoHeading">
        <h1>User Information</h1>
      </div>
      <div className="makeContFlex">
        <div>
          <div className="formHolder">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />

            <label>Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />

            <label>Resident Address</label>
            <input
              type="text"
              placeholder="Enter Resident Address"
              value={residentAddress}
              onChange={(e) => {
                setresidentAddress(e.target.value);
              }}
            />

            <label>Delivery Address</label>
            <input
              type="text"
              placeholder="Enter Delivery Address"
              value={deliveryAddress}
              onChange={(e) => {
                setdeliveryAddress(e.target.value);
              }}
            />

            <label>Mobile</label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={mobNumber}
              onChange={(e) => {
                setmobNumber(e.target.value);
              }}
            />
            <div className="buttonHolder">
              <Button
                className="btnAccount"
                onClick={() => {
                  handleEdit(JSON.parse(localStorage.getItem("token")).userID);
                  refresh();
                }}
              >
                Edit Details
              </Button>
              <Button
                className="btnAccount"
                onClick={() => {
                  halndleDelete();
                }}
              >
                Delete User
              </Button>
            </div>
          </div>
        </div>
        <div className="userCart">
          <div>
            <h2>UserCart</h2>
          </div>
          <div className="productLists">kajshfl</div>
          <div className="productLists">kajshfl</div>
          <div className="productLists">kajshfl</div>
          <div className="productLists">kajshfl</div>
          <div className="productLists">kajshfl</div>
          <div className="productLists">kajshfl</div>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
