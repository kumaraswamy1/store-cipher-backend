
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const secretKey = process.env['secretKey']


const authentication=async (req, res, next) =>{
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secretKey)
    console.log(decoded)
    console.log(token + " " + "authorization")
    req.user = { userID: decoded.userID }
    res.json({ success: true, token, username: userName })
    console.log(req.user)
    next()
  } catch (e) {
    return res.status(401).json({ success: false, message: "unauthorized token ", errorMessage: e.message })
  }
}

module.exports=authentication