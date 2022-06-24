import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./OrderDetails.css";

function OrderDetails({
  paymentID,
  custName,
  selectedorderDate,
  totalOrderAmount,
  selectedUserID,
}) {
  const [data, setdata] = useState([]);
  const [userInfo, setuserInfo] = useState({});

  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/manageUser/userOrder",
        {
          paymentID: paymentID,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        axios
          .post(
            "http://localhost:3001/manageUser/getPerticularUser",
            {
              userID: selectedUserID,
            },
            {
              headers: {
                Authorization: JSON.parse(localStorage.getItem("token")).token,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            setuserInfo({
              deliAddress: response.data.deliveryAddress,
              mobile: response.data.mobile,
            });
          })
          .catch((err) => {
            console.log(err, "err");
          });

        var newArr = [];
        response.data.response[0].orderlist.map((item) => {
          var newObj = {};
          newObj["productName"] = item.productID?.prouctname;
          newObj["price"] = item.productID?.price;
          newObj["image"] = item.productID?.image;
          newObj["itemCount"] = item?.count;
          newArr.push(newObj);
        });
        setdata(newArr);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  return (
    <div>
      <h1>OrderDetails</h1>
      <div className="userInfoOrder">
        <p>Customer Name : {custName}</p>
        <p>Order Date : {selectedorderDate}</p>
      </div>
      <Row>
        {data &&
          data.map((item) => (
            <Col>
              <div className="productContainerOrder">
                <div>
                  <img
                    src={`http://localhost:3001/static/${item.image}`}
                    alt="Product Deleted"
                    height="100px"
                    width="100px"
                  />
                </div>
                <div className="orderProductDetails">
                  <p>{item.productName}</p>
                  <p>{item.price} ₹</p>
                  <p>Qnt: {item.itemCount}</p>
                </div>
              </div>
            </Col>
          ))}
        <div className="totalOrderAmount">
          <p>Total Order Amount : {totalOrderAmount} ₹</p>
          <div className="userDataMob">
            <p>Delivary Address : {userInfo.deliAddress}</p>
            <p>MobileNo : {userInfo.mobile}</p>
          </div>
        </div>
      </Row>
    </div>
  );
}

export default OrderDetails;
