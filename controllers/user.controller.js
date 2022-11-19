const { User } = require("../models/user.model.js")

const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const secretKey = process.env['secretKey']




const registerUser = async (req, res) => {
  try{const { name, username, email, password } = req.body.user;
  if (!(email && password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }
  const usernameExists = await User.findOne({ email: email.toLowerCase() });
  const emailExists = await User.findOne({ email: email.toLowerCase() });
  if (emailExists) {
    return res.status(409).json({ success: false, message: "Email already Exist. Please login" });
  }
  if (usernameExists) {
    return res.status(409).json({ success: false, message: "Username already taken" });
  }
  else {
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      name,
      email: email.toLowerCase(),
      password: passwordEncrypted
    });
    return res.json({ success: true, message:"User succuessfully registeres" });
  }}
  catch(error){
     res.status(500).json({
      success: false,
      message: "Unable to register user",
      errMessage: err.message,
    });
  }
}

const findUser = async (req, res) => {
  const { username, password } = req.body
  if (!(username && password)) {
    res.status(400).send("All input is required");
  }
  const user = await User.findOne({ username });
  if(user){
  if ( bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ _id: user._id, username: user.username }, secretKey, { expiresIn: "24h" })
    res.json({ success: true, token })
  }else {
      res.status(401).json({
        success: false,
        message: "Username and password does not match",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Username or password is incorrect",
    });
  }
}


const getUser = async (req, res) => {
  try {
    const userId = req;
    const user = await User.findOne({ userId });
    res.json({ success: true,user })
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Unable to retrive user data", errorMessage: err.message })
  }
}


module.exports = { registerUser, findUser, getUser }