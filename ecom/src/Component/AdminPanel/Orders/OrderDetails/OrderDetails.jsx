import axios from "axios";
import React, { useEffect, useState } from "react";

function OrderDetails({ userID }) {
  const [orderIDs, setorderIDs] = useState([]);
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/findUser/allUserdata", {
        userID: userID,
      })
      .then((response) => {
        setorderIDs(response.data.reponse[0].orderID);

        // Need TO update

        var dataArr = [];
        orderIDs.map((item) => {
          item.orderlist.map((i) => {
            console.log(i, "order details");
            console.log(i.productID.prouctname, "productsashfol");
            var newObj = {};
            newObj["productname"] = i.productID.prouctname;
            newObj["price"] = i.productID.price;
            newObj["image"] = i.productID.image;
            dataArr.push(newObj);
            setdata([...data, newObj]);
          });
        });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  console.log(data, "orderDetails");

  return (
    <div>
      <h1>OrderDetails</h1>
      <p>userID : {userID}</p>
    </div>
  );
}

export default OrderDetails;
