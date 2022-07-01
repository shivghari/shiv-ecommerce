const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");

const Product = require("../models/product");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/addRating", (req, res) => {
  req.body.ratingData.map((item) => {
    Product.find({ _id: item.productID }, { rating: 1, ratevotecount: 1 })
      .then((response) => {
        var newRating;
        if (response[0].rating <= 0) {
          newRating = item.rating;
        } else {
          newRating = (response[0].rating + parseInt(item.rating)) / 2;
        }
        Product.updateOne(
          { _id: item.productID },
          {
            $set: {
              rating: newRating,
              ratevotecount: response[0].ratevotecount + 1,
            },
          }
        )
          .then((result) => {
            res.status(200).json({ message: "Ratting Succesful" });
          })
          .catch((err) => {
            console.log(err, "err");
            res
              .status(300)
              .json({ message: "Something Went Wrong in Product Rating" });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
