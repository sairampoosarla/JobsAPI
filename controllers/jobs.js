const Job = require("../models/Job")
const {StatusCodes} = require('http-status-codes')
const getAllJobs = async (req, res) => {
    res.send("Get All Jobs")
}

const getJob = async (req, res) => {
    res.send("Get Job")
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