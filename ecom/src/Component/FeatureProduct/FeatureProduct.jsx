import React, { useEffect, useState } from "react";
import "./FeatureProduct.css";
import FeatureSec1 from "../FeatureSec1/FeatureSec1";
import { Carousel, Col, Row } from "react-bootstrap";

import axios from "axios";

function FeatureProduct() {
  const [index, setIndex] = useState(0);
  const [data, setdata] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/homepageproduct/featureproductgetAllProducts"
      )
      .then((response) => {
        setdata(response.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="FeatureProductContainer">
      <div className="featureProduct-heading">
        <h1>Featured Product</h1>
        <div className="productDisplay">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {data.map((item) => (
              <FeatureSec1
                productPhoto={`http://localhost:3001/static/${item.image}`}
                productname={item.prouctname}
                productCode={item._id}
                productPrice={item.price}
                productRating={item.rating}
              />
            ))}
          </div>
          {/* <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            variant="dark"
            className="SliderContainer"
          >
            <Carousel.Item className="slider-component">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {data.map((item) => (
                  <FeatureSec1
                    productPhoto={`http://localhost:3001/static/${item.image}`}
                    productname={item.prouctname}
                    productCode={item._id}
                    productPrice={item.price}
                  />
                ))}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <FeatureSec1
                  productPhoto={FP2}
                  productname={"Cantilever chair"}
                  productCode={"Code . 21123"}
                  productPrice={"41.00$"}
                />
                <FeatureSec1
                  productPhoto={FP1}
                  productname={"Cantilever chair"}
                  productCode={"Code . 21123"}
                  productPrice={"41.00$"}
                />
                <FeatureSec1
                  productPhoto={FP4}
                  productname={"Cantilever chair"}
                  productCode={"Code . 21123"}
                  productPrice={"41.00$"}
                />
                <FeatureSec1
                  productPhoto={FP3}
                  productname={"Cantilever chair"}
                  productCode={"Code . 21123"}
                  productPrice={"41.00$"}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <FeatureSec1
                  productPhoto={FP2}
                  productname={"Cantilever chair"}
                  productCode={"Code . 21123"}
                  productPrice={"41.00$"}
                />
                <FeatureSec1
                  productPhoto={FP1}
                  productname={"Cantilever chair"}
                  productCode={"Code . 21123"}
                  productPrice={"41.00$"}
                />
                <FeatureSec1
                  productPhoto={FP4}
                  productname={"Cantilever chair"}
                  productCode={"Code . 21123"}
                  productPrice={"41.00$"}
                />
                <FeatureSec1
                  productPhoto={FP3}
                  productname={"Cantilever chair"}
                  productCode={"Code . 21123"}
                  productPrice={"41.00$"}
                />
              </div>
            </Carousel.Item>
          </Carousel> */}
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;
