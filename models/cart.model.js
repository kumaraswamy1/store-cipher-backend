const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  products: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: "products"
    },
    quantity: Number,
    active: { type: Boolean, default: true }
  }]
});

const Cart = model("Cart", cartSchema);

module.exports = { Cart };