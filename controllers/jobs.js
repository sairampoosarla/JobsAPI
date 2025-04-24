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
    res.json(req.user)
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