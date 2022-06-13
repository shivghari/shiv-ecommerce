const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
const multer = require('multer');
const upload = multer({dest : 'uploads'})
const mongoose = require('mongoose');
const User = require('../models/userData')
const Product = require('../models/product')

const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/jwtVerificationMid');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get('/',(req, res)=>{
    Product.find().then((response)=>{
        res.status(200).json(response)
    })
})

module.exports = router