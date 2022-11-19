const express = require('express');

const app = express();
const bodyParser = require('body-parser')
var cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());
const { intialDbConnection } = require("./db/db.connect.js")
intialDbConnection()
const userRouter = require("./routers/user.router")
const productRouter = require("./routers/product.router")
const wishlistRouter = require("./routers/wishlist.router")
const cartRouter = require("./routers/cart.router")
const checkoutRouter = require("./routers/checkout.router")

const authentication = require("./middlewares/authentication");

app.use('/user', userRouter)
app.use('/products', productRouter)
app.use('/cart', authentication, cartRouter)
app.use('/wishlist', authentication, wishlistRouter)
app.use('/checkout', checkoutRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(404).json({ success: false, message: "page not found", errorMessage: err.message })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: "page not found", errorMessage: err.message })
})


app.listen(3000, () => {
  console.log('server started');
});