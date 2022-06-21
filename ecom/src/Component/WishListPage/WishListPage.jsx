import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import SingleProductPageItem from "../ProductPage/SingleProductPageItem/SingleProductPageItem";

function WishListPage() {
  const [productList, setproductList] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/productPage/getWishListUser", {
        userID: JSON.parse(localStorage.getItem("token")).userID,
      })
      .then((response) => {
        var productIDs = response.data.wishlist;
        axios
          .post("http://localhost:3001/thisProd", {
            productIDs: productIDs,
          })
          .then((response) => {
            console.log(response.data.cartdata, "all wish products");
            setproductList(response.data.cartdata);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <h1>Your Wish List</h1>
      </div>
      <div style={{ width: "80%", margin: "auto" }}>
        <Row>
          {productList &&
            productList.map((item, index) => (
              <Col lg={3} key={index}>
                <SingleProductPageItem
                  image={item.image}
                  productname={item.prouctname}
                  price={item.price}
                  stakedPrice={item.stakedprice}
                  productID={item._id}
                />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default WishListPage;
