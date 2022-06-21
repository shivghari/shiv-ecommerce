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
                count : 1,
                price : req.body.productPrice
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


router.post('/clearCart', (req,res)=>{
    console.log('userID', req.body.userID)

    User.updateOne({ _id : req.body.userID }, {$set : {
        cart : []
    }}).then((response)=>{
        res.status(200).json({ message : "user cart is Cleared" })
    }).catch((err)=>{
        res.status(300).json({ message : "something Went wrong" })
    })
})


router.post('/addCount', (req,res)=>{
    console.log('product ID',req.body.productID)
    console.log('user ID',req.body.userID)

    User.find({ _id : req.body.userID }).then((response)=>{
        var newArr = response[0].cart
        newArr.map((item)=>{
            if(item.productID === req.body.productID){
                item.count++
            }
        })
        User.updateOne({ _id : req.body.userID }, {$set : {
            cart : newArr
        }}).then((response)=>{
            res.status(200).json({ message : "Product Count Updated" })
            console.log(response)
        }).catch((err)=>{
            console.log(err,'err')
        })
    }).catch((err)=>{
        console.log(err,'err')
    })
})


router.post('/deductCount', (req,res)=>{
    console.log('product ID',req.body.productID)
    console.log('user ID',req.body.userID)

    User.find({ _id : req.body.userID }).then((response)=>{
        var newArr = response[0].cart
        newArr.map((item)=>{
            if(item.productID === req.body.productID){
                if(item.count > 0){
                    item.count--
                }else{
                    //for less than 0 product count
                    console.log('Fronthand Will Handle')
                }
            }
        })
        User.updateOne({ _id : req.body.userID }, {$set : {
            cart : newArr
        }}).then((response)=>{
            res.status(200).json({ message : "Product Count Updated" })
            console.log(response)
        }).catch((err)=>{
            console.log(err,'err')
        })
    }).catch((err)=>{
        console.log(err,'err')
    })
})


router.post('/deductProduct', (req,res)=>{
    User.find({ _id : req.body.userID }).then((response)=>{
        var newArr = response[0].cart
        console.log('new Arr', newArr)
        var LatestArr = newArr.filter((item)=>{
            if(item.productID != req.body.productID){
                return item
            }
        })
       User.updateOne({ _id : req.body.userID }, {$set : {
        cart : LatestArr
       }}).then((response)=>{
        res.status(200).json({ messag : "product Successfully Deducted from users cart" })
       }).catch((err)=>{
        res.status(300).json({ message : "Something Went Wrong...!" })
       })
    }).catch((err)=>{
        console.log('Soething Went Wrong..')
    })
})


router.post('/addTowish', (req, res)=>{
    User.find({ _id : req.body.userID }).then((result)=>{
        if(result[0].wishlist.includes(req.body.productID)){
            console.log('Product Already in wish list')
        }else{
            User.updateOne({ _id : req.body.userID }, {"$push" : {
                wishlist : [req.body.productID]
            } }).then((response)=>{
                res.status(200).json({ message : "product Added to the wish list " })
            }).catch((err)=>{
                res.status(300).json({ message : "something went Wrng" })
                console.log(err)
            })
        }
    }).catch((err)=>{
        console.log(err)
    })
})


router.post('/removeFromwish', (req,res)=>{
    User.findOne({ _id : req.body.userID }).then((response)=>{
        var newArr = response.wishlist
        var LatestWishList = newArr.filter((item)=>{
            if(item !== req.body.productID){
                return item
            }
        })
        User.updateOne({ _id : req.body.userID }, {$set : {
            wishlist : LatestWishList
        }}).then((result)=>{
            res.status(200).json({ message : "product Removed from WishList" })
        }).catch((err)=>{
            res.status(300).json({ mnessage : "Something Went Wrong" })
        })
    }).catch((err)=>{
        console.log(err,'err')
    })
})


router.post('/getWishListUser', (req,res)=>{
    User.findOne({ _id : req.body.userID }).then((response)=>{
        res.status(200).json({ wishlist : response.wishlist })
    }).catch((err)=>{
        res.status(300).json({ message :  "something Went Wrong"})
    })
})


router.post('/checkout', (req,res)=>{
    console.log(req.body.itemList)
    console.log(req.body.userID)
    User.updateOne({ _id : req.body.userID }, {$push : {
        orderhistory : req.body.itemList
    }}).then((response)=>{
        console.log(response)
        res.status(200).json({ message : "product added to order Histoory" })
    }).catch((err)=>{
        console.log(err)
        res.status(300).json({ message : "Something Went Wrong" })
    })
})

router.post('/getoOrderHistoryUser', (req,res)=>{
    User.findOne({_id : req.body.userID}).then((response)=>{
        console.log(response.orderhistory)
        res.status(200).json({ orderhistory : response.orderhistory })
    }).catch((err)=>{
        console.log(err,'err')
        res.status(300).json({ message : "something Went Wrong" })
    })
})

module.exports = router
