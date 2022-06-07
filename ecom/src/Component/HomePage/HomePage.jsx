import React from "react";
import HomeSec1 from "../HomeSec1/HomeSec1";
import FeatureProduct from "../FeatureProduct/FeatureProduct";
import LatestProduct from "../LatestProductSec/LatestProduct";
import WhatOffer from "../WhatOffer/WhatOffer";
import SpecialProductDisplay1 from "../SpecialproductDisplay/SpecialProductDisplay1";
import TrendingProducts from "../TrendingProducts/TrendingProducts";

function HomePage() {
  return (
    <div>
      <HomeSec1 />
      <FeatureProduct />
      <LatestProduct />
      <WhatOffer />
      <SpecialProductDisplay1 />
      <TrendingProducts />
    </div>
  );
}

export default HomePage;
