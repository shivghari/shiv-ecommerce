import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./FeatureProductControl.css";
import Form from "react-bootstrap/Form";
import axios from "axios";

function FeatureProductControl() {
  const [productImg, setproductImg] = useState();
  const [productName, setproductName] = useState("");
  const [Desc, setDesc] = useState("");
  const [netprice, setnetprice] = useState("");
  const [costofItem, setcostofItem] = useState("");
  const [tax, settax] = useState("");
  const [stakedPrice, setstakedPrice] = useState("");
  const [category, setcategory] = useState("");
  const [tags, settags] = useState("");

  const [copyofdata, setcopyofdata] = useState([]);
  const [changeFlag, setchangeFlag] = useState(false);

  const [editDisplayImage, seteditDisplayImage] = useState("");
  const [editItemId, seteditItemId] = useState("");

  const handleAddFeatureItem = (e) => {
    e.preventDefault();

    var AddFeatureProductData = new FormData();

    AddFeatureProductData.append("productName", productName);
    AddFeatureProductData.append("productImg", productImg);
    AddFeatureProductData.append("Desc", Desc);
    AddFeatureProductData.append("netprice", netprice);
    AddFeatureProductData.append("costofItem", costofItem);
    AddFeatureProductData.append("tax", tax);
    AddFeatureProductData.append("stakedPrice", stakedPrice);
    AddFeatureProductData.append("category", "Featured Product");
    AddFeatureProductData.append("tags", tags);

    axios
      .post(
        "http://localhost:3001/featureproduct/addproduct",
        AddFeatureProductData,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        setchangeFlag(!changeFlag);
      })
      .catch((err) => {
        console.log("err", err.message);
      });
  };
  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/featureproduct/getAllProducts",
        {},
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        setcopyofdata(response.data.response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [changeFlag]);

  const viewItems = (productID) => {
    if (productID === "Select Product") return "null";
    else {
      axios
        .post(
          "http://localhost:3001/featureproduct/getOneProduct",
          {
            productID: productID,
          },
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("token")).token,
            },
          }
        )
        .then((response) => {
          seteditItemId(response.data.response[0]._id);
          setproductName(response.data.response[0].prouctname);
          setproductImg(null);
          setDesc(response.data.response[0].desc);
          setnetprice(response.data.response[0].price);
          setcostofItem(response.data.response[0].costofitem);
          settax(response.data.response[0].tax);
          setstakedPrice(response.data.response[0].stakedprice);
          settags(response.data.response[0].tags);
          seteditDisplayImage(response.data.response[0].image);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleEditButton = (e) => {
    e.preventDefault();
    var EditProductData = new FormData();

    EditProductData.append("productId", editItemId);
    EditProductData.append("productName", productName);
    EditProductData.append("productImg", productImg);
    EditProductData.append("Desc", Desc);
    EditProductData.append("netprice", netprice);
    EditProductData.append("costofItem", costofItem);
    EditProductData.append("tax", tax);
    EditProductData.append("stakedPrice", stakedPrice);
    EditProductData.append("category", category);
    EditProductData.append("tags", tags);

    axios
      .post(
        "http://localhost:3001/featureproduct/editProduct",
        EditProductData,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        setchangeFlag(!changeFlag);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = () => {
    axios
      .post(
        "http://localhost:3001/featureproduct/deleteProduct",
        {
          editItemId: editItemId,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        setchangeFlag(!changeFlag);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <div className="buttonBar">
          <div className="select-btn-edit-homeControl">
            <h2>Feature Product</h2>
            <Form.Select
              aria-label="Default select example"
              className="select-btn-edit-home"
              onChange={(e) => {
                viewItems(e.target.value);
              }}
            >
              <option>Select Product</option>
              {copyofdata &&
                copyofdata.map((item) => (
                  <option
                    value={item._id}
                  >{`${item._id} - ${item.prouctname} - ${item.price}₹`}</option>
                ))}
            </Form.Select>
          </div>
          <div>
            <Button
              style={{ marginRight: "10px", width: "100px" }}
              onClick={(e) => {
                setchangeFlag(!changeFlag);
                handleAddFeatureItem(e);
              }}
            >
              Add Item
            </Button>
            <Button
              style={{ marginRight: "10px", width: "100px" }}
              onClick={handleEditButton}
            >
              Edit Item
            </Button>
            <Button onClick={deleteProduct} style={{ width: "130px" }}>
              Delete Item
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
                  value={productName}
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
                  value={Desc}
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
                      value={netprice}
                      onChange={(e) => {
                        setnetprice(e.target.value);
                      }}
                    />
                  </div>
                  <div className="dataHolder">
                    <label>Compare price</label>
                    <br />
                    <input
                      value={stakedPrice}
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
                      value={costofItem}
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
                      value={tax}
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
                    style={{ backgroundImage: "null" }}
                  />
                ) : editDisplayImage ? (
                  <img
                    src={`http://localhost:3001/static/${editDisplayImage}`}
                    alt="uploadedProduct"
                    className="productImg"
                    style={{ backgroundImage: "null" }}
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
                  value={"Feature Product"}
                  placeholder="Category "
                  required
                  disabled
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}
                />
                <br />
                <label>Tags</label>
                <br />
                <input
                  value={tags}
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
    </div>
  );
}

export default FeatureProductControl;
