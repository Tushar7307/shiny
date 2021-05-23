const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.find().sort("name");
  res.send(user);
});

router.post("/", async (req, res) => {

  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

//   let user = User.find({email:req.body.email});
//   if (user) {
//         return res.status(400).send("user is already registered");
//   }

  user = new User(_.pick(req.body, ['name','email','password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res.header('x-auth-token',token).send(_.pick(user, ['_id','name','email']));
});

module.exports = router;