const { Wishlist } = require("../models/wishlist.model.js")
const getUserWishlist = async (req, res, next) => {
  try {
  
    const { user } = req;

    let wishlist = await Wishlist.findOne({ userId: user._id })

    if (!wishlist) {
      wishlist = new Wishlist({ userId: user._id, products: [] })
      wishlist = await wishlist.save()
      
    } req.wishlist = wishlist

    next()
  } catch (e) {
    return res.status(500).json({ success: false, message: "Unable to retrive wishlist details", errorMessage: e.message })
  }
}

module.exports = getUserWishlist