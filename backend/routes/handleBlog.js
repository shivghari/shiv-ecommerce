const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const mongoose = require("mongoose");
const User = require("../models/userData");
const Orderhistory = require("../models/orderHistory");
const BlogSchema = require("../models/blogData");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/jwtVerificationMid");
require("dotenv").config();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/addBlog", (req, res) => {
  const newBlog = new BlogSchema({
    title: req.body.title,
    content: req.body.content,
  });

  newBlog
    .save()
    .then((response) => {
      res.status(200).json({ message: "Blog Saved SuccessFully" });
    })
    .catch((err) => {
      console.log(err, "err blog");
      res
        .status(300)
        .json({ message: "Something went wring in saving the Blog" });
    });
});

router.get("/getAllBlog", (req, res) => {
  BlogSchema.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      console.log(err, "err in Getting Blogs");
      res
        .status(300)
        .json({ message: "Something went Wrong in fetvhing All Blogs." });
    });
});

module.exports = router;
