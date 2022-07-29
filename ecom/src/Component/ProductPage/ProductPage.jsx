import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "./ProductPage.css";
import SingleProductPageItem from "./SingleProductPageItem/SingleProductPageItem";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../Feature/cartSlice";

//select dropdown code
import { Select, Slider } from "antd";
import { Rating } from "@mui/material";
const { Option } = Select;

function ProductPage() {
  const [productData, setproductData] = useState([]);
  const [copyProductData, setcopyProductData] = useState([]);
  const [isFetching, setisFetching] = useState(true);

  const dispatch = useDispatch();

  const [filterRating, setfilterRating] = useState(0);
  const [filterPrice, setfilterPrice] = useState([0, 100000000000]);
  const [filterCategory, setfilterCategory] = useState([]);

  const handleChange = (value) => {
    console.log(value);
    setfilterCategory(value);
  };

  //handle filter function
  const handleFilter = () => {
    console.log("function is called", [
      filterCategory,
      filterPrice,
      filterRating,
    ]);
    var filterdProduct = productData?.filter((product) => {
      if (
        product.price >= parseInt(filterPrice[0]) &&
        product.price <= parseInt(filterPrice[1])
      ) {
        if (product.rating >= filterRating) {
          if (filterCategory.length && filterCategory[0] != "All") {
            if (filterCategory.includes(product.category.toLowerCase())) {
              return product;
            }
          }
        }
      }
    });
    if (filterdProduct.length) {
      setproductData(filterdProduct);
    } else {
      setproductData(copyProductData);
    }
  };

  //selcect Dropdown options array
  const categoryArr = ["All", "cosmatic", "watch", "chair", "shoes"];

  //range filter slider

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setisFetching(true);
    axios
      .get("http://localhost:3001/productPage/getAllProduct")
      .then((response) => {
        console.log(response.data.response);
        setproductData(response.data.response);
        setcopyProductData(response.data.response);
        setisFetching(false);
        if (localStorage.getItem("token")) {
          dispatch(
            setUser({
              userID: JSON.parse(localStorage.getItem("token")).userID,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isFetching === true) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="productGridHolder">
      <div className="filterContainerHolder">
        <div className="CategoryFilterHolder">
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="Select Category"
            onChange={handleChange}
          >
            {categoryArr?.map((item) => (
              <Option key={item} style={{ width: "30%" }}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
        <div className="priceFilter">
          <p>Set Price Range</p>
          <Slider
            range
            defaultValue={[1000, 8000]}
            disabled={disabled}
            max="11000"
            number="1"
            style={{ marginTop: "-1px" }}
            onChange={(e) => {
              setfilterPrice(e);
            }}
          />
        </div>
        <div className="ratingFilterContainer">
          <p>Filter By rating</p>
          <Rating
            defaultValue={0}
            precision={1}
            onChange={(e) => {
              setfilterRating(e.target.value);
            }}
          />
        </div>
        <div className="filterButton">
          <Button onClick={handleFilter}>Filter Product</Button>
        </div>
      </div>
      <Row>
        {isFetching === false
          ? productData &&
            productData.map((item, index) => (
              <Col lg={3} key={index}>
                <SingleProductPageItem
                  image={item?.image}
                  productname={item?.prouctname}
                  price={item?.price}
                  stakedPrice={item?.stakedprice}
                  productID={item?._id}
                  rating={item?.rating}
                  ratevotecount={item?.ratevotecount}
                />
              </Col>
            ))
          : null}
      </Row>
    </div>
  );
}

export default ProductPage;
