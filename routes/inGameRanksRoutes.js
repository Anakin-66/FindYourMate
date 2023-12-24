const express = require('express')
const router = express.Router()
const { findAllInGameRanks } = require('../controllers/inGameRanksControllers')
const { InGameRanks } = require('../db/sequelizeSetup')


router
    .route('/')
    .get(findAllInGameRanks)


    
module.exports = router