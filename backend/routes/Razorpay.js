const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const shortid = require("shortid");
const Razorpay = require("razorpay");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const payment_capture = 1;
  const amount = req.body.amount;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  var instance = new Razorpay({
    key_id: "rzp_test_uPoswECZOQZFCj",
    key_secret: "2n92VbCPpoUoqIqUz6TgVK4n",
  });

  try {
    const response = await instance.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
