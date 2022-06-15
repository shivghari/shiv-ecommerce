import "./TopCategory.css";
import React, { useEffect, useState } from "react";
import SingleDesignCategory from "./SingleDesignCategory/SingleDesignCategory";
import { Carousel } from "react-bootstrap";
import axios from "axios";

function TopCategory() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:3001/topcategory/getAllProducts")
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
      <div className="SliderMainDiv">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          variant="dark"
          className="CategorySliderContainer"
        >
          <Carousel.Item>
            <div className="CategoryHolderSlider">
              {data.map((item) => (
                <div>
                  <SingleDesignCategory
                    productName={item.prouctname}
                    price={item.price}
                    image={item.image}
                  />
                </div>
              ))}
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="CategoryHolderSlider">
              <SingleDesignCategory />
              <SingleDesignCategory />
              <SingleDesignCategory />
              <SingleDesignCategory />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="CategoryHolderSlider">
              <SingleDesignCategory />
              <SingleDesignCategory />
              <SingleDesignCategory />
              <SingleDesignCategory />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default TopCategory;
