const express = require("express");
const checkoutRouter = express.Router();

const { getOrder, getPayment } = require("../controllers/checkout.controller.js");

checkoutRouter
  .post('/order', getOrder)
  .post('/payment', getPayment)

module.exports = checkoutRouter