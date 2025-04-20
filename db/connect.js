//importing the required library
const mongoose = require('mongoose')

//connnecting to the database
//additional parameters are for stopping and warning
const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
