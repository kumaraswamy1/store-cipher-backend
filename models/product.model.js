const mongoose = require("mongoose");
const {Schema} =mongoose;


const productSchema =Schema(
  {
  name: { 
    type: String, 
     unique: "The book name is already added,Book name should be Unique",
    required: "Cannot enter a book without name, please enter the book name "
  },
    author: { 
    type: String, 
    required: "Cannot enter a book without author, please enter the author name"
  },
    imageUrl:{
      type:String,
      required:"Cannot enter a book without image,please enter the imageUrl of the book"
    }, price: {
    type: Number,
    required: "Cannot enter a book without price, please enter the price of the book"
  },

 inStock: {
   type:Boolean,
   required:"specify the stock availability before adding it to the list"
 },
         isFastDelivery: {
   type:Boolean,
   required:"specify the type of delivery option available before adding it to the list"
 },
     category: { 
    type: String, 
    required: "Cannot enter a book without category id, please enter the category name",ref:'categories'
  },
 
  description: {
    type: String,
    minLength: [300, "Description must be 300 characters or more"]
  }
  }, { timestamps: true }
  );


const Product = mongoose.model("products", productSchema);

module.exports = { Product }