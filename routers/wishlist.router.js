const express = require("express");
const { Cart } = require("../models/cart.model.js")
const cartRouter = express.Router();

const mongoose = require('mongoose');

cartRouter.get("/", async (req, res,) => {
  try {
    const { userId } = req.body.user;
    const userCart = await Cart.findOne({ userId })
    if (!userCart) {
      const cart = new Cart({ userId, products: [] })
      const newCart = cart.save()
      res.json({ newCart })
    }
    if (userCart) {
      res.json({ userCart })
    }
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
})
cartRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    console.log({ userId })
    const userChecks = await Cart.findOne({ userId }).populate({
      path: "products._id",
      select:
        "name image price category inStock fastDelivery ",
    })
    res.send(userChecks.products)
  } catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
})


cartRouter.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    const { _id = req.body.cart;
    const userCheck = await Cart.findOne({ userId })
    console.log(userCheck)
    const userProduct = userCheck.products.some(product => product._id == _id)
    console.log(userProduct)
    for (const product of userCheck.products) {

      if (product._id == _id) {
      product.active = true;
      }
      console.log(product)
    }
    if (!userProduct) {
      userCheck.products.push({ _id })
    }
    await userCheck.save();
    res.status(200).send(userCheck);
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
})


cartRouter.post("/:userId/remove", async (req, res) => {
  try {
    const { userId } = req.params
    const { _id} = req.body.cart;
    const userCheck = await Cart.findOne({ userId })
    console.log(userCheck)
    const userProduct = userCheck.products.some(product => product._id == _id)
    console.log(userProduct)
    for (const product of userCheck.products) {

      if (product._id == _id) {
          product.active = false;
      product.quantity = 0;
      }
      console.log(product)
    }await userCheck.save();
   res.status(200).send(userCheck);
  
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
})



module.exports = cartRouter