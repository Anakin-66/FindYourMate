const { Review } = require('../db/sequelizeSetup')
const { findAllReviews, findReviewByPk } = require('../controllers/reviewControllers')
const express = require('express')
const router = express.Router()


router 
    .route('/')
    .get(findAllReviews)
    .post()

router
    .route('/:id')
    .get(findReviewByPk)
    .put()
    .delete()

module.exports = router