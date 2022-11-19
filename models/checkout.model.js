const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const checkoutSchema = new Schema({
  payment_id: String, order_id: String
});
const Checkout = model("Checkout", checkoutSchema);

module.exports = { Checkout };