const mongoose = require('mongoose')

var ProductSchema = new mongoose.Schema({
    prouctname : {type : String},
    image : {type : String},
    desc : {type : String},
    category : {type : String},
    tags : {type : String},
    tax : {type : String},
    price : {type : String},
    costofitem : {type : String},
    stakedprice : {type : String},
    types : {type : String}
})

module.exports = mongoose.model("Product", ProductSchema)