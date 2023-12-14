const express = require('express')
const router = express.Router()
const { findAllUsers, findUserByPk, createUser } = require('../controllers/userControllers')

router
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/login')
    .post()

router
    .route('/:id')
    .get(findUserByPk)
    .put()
    .delete()

module.exports = router