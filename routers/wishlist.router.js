const express = require("express");
const wishlistRouter = express.Router();
const getUserWishlist = require("../middlewares/wishlist")
const { findWishlist, getWishlistItems } = require("../controllers/wishlist.controller.js");

wishlistRouter.use(getUserWishlist)
wishlistRouter
  .get("/", findWishlist)
  .post("/", getWishlistItems)




module.exports = wishlistRouter