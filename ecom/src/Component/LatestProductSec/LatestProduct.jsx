import React, { useEffect, useState } from "react";
import "./LatestProduct.css";
// import { Col, Nav, Row, Tab } from "react-bootstrap";
// import NewArrival from "./NewArrival/NewArrival";
// import BestSeller from "./BestSeller/BestSeller";
// import FeaturedList from "./FeaturedList/FeaturedList";
// import SpecialOffer from "./SpecialOffer/SpecialOffer";
import SingleProductDesign from "./SingleProductDesign/SingleProductDesign";
import axios from "axios";

function LatestProduct() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/homepageproduct/latestgetAllProducts")
      .then((response) => {
        setdata(response.data.response);
        console.log(response.data.response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="latestProductSec">
      <div className="LatestProductHeading">
        <h1>Latest product</h1>
      </div>
      <div className="productContainer">
        {data.map((item) => (
          <SingleProductDesign
            productImage={`http://localhost:3001/static/${item.image}`}
            productName={`${item.prouctname}`}
            productPrice={`$${item.price}`}
            strikedPrice={`$${item.stakedprice}`}
            rating={item.rating}
            productCode={item._id}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestProduct;
