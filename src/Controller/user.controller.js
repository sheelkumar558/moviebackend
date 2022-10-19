
const User = require("../Model/user.model")
const { body, validationResult } = require('express-validator');

const register = async (req, res) => {
    try{
        let user = await User.findOne({email : req.body.email})
   

        //checking email
        if(user){
            return res.status(400).send({message : "Email already exists" })
        }

        // if new user, create it or allow to register;
        user = await User.create(req.body);

        return res.status(200).send(user);
    }
    catch(err){
        res.status(400).send({message : err.message})
    }
}


const login = async (req, res) => {
    try{
        
        const user = await User.findOne({email : req.body.email})
        //checked if mail exists
        if(!user){
            return res.status(400).send("Wrong Email or Password")
        }

        //if email exists, check password;
        const match = user.checkPassword(req.body.password)

        // if it doesn't match
        if(!match){
            return res.status(400).send({message : "Wrong Email or Password"})
        }

        // if it matches
  
        return res.status(200).send(user);


    }
    catch(err){
        res.status(400).send({message : err.message})
    }
}

module.exports = {register,login}

