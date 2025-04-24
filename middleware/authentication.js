const User = require('../models/User')
const {UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    //getting the header
    const authHeader= req.headers.authorization

    //checking if the header and beader is present in the header
    if(!authHeader || authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError("Auth header or Bearer on present in the header")
    }

    const token = authHeader.split(" ")[1]

    try{
        //verifying if the token provided is valid
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //after verifying we are adding the user details to the request so it can be used later
        res.user = {userId: payload.userId, name: payload.name}
        next()
    }
    catch(error){
        throw new UnauthenticatedError("Something is wrong with the token verification")
    }
}