const { Review } = require('../db/sequelizeSetup')
const { findAllReviews, findReviewByPk, createReview, updateReview, deleteReview } = require('../controllers/reviewControllers')
const { protect, restrictToOwnUser } = require ('../controllers/authControllers')
const express = require('express')
const router = express.Router()


router 
    .route('/')
    .post(protect, createReview)

router
    .route('/profil/:id')
    .get(findAllReviews)

router
    .route('/:id')
    .get(findReviewByPk)
    .put(protect, restrictToOwnUser(Review), updateReview)
    .delete(protect, restrictToOwnUser(Review), deleteReview)

module.exports = router