const { Review } = require('../db/sequelizeSetup')
const { findAllReviews, findAllReviewsOfOneProfile, findReviewByPk, createReview, updateReview, deleteReview } = require('../controllers/reviewControllers')
const { protect,restrict, restrictToOwnUser } = require ('../controllers/authControllers')
const express = require('express')
const router = express.Router()


router 
    .route('/')
    .get(findAllReviews)
    .post(protect, createReview)

router
    .route('/profil/:id')
    .get(findAllReviewsOfOneProfile)

router
    .route('/:id')
    .get(findReviewByPk)
    .put(protect, restrictToOwnUser(Review), updateReview)
    .delete(protect, restrict('superadmin'), deleteReview)

module.exports = router