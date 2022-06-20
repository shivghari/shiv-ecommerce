const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const bodyParser = require('body-parser')
const DisplayProductSchema = require('../models/homeControl')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


router.post('/',(req,res)=>{    
    var dataArr = []
    Product.find({ _id : { $in: req.body.productIDs} }).then((response)=>{
        var newArr1 = [...response]
        DisplayProductSchema.find({ _id: {$in : req.body.productIDs} }).then((result)=>{
            var newArr2 = [...result]
            dataArr = [...newArr1, ...newArr2]
            res.status(200).json({ cartdata : dataArr })
        })
    })
    .catch((err)=>{
        console.log(err,'err')
        res.status(300).json({ message : "Something Went Wrong" })
    })
})

module.exports = router