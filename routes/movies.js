const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const router = express.Router();

router.get('/',async(req,res)=>{
    const movie = await Movie.find();
    res.send(movie);
});

router.post('/',async(req,res)=>{

    const result = validate(req.body);
    if(result.error){
        res.send(400).send(result.error.details[0].message);
        return;
    }
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('invalid genre');

    const movie = new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
});

module.exports = router;
