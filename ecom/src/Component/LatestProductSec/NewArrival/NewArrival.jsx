import React, { useEffect } from "react";
import SingleProductDesign from "../SingleProductDesign/SingleProductDesign";
import "./NewArrival.css";
import axios from "axios";

import { Row, Col } from "react-bootstrap";

import NA1 from "../SingleProductDesign/NA1.png";
import { useState } from "react";

function NewArrival() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/latestproduct/getAllProducts")
      .then((response) => {
        setdata(response.data.response);
        console.log(response.data.response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div className="ArrivalHolder">
        <Row gutter={[32, 32]}>
          {data.map((item) => (
            <Col xs={24} md={6} sm={6} lg={4}>
              <SingleProductDesign
                productImage={`http://localhost:3001/static/${item.image}`}
                productName={`${item.prouctname}`}
                productPrice={`$${item.price}`}
                strikedPrice={`$${item.stakedprice}`}
              />
            </Col>
          ))}

          <Col xs={24} md={6} sm={6} lg={4}>
            <SingleProductDesign
              productImage={NA1}
              productName={"Comfort Handy Craft"}
              productPrice={"$42.00"}
              strikedPrice={"$55.00"}
            />
          </Col>
          <Col xs={24} md={6} sm={6} lg={4}>
            <SingleProductDesign
              productImage={NA1}
              productName={"Comfort Handy Craft"}
              productPrice={"$42.00"}
              strikedPrice={"$55.00"}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default NewArrival;
