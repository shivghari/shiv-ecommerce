import React, { useState } from "react";
import "./FeatureProduct.css";
import FeatureSec1 from "../FeatureSec1/FeatureSec1";
import { Carousel } from "react-bootstrap";

import FP1 from "../FeatureSec1/FP1.png";
import FP2 from "../FeatureSec1/FP2.png";
import FP3 from "../FeatureSec1/FP3.png";
import FP4 from "../FeatureSec1/FP4.png";

function FeatureProduct() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="FeatureProductContainer">
      <div className="featureProduct-heading">
        <h1>Featured Product</h1>
        <div className="productDisplay">
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            variant="dark"
            className="SliderContainer"
          >
            <Carousel.Item className="slider-component">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <FeatureSec1
                  productPhoto={FP1}
                  productname={"Cantilever chair"}
                  productCode={"Code . 21123"}
                  productPrice={"41.00$"}
                />
                <FeatureSec1
                  productPhoto={FP2}
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
                <FeatureSec1
                  productPhoto={FP4}
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
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;
