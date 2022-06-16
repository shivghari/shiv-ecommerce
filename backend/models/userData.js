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
    role : {
        type : String,
        default : "user"
    },
    mobile: {
        type : String,
    },
    recidencyaddress : {
        type :String
    },
    deliveryaddress :{
        type : String
    }

    // profileImage : {
    //     type : String
    // }
})

module.exports = mongoose.model("User", UserSchema)