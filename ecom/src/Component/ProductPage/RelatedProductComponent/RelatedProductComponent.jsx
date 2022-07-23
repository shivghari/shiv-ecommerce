import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./RelatedProductComponent.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function RelatedProductComponent({ neglateProductID, productCategory }) {
  const [relatedProductList, setrelatedProductList] = useState([]);
  const [category, setcategory] = useState(productCategory);
  const Navigate = useNavigate();
  const Params = useParams();

  useEffect(() => {
    setcategory(productCategory);
    console.log(productCategory, "check");
    axios
      .post("http://localhost:3001/fetchProduct/getRelatedProduct", {
        productCategory: category,
        neglateProductID: neglateProductID,
      })
      .then((response) => {
        console.log(response.data.response);
        var newRelatedProduct = response?.data?.response?.filter((product) => {
          if (product?._id != neglateProductID) {
            return product;
          }
        });
        if (newRelatedProduct.length) {
          setrelatedProductList(newRelatedProduct);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Params]);
  return (
    <div className="relatedProductMainContaier">
      <h2>Related Product</h2>
      <div className="containerDivOfProduct">
        {productCategory &&
          relatedProductList?.map((product) => (
            <div className="singleProductContainer">
              <div>
                <img
                  src={`http://localhost:3001/static/${product?.image}`}
                  height="250px"
                  width="250px"
                  className="imagesCover"
                  onClick={() => {
                    Navigate(`/thisProduct/${product?._id}`);
                  }}
                />
              </div>
              <div className="RelatedProductDetailsContainer">
                <p>{product?.prouctname}</p>
              </div>
              <div className="ratingAndPriceHolder">
                <p>₹ {product?.price}</p>
                <div className="flexContainerforRateCount">
                  {product?.rating != undefined ? (
                    <Rating value={product?.rating} readOnly />
                  ) : null}
                  <p className="soloRateContainer">
                    ({product?.ratevotecount})
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RelatedProductComponent;
