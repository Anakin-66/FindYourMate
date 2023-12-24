const express = require('express')
const router = express.Router()
const { findAllInGameRole } = require('../controllers/inGameRoleControllers')


router
    .route('/')
    .get(findAllInGameRole)



module.exports = router