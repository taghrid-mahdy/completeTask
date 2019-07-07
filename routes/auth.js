const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const joi = require('joi');
const { User } = require('../models/usermodel');

var generatedtoken = 'any string';

router.post('/', async (req,res) =>{
    
    const {error } = validateuser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let requireduser = await User.findOne({ username : req.body.username})
    if(!requireduser) return res.status(400).send('invalid username or password..');

    if(requireduser.password != req.body.password) {
        return res.status(400).send('invalid username or password..')
    }

    const tokenresult = jwt.sign({ _id : requireduser._id}, config.get('jwtPrivateKey'));
    generatedtoken = tokenresult;
    res.header('x-auth-token',tokenresult).send(tokenresult);
    res.send(tokenresult);
});

router.put('/:id', async (req,res) =>{
    
    if(generatedtoken != 'any string'){
    const userupdated = await User.findByIdAndUpdate(req.params.id,req.body)
        .catch(err => res.send(err.message));
    }
    else {res.status(401).send('the token is not found')}
    
    res.send('user is updated');
});

function validateuser (user){
    const schema = {
        username : joi.string().min(5).max(50).required(),
        password : joi.string().min(5).max(255).required()
    };
    return joi.validate(user,schema);
}

module.exports= router;