const { User } = require("../models/user.model.js")
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const secretKey = process.env['secretKey']

var app = express();
const registerUser=async (req, res) =>{
  const { userName, name, email, password } = req.body.user;
if (!(email && password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }
const oldUser = await User.findOne({ email: email.toLowerCase() });
if(oldUser) {
return res.status(409).send("User Already Exist. Please Login");
  }
  else {
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);
    const user = await User.create({
      userName,
      name,
      email: email.toLowerCase(),
      password: passwordEncrypted
    });
    return res.json({ success: true, username: userName });
  }
}

const findUser = async (req, res) => {
const {userName, password } = req.body.user
  if(!(userName && password)) {
    res.status(400).send("All input is required");
  }
  const user = await User.findOne({ userName});
  if (user &&  bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userID: user._id }, secretKey, { expiresIn: "24h" })
    res.json({ success: true, token,userName:userName , userId: user._id})
    console.log(token)
  }
}


const getUser = async (req, res) => {
  try {
    const { userID } = req.user;
    const user = await User.findById(userID);
    res.json({ name: user.name })
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
}


module.exports = { registerUser, findUser, getUser }