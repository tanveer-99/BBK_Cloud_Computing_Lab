import express from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
const router = express.Router()

import User from '../models/User.js'

import { registerValidation, loginValidation } from '../validations/validation.js'



router.post('/register', async(req, res)=> {
    const userData = req.body

    // validation 1: check if the user input is in correct format
    const {error} = registerValidation(userData)
    if(error) {
        return res.status(400).send({message: error['details'][0]['message']})
    }

    // validation 2: check if user exists
    const userExists = await User.findOne({email:userData.email})
    if(userExists) {
        return res.status(400).send({message: "User already exists"})
    }

    // hashed password
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(userData.password, salt)

    const newUser = new User({
        username: userData.username,
        email: userData.email,
        password: hashedPassword
    })
    //test the hashed password part
    try {
        const savedData = await newUser.save()
        res.send(savedData)
    } catch (error) {
        res.status(400).send({message: error})
    }
    
})



router.post('/login', async (req, res)=>{
    const userData = req.body

    // validation 1: check if the user input is in correct format
    const {error} = loginValidation(userData)
    if(error) {
    return res.status(400).send({message: error['details'][0]['message']})
    }

    // validation 2: check if user exists
    const user = await User.findOne({email:userData.email})
    if(!user) {
        return res.status(400).send({message: "User doesn't exists"})
    }

    // validation 3: check the password
    const passwordValidation = bcryptjs.compareSync(userData.password, user.password)
    if (!passwordValidation) {
        return res.status(400).send({message: "Password is wrong!"})
    }
    
    // generate an auth-token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({"auth-token":token})

})


export default router