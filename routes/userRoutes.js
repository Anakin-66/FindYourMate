const express = require('express')
const router = express.Router()
const { findAllUsers } = require('../controllers/userControllers')

router
    .route('/')
    .get(findAllUsers)
    .post()

router
    .route('/login')
    .post()

router
    .route('/:id')
    .get()
    .put()
    .delete()

module.exports = router