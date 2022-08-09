const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const wishlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  products: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: "products"
    },
    active: { type: Boolean, default: true }
  }]
});
const Wishlist = model("Wishlist", wishlistSchema);
module.exports = { Wishlist };