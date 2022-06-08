import "./TopCategory.css";
import React, { useState } from "react";
import SingleDesignCategory from "./SingleDesignCategory/SingleDesignCategory";
import { Carousel } from "react-bootstrap";

function TopCategory() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

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
