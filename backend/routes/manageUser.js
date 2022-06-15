const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
const router = express.Router()
const multer = require('multer');
const upload = multer({dest : 'uploads'})
const mongoose = require('mongoose');
const User = require('../models/userData')


// mongoose.connect("mongodb+srv://shivghariwala:shiv21112@cluster0.iaksp.mongodb.net/ecom")
// var db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'));

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/getAlluser', (req,res)=>{
    User.find().then((response)=>{
        res.status(200).json({ message : "Data Fetched", response})
    })
})

router.post('/makeAdmin', (req,res)=>{
    User.updateOne({ _id : req.body.userID }, { $set : {
        role : "admin"
    }}).then((response)=>{
        res.status(200).json({ message : "Alert : New Admin Added" })
    }).catch((err)=>{
        res.status(300).jason({ message : "Admin Not Updated..!" })
    })
})


router.post('/makeUser', (req,res)=>{
    User.updateOne({ _id : req.body.userID }, { $set : {
        role : "user"
    }}).then((response)=>{
        res.status(200).json({ message : "Alert : New Admin Added" })
    }).catch((err)=>{
        res.status(300).jason({ message : "Admin Not Updated..!" })
    })
})

module.exports = router