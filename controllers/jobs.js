const Job = require("../models/Job")
const {StatusCodes} = require('http-status-codes')
const {NotFoundError} = require("../errors")

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
    res.send("Update Job")
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
    res.send("Delete Job")
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}