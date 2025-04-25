const Job = require("../models/Job")
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require("../errors")

//controller to get all the jobs in the database for the requested user
const getAllJobs = async (req, res) => {
    const filteredJobs = await Job.find({createdBy:req.user.userId}).sort("createdAt")
    res.status(StatusCodes.OK).json({filteredJobs, conut:filteredJobs.length})}

//this give the specfic job details
const getJob = async (req, res) => {
    const jobId = req.params.id
    const userId = req.user.userId
    const job = await Job.findOne({createdBy:userId,_id:jobId})
    if(!job){
        throw new NotFoundError("There are no jobs for the specfied job ID")
    }
    res.status(StatusCodes.OK).json(job)
}

const updateJob = async (req, res) => {
    const user_Id = req.user.userId
    const object_Id = req.params.id
    const new_company = req.body.company
    const new_position = req.body.position

    if(!new_company || !new_position){
        throw new BadRequestError("Company or Position feild can't be empty")
    }

    const new_job = await Job.findByIdAndUpdate({_id:object_Id,createdBy:user_Id},{company:new_company,position:new_position}, {new:true,runValidators:true})
    if(!new_job){
        throw new NotFoundError(`Requested Object with id ${object_Id} can't be found`)
    }
    //console.log(new_job)
    res.status(StatusCodes.OK).send(new_job)
}

const createJob = async (req, res) => {
    //console.log("entered create job controller")
    console.log(req.body)
    console.log(req.user.userId)
    const job = await Job.create({company:req.body.company,position:req.body.position,createdBy:req.user.userId})
    res.status(StatusCodes.CREATED).json({job})
    //res.send("Create Job")
}
const deleteJob = async (req, res) => {
    const user_Id = req.user.userId
    const object_Id = req.params.id

    const job_delete = await Job.findByIdAndRemove({_id:object_Id,createdBy:user_Id})

    if (!job_delete) {
        throw new NotFoundError(`No job with id ${object_Id}`)
      }
    res.status(StatusCodes.OK).send()

}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}