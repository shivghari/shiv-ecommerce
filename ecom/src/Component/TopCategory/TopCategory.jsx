import "./TopCategory.css";
import React, { useEffect, useState } from "react";
import SingleDesignCategory from "./SingleDesignCategory/SingleDesignCategory";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

function TopCategory() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:3001/homepageproduct/topcategorygetAllProducts")
      .then((response) => {
        setdata(response.data.response);
        console.log("top Car", response.data.response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="CategorySliderHolder">
      <div className="topCategotyHeading">
        <h1>Top Categories</h1>
      </div>
      <Row>
        {data.map((item) => (
          <Col lg={3} md={4} sm={6} xs={12}>
            <SingleDesignCategory
              productName={item.prouctname}
              price={item.price}
              image={item.image}
              rating={item.rating}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default TopCategory;
