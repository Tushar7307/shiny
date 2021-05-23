const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/',async(req,res)=>{
    const rental = await Rental.find().sort('-dateOut');
    res.send(rental);
});

router.post('/',async(req,res)=>{
    const result = validate(req.body);
    if(result.error)return res.status(400).send(result.error.details[0].message);

    const customer = await Customer.findById(req.body.customerId)
    if(!customer)return res.status(400).send('invalid customer');

    const movie = await Movie.findById(req.body.movieId)
    if(!movie)return res.status(400).send('invalid movie');

    if(movie.numberInStock === 0)return res.status(400).send('no movie found');

    const rental = new Rental({
        customer:{
            _id : customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            name:movie.name,
            dailyRentalRate:movie.dailyRentalRate,
            numberInStock:movie.numberInStock
        }
    });
    try{
        new Fawn.Task()
        .save('rental', rental)
        .update('movie',{_id:movie._id},
        {
            $inc:{movieInStock:-1}
        })
        .run();
        res.send(rental);
    }
    catch(ex){
        res.status(500).send('something failed');
    }  
});

module.exports = router;