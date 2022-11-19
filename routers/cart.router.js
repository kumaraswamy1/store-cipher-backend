const express = require("express");
const cartRouter = express.Router();
const getUserCart = require("../middlewares/cart")
const { findCart, getCartItems, removeCartItems } = require("../controllers/cart.controller.js");

cartRouter.use(getUserCart)
cartRouter
  .get("/", findCart)
  .post("/", getCartItems)
  .post("/remove", removeCartItems)

module.exports = cartRouter