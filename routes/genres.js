const winston = require('winston');
const auth = require("../middileware/auth");
const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const { Genre, validate } = require("../models/genre");
const router = express.Router();

router.get("/", async (req, res) => {
    
    const genre = await Genre.find();
    res.send(genre);
    
});

router.post("/", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    res.send(400).send(error.details[0].message);
    return;
  }
  const genre = new Genre({
    name: req.body.name,
  });
  await genre.save();
  res.send(genre);
});

module.exports = router;
