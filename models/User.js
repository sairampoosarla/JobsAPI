const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//this is the schema we are defining for each object to have before they can be saved in the DB
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide your name'],
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        required: [true, 'Please provide your email'],
        //this is the regex for checking a valid email address
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
        //we are saing the email address needs to be unique for a user
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please provide your password'],
        minlenght: 6,
    }

})

// this is a pre-code 
// this pre-code will run before the document is saved in the database
// here insted of running the hash in controller we are utlizing the pre-code and hashing the password
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    console.log("data has been pushed to the server from the function")
    next()
})

// this is adding function to the schema
// where this function is returning the name
UserSchema.methods.getName = function () {
    return this.name
}

// this is adding function to the schema
// where this function is creating a returing the jwt token
UserSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id, name:this.name}, 'secret', {expiresIn:'30d'})

}

module.exports = mongoose.model('User', UserSchema)