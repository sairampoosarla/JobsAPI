const User = require('../models/User.js')
const {StatusCodes} = require('http-status-codes')

//creating a user based on data passed on the request body
const register = async (req, res) => {
    //creating the user
    const user = await User.create({...req.body})
    ///returning the creareted user
    res.status(StatusCodes.CREATED).json({user})
}

const login = async (req, res) => {
    res.send(' login User')
}

module.exports = { register, login }