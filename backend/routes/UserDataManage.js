const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const mongoose = require("mongoose");
const User = require("../models/userData");

const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/jwtVerificationMid");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/getUserData", upload.single(), verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, result) => {
    User.find({ _id: req.body.userID })
      .then((response) => {
        res.status(200).json({ message: "User Data Found", response });
      })
      .catch((err) => {
        console.log("err", err);
        res.status(300).json({ message: "Something Went Wrong" });
      });
  });
});

router.use("/editUserData", upload.single(), verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, result) => {
    User.updateOne(
      { _id: req.body.userID },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          recidencyaddress: req.body.residentAddress,
          deliveryaddress: req.body.deliveryAddress,
          mobile: req.body.mobNumber,
        },
      }
    )
      .then((response) => {
        res.status(200).json({ message: "User Data Updated" });
      })
      .catch((err) => {
        res
          .status(300)
          .json({ message: "Some Thine Went Wring in User Data Setting." });
      });
  });
});

router.use("/deleteUser", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, result) => {
    User.deleteOne({ _id: req.body.userID })
      .then((response) => {
        res.status(200).json({ message: "User Deleted" });
      })
      .catch((err) => {
        res.status(300).json({ message: "Something Went Wring" });
      });
  });
});

module.exports = router;
