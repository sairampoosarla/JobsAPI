const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  //console.log(err)
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong please try again later" 
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  if (err.code && err.code === 11000){
    customError.statusCode=400
    customError.msg = `Duplicate value entered please select another value`
  }
  return res.status(customError.statusCode).json({msg: customError.msg })
}

module.exports = errorHandlerMiddleware
