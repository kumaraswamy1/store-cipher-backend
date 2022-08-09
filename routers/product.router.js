const express=require("express");

const productRouter =express.Router();

const productController = require("../controllers/product.controller.js");

productRouter.get("/", productController.getProducts);


// .post(async (req,res)=>{
//   try {
//      const product=req.body
//     const newData= new Product(product)
// const products = await newData.save()
//   res.json({success:true,products })
//   }
//    catch (err) {
//      res.status(500).json({ success: false, message: "Not working",errorMessage:err.message})
//   }
// });


// productRouter.use("/:id",authCheck)

// productRouter.param("productId",async(req,res,next,productId)=>{
//   try{
//     const product=await Product.findById(productId)
//     if(!product){
//       return 
//       res.status(500).json({success: false, message: "Could not find product",errorMessage:err.message})
//     }
//     req.product= product
//     next()
//   }
//  catch (err) {
//      res.status(400).json({ success: false, message: "error while reciving the product",errorMessage:err.message})
//   }
// })


// productRouter.route('/:productId')

// .get((req,res)=>{
//   let {product} = req
//   product.__v=undefined
//   // res.json({product,welcome:req.user.username})
//     res.json({success:true,product})
// })



//   .delete(async (req,res)=>{

//  let {product} =req;

//  product = await product.delete();
//   res.json({success:true,message:"product deleted"})
// })


module.exports=productRouter
