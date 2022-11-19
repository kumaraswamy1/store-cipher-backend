const express = require("express");

const productRouter = express.Router();

const { getProducts } = require("../controllers/product.controller.js");

productRouter.get("/", getProducts);

module.exports = productRouter
