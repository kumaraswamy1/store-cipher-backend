
const { Checkout } = require("../models/checkout.model.js")
const Razorpay = require('razorpay');
const crypto = require("crypto");

var instance = new Razorpay({
  key_id: process.env['key_id'],
  key_secret: process.env['key_secret']

})
const getOrder = function(req, res) {
  const { amount } = req.body
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "order_rcptid_1",
    payment_capture: 1
  };
  instance.orders.create(options, function(err, order) {
    if (err) {
      return res.status(500).json(" Transaction was not intiated.");
    }
    else {
      res.json({ orderId: order.id, totalPrice: amount })
    }
  })
}

const getPayment = function(req, res) {
  const { user } = req;
  const { razorpay_payment_id, razorpay_signature, razorpay_order_id } = req.body
  let confirmationIds = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', instance.key_secret)
    .update(confirmationIds.toString())
    .digest('hex');
  if (expectedSignature === razorpay_signature) {
    const checkout = new Checkout({
      razorpay_payment_id
    });
    checkout.save(function(err, savedtransac) {
      if (err) {
        return res.status(500).json(" Transaction not saved.");
      }else
      res.json({
success:true,message: "Transaction Saved" });
            }  
      
    )
  }

}
module.exports = { getOrder, getPayment }