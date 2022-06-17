const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.post('/',(req,res)=>{

    const arr = [ '62a871c8ff85b82a31a38230', '62a872a9ff85b82a31a38232', '62a872cdff85b82a31a38234']
    
    Product.find({ _id : { $in: arr} }).then((response)=>{
        res.status(200).json({ response })
    }).catch((err)=>{
        res.status(300).json({ message : "Something Went Wrong" })
    })
})

module.exports = router