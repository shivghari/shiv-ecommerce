const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
const multer = require('multer');
const upload = multer({ dest: 'uploads' })
const mongoose = require('mongoose');
const User = require('../models/userData')

const jwt = require('jsonwebtoken')

const verifyToken = require('../middleware/jwtVerificationMid')

router.post('/', upload.single(), (req, res) => {
    const loginPass = req.body.pass
    User.find({ email: req.body.email }).then(async (response) => {
        const validPasswrod = await bcrypt.compare(loginPass, response[0].password)
        if (validPasswrod) {
            if (req.body.email === response[0].email) {
                var token = jwt.sign({ userID: response[0]._id }, 'secretkey')
                res.status(200).json({ message: "User Login Success", userID: response[0]._id, token, username: response[0].username, email: response[0].email, role: response[0].role })
            }
            else {
                res.status(304).json({ message: "Credentials Not Matched" })
            }
        }
        else {
            res.status(304).json({ message: "Credentials Not Matched" })
        }
    })
        .catch((err) => {
            console.log(err)
            res.status(304).json({ messsage: "Enter Valid Credentials", err })
        })
})

module.exports = router