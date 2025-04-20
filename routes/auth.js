const express = require('express')

const router = express.Router()

const {register, login} = require('../controllers/auth.js')

router.route('/login').get(login)
router.route('/register').get(register)

module.exports = router