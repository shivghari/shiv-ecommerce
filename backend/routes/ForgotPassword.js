const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const mongoose = require("mongoose");
const User = require("../models/userData");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const verifyToken = require("../middleware/jwtVerificationMid");
require("dotenv").config();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var OTP;

router.post("/getToken", (req, res) => {
  User.find({ username: req.body.username })
    .then((response) => {
      OTP = Math.floor(Math.random() * 100000);
      if (response[0].username === req.body.username) {
        var token = jwt.sign({ username: response[0].username }, "secretkey");
        let transport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USERNAME, // Sender address
          to: response[0].email, // List of recipients
          subject: "Forgot Password OTP Email", // Subject line
          text: `Check OTP : ${OTP}`,
        };

        transport.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            //console.log(info);
          }
        });

        res.status(200).json({
          forgotPassToken: token,
          email: response[0].email,
          userID: response[0]._id,
        });
      } else {
        res.status(300).json({ messsage: "JWT token is not assigned" });
      }
    })
    .catch((err) => {
      console.log("err", err);
      res.status(300).json({ messsage: "Something Went Wrong" });
    });
});

router.post("/verifyOTP", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, result) => {
    if (req.body.OTP == OTP) {
      res.status(200).json({ OTPverification: true });
    } else {
      res.status(300).json({ OTPverification: false });
    }
  });
});

router.post("/changePassword", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, result) => {
    var newPass = await bcrypt.hash(req.body.password, 10);
    User.updateOne(
      { _id: req.body.userID },
      {
        $set: {
          password: newPass,
        },
      }
    )
      .then((response) => {
        console.log(response);
        res
          .status(200)
          .json({ message: "Password Change Successfully", response });
      })
      .catch((err) => {
        res
          .status(200)
          .json({ message: "SomeThing Went Wrong in Updating Password" });
      });
  });
});

module.exports = router;
