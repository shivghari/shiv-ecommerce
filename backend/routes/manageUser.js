const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads' })
const mongoose = require('mongoose');
const User = require('../models/userData')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/jwtVerificationMid')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get('/getAlluser', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, result) => {
        User.find().then((response) => {
            res.status(200).json({ message: "Data Fetched", response })
        })
    })
})

router.post('/makeAdmin', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, result) => {
        User.updateOne({ _id: req.body.userID }, {
            $set: {
                role: "admin"
            }
        }).then((response) => {
            res.status(200).json({ message: "Alert : New Admin Added" })
        }).catch((err) => {
            res.status(300).jason({ message: "Admin Not Updated..!" })
        })
    })
})


router.post('/makeUser', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, result) => {
        User.updateOne({ _id: req.body.userID }, {
            $set: {
                role: "user"
            }
        }).then((response) => {
            res.status(200).json({ message: "Alert : New Admin Added" })
        }).catch((err) => {
            res.status(300).jason({ message: "Admin Not Updated..!" })
        })
    })
})

module.exports = router