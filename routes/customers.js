const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const { Customer, validate } = require('../models/customer');
const { Genre } = require('../models/genre');
const router = express.Router();

router.get('/',async(req,res)=>{
    const customer = await Customer.find();
    res.send(customer);
});

router.post('/',async(req,res)=>{
    const result = validate(req.body);
    if(result.error){
        res.send(400).send(error.details[0].message);
        return;
    }
    const genre = await Genre.findById(re.body.genreId);
    if(!genre) return res.status(400).send('invalid genre');

    const customer = new Customer({
        name:req.body.name,
        phone:req.body.phone
    });
    await customer.save();
    res.send(customer);
});

module.exports = router;
