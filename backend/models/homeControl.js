const mongoose = require('mongoose')

var DisplayProductSchema = new mongoose.Schema({
    prouctname : {type : String},
    image : {type : String},
    desc : {type : String},
    category : {type : String, 
        required : true},
    tags : {type : String},
    tax : {type : String},
    price : {type : String},
    costofitem : {type : String},
    stakedprice : {type : String},
})

module.exports = mongoose.model("DisplayProductSchema", DisplayProductSchema)