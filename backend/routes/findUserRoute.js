const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const mongoose = require("mongoose");
const User = require("../models/userData");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/jwtVerificationMid");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/:userID", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, result) => {
    const userID = req.params.userID;
    User.find({ _id: userID })
      .then((reponse) => {
        res.status(200).json({
          email: reponse[0].email,
          username: reponse[0].username,
          role: reponse[0].role,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send("something");
      });
  });
});

router.post("/allUserdata", (req, res) => {
  const userID = req.body.userID;

  User.find({ _id: userID })
    .populate("orderID")
    .populate({
      path: "orderID",
      populate: {
        path: "orderlist",
        populate: { path: "productID", model: "Product" },
      },
    })
    .then((reponse) => {
      res.status(200).json({ reponse });
    })
    .catch((err) => {
      console.log(err);
      res.send("something");
    });
});

router.post("/allUsersDetails", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, result) => {
    User.find()
      .populate("orderID")
      .populate({
        path: "orderID",
        populate: {
          path: "orderlist",
          populate: { path: "productID", model: "Product" },
        },
      })
      .then((reponse) => {
        res.status(200).json({ reponse });
      })
      .catch((err) => {
        console.log(err);
        res.send("something");
      });
  });
});

module.exports = router;
