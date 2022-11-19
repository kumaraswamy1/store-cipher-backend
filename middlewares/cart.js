const { Cart } = require("../models/cart.model.js")
const getUserCart = async (req, res, next) => {
  try {
   const { user } = req;
  
    let cart = await Cart.findOne({ userId: user._id })
    if (!cart) {
      cart = new Cart({ userId: user._id, products: [] })
      cart = await cart.save()
     
    } req.cart = cart

    next()
  } catch (e) {
    return res.status(500).json({ success: false, message: "Unable to retrive cart details", errorMessage: e.message })
  }
}

module.exports = getUserCart