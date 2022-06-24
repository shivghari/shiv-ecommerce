import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./ProductPage.css";
import SingleProductPageItem from "./SingleProductPageItem/SingleProductPageItem";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../Feature/cartSlice";

function ProductPage() {
  const [productData, setproductData] = useState([]);
  const [isFetching, setisFetching] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setisFetching(true);
    axios
      .get("http://localhost:3001/productPage/getAllProduct")
      .then((response) => {
        console.log(response.data.response);
        setproductData(response.data.response);
        setisFetching(false);
        dispatch(
          setUser({ userID: JSON.parse(localStorage.getItem("token")).userID })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("data", productData);
  if (isFetching === true) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="productGridHolder">
      <Row>
        {isFetching === false
          ? productData &&
            productData.map((item, index) => (
              <Col lg={3} key={index}>
                <SingleProductPageItem
                  image={item.image}
                  productname={item.prouctname}
                  price={item.price}
                  stakedPrice={item.stakedprice}
                  productID={item._id}
                  rating={item.rating}
                  ratevotecount={item.ratevotecount}
                />
              </Col>
            ))
          : null}
      </Row>
    </div>
  );
}

export default ProductPage;
