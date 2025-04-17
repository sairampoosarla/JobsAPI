const getAllJobs = async (res, req) => {
    res.send("Get All Jobs")
}

const getJob = async (res, req) => {
    res.send("Get Job")
}

const updateJob = async (res, req) => {
    res.send("Update Job")
}

const createJob = async (res, req) => {
    res.send("Create Job")
}
const deleteJob = async (res, req) => {
    res.send("Delete Job")
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}