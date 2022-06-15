import React from "react";
import "./AddProduct.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";

function AddProduct() {
  const [productImg, setproductImg] = useState();
  const [productName, setproductName] = useState("");
  const [Desc, setDesc] = useState("");
  const [netprice, setnetprice] = useState("");
  const [costofItem, setcostofItem] = useState("");
  const [tax, settax] = useState("");
  const [stakedPrice, setstakedPrice] = useState("");
  const [category, setcategory] = useState("");
  const [tags, settags] = useState("");

  const handleAddButton = (e) => {
    e.preventDefault();

    var AddProductData = new FormData();

    AddProductData.append("productName", productName);
    AddProductData.append("productImg", productImg);
    AddProductData.append("Desc", Desc);
    AddProductData.append("netprice", netprice);
    AddProductData.append("costofItem", costofItem);
    AddProductData.append("tax", tax);
    AddProductData.append("stakedPrice", stakedPrice);
    AddProductData.append("category", category);
    AddProductData.append("tags", tags);

    axios
      .post("http://localhost:3001/addproduct", AddProductData)
      .then((response) => {
        console.log("Data Submmited ", response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="buttonBar">
        <div>
          <h2>Add Product</h2>
        </div>
        <div>
          <Button size="large" style={{ marginRight: "10px" }}>
            Discard
          </Button>
          <Button variant="contained" onClick={handleAddButton}>
            Add Item
          </Button>
        </div>
      </div>
      <div className="addproduct">
        <div className="productDetailsHolder">
          {/* Basic Info */}

          <div className="basicInfo">
            <div className="basicInfo-heading">
              <h3>Basic Info</h3>
            </div>
            <div className="data-form">
              <label>Product Name </label>
              <br />
              <input
                placeholder="Product Name"
                required
                onChange={(e) => {
                  setproductName(e.target.value);
                }}
              />
              <br />
              <br />
              <label>Description</label>
              <br />
              <input
                placeholder="Description"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Pricing */}

          <div className="pricing-info">
            <div className="pricing-heading">
              <h3>Pricing</h3>
            </div>
            <div className="data-form">
              <div className="price-flex">
                <div className="dataHolder">
                  <label>Price</label>
                  <br />
                  <input
                    type="number"
                    placeholder="₹"
                    required
                    onChange={(e) => {
                      setnetprice(e.target.value);
                    }}
                  />
                </div>
                <div className="dataHolder">
                  <label>Compare price</label>
                  <br />
                  <input
                    type="number"
                    placeholder="₹"
                    required
                    onChange={(e) => {
                      setstakedPrice(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="price-flex">
                <div className="dataHolder">
                  <label>Cost per Item</label>
                  <br />
                  <input
                    type="number"
                    placeholder="₹"
                    required
                    onChange={(e) => {
                      setcostofItem(e.target.value);
                    }}
                  />
                </div>
                <div className="dataHolder">
                  <label>Tax Rate</label>
                  <br />
                  <input
                    type="number"
                    placeholder="₹"
                    required
                    onChange={(e) => {
                      settax(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-right-addproduct">
          {/* Media Input */}
          <div className="mediainput">
            <div className="mediaInput-heading">
              <h3>Media</h3>
            </div>
            <div className="imgHolder">
              <input
                type="file"
                className="uploader"
                onChange={(e) => {
                  setproductImg(e.target.files[0]);
                }}
              />
              {productImg ? (
                <img
                  src={URL.createObjectURL(productImg)}
                  alt="uploadedProduct"
                  className="productImg"
                />
              ) : null}
            </div>
            <h5 className="imgInstruction">Click here To change the image</h5>
          </div>
          {/* Category Input */}
          <div className="categoryInput">
            <div className="mediaInput-heading">
              <h3>Organization</h3>
            </div>
            <div className="cate-data-form">
              <label>Category </label>
              <br />
              <input
                placeholder="Category "
                required
                onChange={(e) => {
                  setcategory(e.target.value);
                }}
              />
              <br />
              <label>Tags</label>
              <br />
              <input
                placeholder="Tags"
                onChange={(e) => {
                  settags(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
