const { Cart } = require("../models/cart.model.js")
const getCart = async (cart) => {
  cart.products = cart.products.filter((product) => product.active);

  cart = await cart
    .populate({
      path: "products._id",
      select:
        "_id name author imageUrl price",
    })
  return cart.products.map((product) => {
    let cartItem = JSON.parse(JSON.stringify(product._id))
    Object.assign(cartItem, { quantity: product.quantity });
    return cartItem;
  });
};

const findCart = async (req, res) => {
  try {
    let { cart } = req;
    let cartItems = await getCart(cart);
    res.json({
      success: true,
      cart: cartItems
    });
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Unable to retrive the cart", errorMessage: err.message })
  }
}


const getCartItems = async (req, res) => {
  try {

    const { _id, quantity, action } = req.body
    const { cart } = req;
    const userProduct = cart.products.some(product => product._id == _id)

    for (const product of cart.products) {
      if (product._id == _id) {
        switch (action) {
          case "ADD":
            product.quantity += quantity
            break;
          case "SUB":
            product.quantity -= quantity
            break;
        }
      }
    }
    if (!userProduct) {
      cart.products.push({ _id, quantity })
    }
    await cart.save();
    res.status(200).json({success:true,cart});
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Unable to update cart item", errorMessage: err.message })
  }
}


const removeCartItems = async (req, res) => {
  try {

    const { _id } = req.body
    const { cart } = req;
    const userProduct = cart.products.some(product => product._id == _id)

    for (const product of cart.products) {
      if (userProduct) {
        if (product._id == _id) {
          product.active = false;
          product.quantity = 0;
        }
      }
    } await cart.save();
    res.status(200).json({success:true,cart});
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Unable to remove cart item", errorMessage: err.message })
  }
}


module.exports = { findCart, getCartItems, removeCartItems }