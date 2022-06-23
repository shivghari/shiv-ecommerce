import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ProductDetailPage.css";

function ProductDetailPage({ SelectedproductID }) {
  const [productData, setproductData] = useState();
  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/fetchProduct/getPerticularProduct",
        {
          productID: SelectedproductID,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        console.log(response.data, "Product Details");
        setproductData(response.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);
  return (
    <div className="allProductDataContainer">
      {productData ? (
        <div>
          <div>
            <h1>Product Details</h1>
          </div>
          <div className="imageAndDetailsSide">
            <img
              src={`http://localhost:3001/static/${
                productData ? productData.image : null
              }`}
              alt="product"
              height={"200px"}
              width={"200px"}
            />
            <div className="productDeatilsContainerDetailsPage">
              <p>
                Product Name :{" "}
                {productData ? productData.prouctname : "Loading..."}
              </p>
              <p>Price : {productData ? productData.price : "Loading..."}</p>
              <p>
                Description : {productData ? productData.desc : "Loading..."}
              </p>
              <p>Tag : {productData ? productData.tags : "Loading..."}</p>
              <p>
                Category : {productData ? productData.category : "Loading..."}
              </p>
              <p>
                Quentity :
                {productData && productData.costofitem <= 0 ? (
                  <>
                    <span>{productData.costofitem} &nbsp;</span>
                    <span class="dot-outofStock"></span>
                    Out Of Stock
                  </>
                ) : productData.costofitem < 5 ? (
                  <>
                    Quentity : &nbsp;{productData.costofitem} &nbsp;
                    <span class="dot-limited"></span>
                    &nbsp; Limited Stock
                  </>
                ) : (
                  <>
                    {productData.costofitem} &nbsp;
                    <span class="dot-instock"></span> In Stock
                  </>
                )}
              </p>
              <p>
                Staked Price :{" "}
                {productData ? productData.stakedprice : "Loading..."}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <h5>Loading....</h5>
      )}
    </div>
  );
}

export default ProductDetailPage;
