const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
const multer = require('multer');
const upload = multer({ dest: 'uploads' })
const mongoose = require('mongoose');
const User = require('../models/userData')
const Product = require('../models/product')
const DisplayProductSchema = require('../models/homeControl')

const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/jwtVerificationMid');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get('/getAllProduct', (req,res)=>{
    var arr = []
    Product.find().then((response)=>{
        var productSchema = [...response]
        DisplayProductSchema.find().then((result)=>{
            arr = [...productSchema , ...result]
            res.status(200).json({ arr })
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
})


router.post('/addToCart', (req,res)=>{

    // User.updateOne({ _id : req.body.userID }, { productID : req.body.productID }).then((response)=>{
    //     User.find({ _id : req.body.userID }).populate("productID", "image price").then((result)=>{
    //         console.log(result, 'result')
    //     })
    // })



    console.log('req ID',req.body.productID)
    User.findOne({ _id : req.body.userID }, {cart : 1, _id :0}).then((response)=>{
        var hasEntry = false
        var optArr = response.cart
        console.log('check arr', optArr)
        if(optArr.length){
            optArr &&  optArr.map((item)=>{
                if(item.productID === req.body.productID){
                    item.count ++
                    hasEntry = true
                }
            })
        }
        if(hasEntry === false){
            optArr.push({
                productID : req.body.productID,
                count : 1
            })
        }
        User.updateOne({ _id : req.body.userID }, {
            "$set" : {cart : optArr}
        }).then((response)=>{
            console.log(response)
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })

    res.send('hello')
})


router.post('/fetchCart', (req,res)=>{
    console.log('req userID', req.body.userID)
    User.find({ _id : req.body.userID }).then((response)=>{
        console.log(response)
        res.status(200).json({ data : response })
    }).catch((err)=>{
        console.log('err',err)
        res.status(300).json({ message : 'some thing went Wroing' })
    })
})


router.post('/getProduct', (req,res)=>{
    Product.findOne({ _id : req.body.productID }).then((response)=>{
        res.status(200).json({ response })
    }).catch((err)=>{
        res.status(300).json({ messsage : "something Went Wrong " })
    })
})
module.exports = router

