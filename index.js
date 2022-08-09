const express = require('express');
const productRouter = require("./routers/product.router")
const cartRouter = require("./routers/cart.router")
const userRouter = require("./routers/user.router")
const { intialDbConnection } = require("./db/db.connect.js")
const app = express();
const bodyParser = require('body-parser')
var cors = require('cors');



var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json());

intialDbConnection()

app.use('/products', productRouter)
app.use('/user', userRouter)
app.use('/cart', cartRouter)


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