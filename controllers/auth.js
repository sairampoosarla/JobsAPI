const User = require('../models/User.js')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')

//creating a user based on data passed on the request body
const register = async (req, res) => {

    // password hashing has been moved to pre code of model
    //taking the parameters passed
    //const {name, email, password} = req.body

    //creating the salt and uring it to created password
    //const salt = await bcrypt.genSalt(10)
    //const hashPassword = await bcrypt.hash(password, salt)

    //saving the data into a dict
    //const tempUser = {name, email, password:hashPassword}
    
    //creating the user
    const user = await User.create({...req.body})
    ///returning the creareted user
    res.status(StatusCodes.CREATED).json({user})
}

const login = async (req, res) => {
    res.send(' login User')
}

module.exports = { register, login }