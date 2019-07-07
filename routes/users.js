const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
//const emailValidator = require('email-validator');
//const multer = require('multer');
const {User ,validate} = require('../models/usermodel');



/*
async function createuser (){

    const user = new User ({
        username: 'some user',
        email : 'someuser@hotmail.com',
        password : 'useruser',
        firstname : 'user first name',
        lastname : 'user last name' 
    });

    const result = await user.save();
    console.log(result);

}
createuser();
*/



router.get('/', async (req,res) =>{
    const users = await User.find();
    res.send(users);
});
router.post('/', async (req,res) =>{
    let newuser = new User({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        firstname : req.body.firstname,
        lastname : req.body.lastname
    });
    newuser = await newuser.save()
        .catch(err => res.status(400).send(err.message));

    res.send(newuser);
});

router.put('/:id', async (req,res) =>{
    
    //const model = new User(_.extend(req.body, { _id: req.params.id }));
    
    const userupdated = await User.findByIdAndUpdate(req.params.id,req.body)
        .catch(err => res.send(err.message));
    
    res.send(userupdated);
    
    /*const usertobeUpdated = await User.findById(req.params.id)
        .catch(err => res.status(404).send(err.message));
    
    const updateduser = await User.update(usertobeUpdated, req.body)
        .catch(err => res.status(400).send(err.message));

    res.send(updateduser);
    */
});
router.delete('/:id', async (req,res) =>{
    deletedUser = await User.findByIdAndRemove(req.params.id)
        .catch(err => res.status(404).send(err.message));
    
    res.send(deletedUser);
});

router.get('/:id', async (req,res) =>{
    Retuser = await User.findById(req.params.id)
        .catch(err => res.status(404).send(err.message));
    
    res.send(Retuser);
});

module.exports.router = router;
module.exports.User = User ;