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
    types : {type : String},
    rating : {type : Number, default : 0},
    ratevotecount : {type : Number, default : 0}
})

module.exports = mongoose.model("Product", ProductSchema)