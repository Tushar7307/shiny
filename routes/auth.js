const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=>{

    const result = validate(req.body);
    if(result.error)return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(!user)return res.status(400).send('invalid email or password');
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('invalid email or password');
    
    const token = user.generateAuthToken();
    res.send(token);
});

function validate(user){
    const schema = Joi.object({
        email:Joi.string().min(5).max(1024).required(),
        password:Joi.string().min(6).max(10024)
    });
    return schema.validate(user);
}

module.exports = router;