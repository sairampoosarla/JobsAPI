const User = require('../models/User.js')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
const {BadRequestError, UnauthenticatedError} = require('../errors/index.js')

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
    //here we are using the method defined in the user schema to create a json token
    const token = user.createJWT()
    ///returning the creareted user
    res.status(StatusCodes.CREATED).json({user: {name:user.name}, token:token})
}

const login = async (req, res) => {
    const {email, password} = req.body

    //checking if both email and password are provided
    if (!email || !password){
        throw new BadRequestError("Please provide email and password")
    }

    //find the user with the email provided
    const user = await User.findOne({email})

    //checking if the user is present
    if(!user){
        throw new UnauthenticatedError("Invalid Credentials")
    }

    //as the user is present sending the tken back
    const token = user.createJWT()

    res.status(StatusCodes.OK).json({user: {name:user.name}, token:token})
    
    //res.send("user found")
}

module.exports = { register, login }