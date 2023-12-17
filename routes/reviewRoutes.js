const { Review } = require('../db/sequelizeSetup')
const { findAllReviews } = require('../controllers/reviewControllers')
const express = require('express')
const router = express.Router()


router 
    .route('/')
    .get(findAllReviews)
    .post()

router
    .route('/:id')
    .get()
    .put()
    .delete()

module.exports = router