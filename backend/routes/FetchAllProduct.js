const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const mongoose = require("mongoose");
const User = require("../models/userData");
const Product = require("../models/product");

const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/jwtVerificationMid");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, result) => {
    Product.find().then((response) => {
      res.status(200).json(response);
    });
  });
});

router.post("/getPerticularProduct", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, result) => {
    Product.findOne({ _id: req.body.productID })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(300).json({ message: "Something Went Worng" });
      });
  });
});

router.post("/getRelatedProduct", (req, res) => {
  Product.find({ category: req.body.productCategory })
    .then((data) => {
      var newdata = data.filter((product) => {
        if (product?._id != req.body.neglateProductID) {
          return product;
        }
      });
      response = newdata?.slice(0, 4);
      res.status(200).json({ response });
    })
    .catch((err) => {
      res
        .status(300)
        .json({ message: "Something went wring in fetching relataed Product" });
    });
});

module.exports = router;
