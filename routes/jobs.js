const express = require('express')

const {register} = require('../controllers/auth.js')

const router = express.Router()

const {getAllJobs, getJob, createJob, updateJob, deleteJob} = require('../controllers/jobs.js')


router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router