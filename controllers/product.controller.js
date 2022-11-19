
const { Product } = require("../models/product.model.js")
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
      message: "Unable to get the list of products"
    })
  }
}


module.exports = { getProducts }