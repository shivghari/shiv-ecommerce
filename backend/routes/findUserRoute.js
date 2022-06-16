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


router.get('/:userID', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, result) => {
        console.log('Finding The user')
        const userID = req.params.userID
        console.log(userID)
        User.find({ _id: userID }).then((reponse) => {
            res.status(200).json({ email: reponse[0].email, username: reponse[0].username, role: reponse[0].role })
        }).catch((err) => {
            console.log(err)
            res.send("something")
        })
    })

})

module.exports = router