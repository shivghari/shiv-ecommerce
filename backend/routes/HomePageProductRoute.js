const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const DisplayProductSchema = require('../models/homeControl')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/featureproductgetAllProducts', (req, res) => {
    DisplayProductSchema.find({ category: "Featured Product" }).then((response) => {
        res.status(200).json({ message: "data Found", response })
    })
})

router.post('/latestgetAllProducts', (req, res) => {
    DisplayProductSchema.find({ category: "Latest Product" }).then((response) => {
        res.status(200).json({ message: "data Found", response })
    })
})

router.post('/topcategorygetAllProducts', (req, res) => {
    DisplayProductSchema.find({ category: "Top Category" }).then((response) => {
        res.status(200).json({ message: "data Found", response })
    })
})

module.exports = router