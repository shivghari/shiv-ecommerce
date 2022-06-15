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
const DisplayProductSchema = require('../models/homeControl')

const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/jwtVerificationMid');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/addproduct', upload.single('productImg'),(req, res)=>{
    

    if(req.file){
        let fileType = req.file.mimetype.split('/')[1]
        let newFilename = req.file.filename + '.'+ fileType        
        fs.rename(path.resolve(process.cwd(), `uploads/${req.file.filename}`), path.resolve(process.cwd(), `uploads/${newFilename}`), (data)=>{
            console.log('File Uploaded')
        })

        var newProduct = new DisplayProductSchema({
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

router.post('/getAllProducts', (req,res)=>{
    DisplayProductSchema.find({ category : "Latest Product"}).then((response)=>{
        res.status(200).json({message : "data Found", response})
    })
})


router.post('/getOneProduct', (req,res)=>{
    console.log(req.body)
    DisplayProductSchema.find({ _id : req.body.productID}).then((response)=>{
        console.log(response)
        res.status(200).json({message : "data Found", response})
    })
})

router.post('/editProduct', upload.single('productImg'),(req,res)=>{
    if(req.file !== undefined){
        let fileType = req.file.mimetype.split('/')[1]
        let newFilename = req.file.filename + '.'+ fileType        
        fs.rename(path.resolve(process.cwd(), `uploads/${req.file.filename}`), path.resolve(process.cwd(), `uploads/${newFilename}`), (data)=>{
            console.log('File Uploaded')
        })
        DisplayProductSchema.updateOne({_id : req.body.productId}, {$set : {
           "prouctname" : req.body.productName,
           "image" : newFilename,
           "desc" : req.body.Desc,
           "category" : "Latest Product",
           "tags" : req.body.tags,
           "tax" : req.body.tax,
           "price" : req.body.netprice,
           "costofitem" : req.body.costofItem,
           "stakedprice" : req.body.stakedPrice,
       }}).then((response)=>{
        res.status(200).json({ message : "Product Updated", response})
       }).catch((err)=>{
        res.status(300).json({ message : "Something Went Wrong..!!" })
       })

    }
    else{
        DisplayProductSchema.updateOne({_id : req.body.productId}, {$set : {
            "prouctname" : req.body.productName,
            "desc" : req.body.Desc,
            "category" : "Latest Product",
            "tags" : req.body.tags,
            "tax" : req.body.tax,
            "price" : req.body.netprice,
            "costofitem" : req.body.costofItem,
            "stakedprice" : req.body.stakedPrice,
        }}).then((response)=>{
         res.status(200).json({ message : "Product Updated" })
        }).catch((err)=>{
         res.status(300).json({ message : "Something Went Wrong..!!" })
        })
    }
})


router.post('/deleteProduct', (req,res)=>{
    console.log(req.body)
    DisplayProductSchema.deleteOne({ _id : req.body.editItemId}).then((response)=>{
        console.log(response)
        res.status(200).json({message : "data Found", response})
    })
})


module.exports = router