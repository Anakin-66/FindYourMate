const { Review } = require('../db/sequelizeSetup')
const { findAllReviews, findReviewByPk, createReview } = require('../controllers/reviewControllers')
const { protect } = require ('../controllers/authControllers')
const express = require('express')
const router = express.Router()


router 
    .route('/')
    .get(findAllReviews)
    .post(protect, createReview)

router
    .route('/:id')
    .get(findReviewByPk)
    .put()
    .delete()

module.exports = router