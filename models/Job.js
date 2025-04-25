const mongoose = require('mongoose')

const JobsSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,"Please provide company name"],
        maxlenght: 50,
    },
    position:{
        type:String,
        required:[true,"Please provide the position avaliable"],
        maxlenght: 50,
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.type.ObjectID,
        ref:'User',
        required:[true,"Please provide the object ID of who created it"]
    }
},{timestamps:true})

module.exports = mongoose.model('Job', JobsSchema)