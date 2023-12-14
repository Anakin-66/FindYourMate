const express = require('express')
const router = express.Router()
const { findAllUsers, findUserByPk } = require('../controllers/userControllers')
const { login } = require('../controllers/authControllers')

router
    .route('/')
    .get(findAllUsers)
    .post()

router
    .route('/login')
    .post(login)

router
    .route('/:id')
    .get(findUserByPk)
    .put()
    .delete()

module.exports = router