const mongoose = require('mongoose')

var orderhistory = mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "User"
    },
    orderlist : [{ 
        productID : {type : mongoose.Schema.Types.ObjectId, ref : "Product"} , 
        count : Number, 
        price : String 
    }],
    totalamount : String,
    paymentid : String,
},
{timestamps: true}
)

module.exports = mongoose.model("Orderhistory", orderhistory)




