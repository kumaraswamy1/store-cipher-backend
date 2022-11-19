
const { Wishlist } = require("../models/wishlist.model.js")

const getWishlist = async (wishlist) => {

  wishlist.products = wishlist.products.filter((product) => product.active);

  wishlist = await wishlist
    .populate({
      path: "products._id",
      select:
        "_id name author imageUrl ",
    })

  return wishlist.products.map((product) => {
    let wishlistItem = JSON.parse(JSON.stringify(product._id));
    return wishlistItem;
  });
};

const findWishlist = async (req, res) => {
  try {
    let { wishlist } = req;
    let wishlistItems = await getWishlist(wishlist);
    res.json({
      success: true,
      wishlist: wishlistItems
    });
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Unable to retrive the wishlist", errorMessage: err.message })
  }
}


const getWishlistItems = async (req, res) => {
  try {

    const { _id, action } = req.body
    const { wishlist } = req;
    const userProduct = wishlist.products.some(product => product._id == _id)

    for (const product of wishlist.products) {
      if (product._id == _id) {
        switch (action) {
          case "ADD":
            product.active = true
            break;
          case "REMOVE":
            product.active = false;
            break;
        }
      }
     
    }
    if (!userProduct) {
      wishlist.products.push({ _id })
    }
    await wishlist.save();
    res.status(200).json({success:true,wishlist});
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Unable to update wishlist", errorMessage: err.message })
  }
}




module.exports = { findWishlist, getWishlistItems }