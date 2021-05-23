const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true,
                min:5,
                max:50
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                required:true
            }
        }),
        required:true
    },
    movie:{
        type:new mongoose.Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                min:5
            },
            dailyRentalRate:{
                type:Number,
                min:0,
                required:true
            },
            numberInStock:{
                type:Number,
                min:0,
                required:true
            }
        }),
        required:true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }
});

const Rental = mongoose.model('Rental',rentalSchema);

function validateRental(rental){
    const schema = Joi.object({
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required()
    });
    return schema.validate(rental);
}

exports.validate = validateRental;
exports.Rental = Rental;