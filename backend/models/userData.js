const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    username : {
        type : String,
        unique : true,
        required : true
    },
    password: String,
    // mobile: {
    //     type : String,
    //     unique : true
    // },
    // address : String,
    // profileImage : String
})

module.exports = mongoose.model("User", UserSchema)