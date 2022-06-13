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

router.post('/', upload.single('productImg'),(req, res)=>{
    console.log('Add Product')
    if(req.file){
        let fileType = req.file.mimetype.split('/')[1]
        let newFilename = req.file.filename + '.'+ fileType        
        fs.rename(path.resolve(process.cwd(), `uploads/${req.file.filename}`), path.resolve(process.cwd(), `uploads/${newFilename}`), (data)=>{
            console.log('File Uploaded')
        })

        var newProduct = new Product({
            prouctname : req.body.productName,
            image : newFilename,
            desc : req.body.Desc,
            category : req.body.category,
            tags : req.body.tags,
            tax : req.body.tax,
            price : req.body.netprice,
            costofitem : req.body.costofItem,
            stakedprice : req.body.stakedPrice,
        })

        newProduct.save().then(()=>{
            console.log('new product saved')
        }).catch((err)=>{
            console.log(err)
        })

    }

    res.send('message')
})

module.exports = router