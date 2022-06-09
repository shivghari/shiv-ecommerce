import React from "react";
import HomeSec1 from "../HomeSec1/HomeSec1";
import FeatureProduct from "../FeatureProduct/FeatureProduct";
import LatestProduct from "../LatestProductSec/LatestProduct";
import WhatOffer from "../WhatOffer/WhatOffer";
import SpecialProductDisplay1 from "../SpecialproductDisplay/SpecialProductDisplay1";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import DiscountItem from "../DiscountItem/DiscountItem";
import TopCategory from "../TopCategory/TopCategory";
import SubscribeBar from "../SubscribeBar/SubscribeBar";
import Sponsers from "../Sponsers/Sponsers";
import LatestBlogHome from "../LatestBlogHome/LatestBlogHome";

function HomePage() {
  return (
    <div style={{ width: "100%" }}>
      <HomeSec1 />
      <FeatureProduct />
      <LatestProduct />
      {/* <WhatOffer />
      <SpecialProductDisplay1 />
      <TrendingProducts />
      <DiscountItem />
      <TopCategory />
      <SubscribeBar />
      <Sponsers />
      <LatestBlogHome /> */}
    </div>
  );
}

export default HomePage;
