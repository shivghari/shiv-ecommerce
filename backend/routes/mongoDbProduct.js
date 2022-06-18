const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const bodyParser = require('body-parser')


router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


router.post('/',(req,res)=>{    
    Product.find({ _id : { $in: req.body.productIDs} }).then((response)=>{
        res.status(200).json({ response })
    }).catch((err)=>{
        res.status(300).json({ message : "Something Went Wrong" })
    })
})

module.exports = router