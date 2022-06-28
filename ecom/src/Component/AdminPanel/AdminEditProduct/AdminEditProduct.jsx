import "./AdminEditProduct.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import { useGetProductsQuery } from "../../../Feature/FetchProducts";
import axios from "axios";

function AdminEditProduct() {
  const [productImg, setproductImg] = useState();
  const [productName, setproductName] = useState("");
  const [Desc, setDesc] = useState("");
  const [netprice, setnetprice] = useState("");
  const [costofItem, setcostofItem] = useState("");
  const [tax, settax] = useState("");
  const [stakedPrice, setstakedPrice] = useState("");
  const [category, setcategory] = useState("");
  const [tags, settags] = useState("");
  const [editItemId, seteditItemId] = useState("");

  const [editDisplayImage, seteditDisplayImage] = useState("");

  const [data, setdata] = useState([]);
  const [changeFlag, setchangeFlag] = useState(false);

  const handleViewButton = (productID) => {
    data.map((item) => {
      if (item._id === productID) {
        seteditItemId(item._id);
        setproductImg(null);
        setproductName(item.prouctname);
        setDesc(item.desc);
        setnetprice(item.price);
        setcostofItem(item.costofitem);
        settax(item.tax);
        setstakedPrice(item.stakedprice);
        setcategory(item.category);
        settags(item.tags);
        seteditDisplayImage(item.image);
      }
    });
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
      .post("http://localhost:3001/editProduct", EditProductData, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")).token,
        },
      })
      .then((response) => {
        setchangeFlag(!changeFlag);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (isFetching) {
  //   return <h3>Loading Data...</h3>;
  // }

  useEffect(() => {
    axios
      .get("http://localhost:3001/fetchProduct", {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")).token,
        },
      })
      .then((response) => {
        setdata(response.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, [changeFlag]);

  return (
    <div>
      <div className="buttonBar">
        <div className="edit-item-dropdown">
          <h2>Edit Product</h2>
          <Form.Select
            aria-label="Default select example"
            className="select-btn-edit"
            onChange={(e) => {
              handleViewButton(e.target.value);
            }}
          >
            <option>Select Product</option>
            {data &&
              data.map((item) => (
                <option
                  value={item._id}
                >{`${item._id} - ${item.prouctname} - ${item.price}₹`}</option>
              ))}
          </Form.Select>
        </div>
        <div>
          <Button size="large" style={{ marginRight: "10px" }}>
            Discard
          </Button>
          <Button variant="contained" onClick={handleEditButton}>
            Edit Item
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
                    value={netprice}
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
                    value={stakedPrice}
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
              ) : editDisplayImage ? (
                <img
                  src={`http://localhost:3001/static/${editDisplayImage}`}
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
                value={category}
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
  );
}

export default AdminEditProduct;
