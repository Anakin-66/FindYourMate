const express = require('express')
const router = express.Router()
const { findAllUsers, findUserByPk, createUser, updateUser } = require('../controllers/userControllers')
const { login, protect, correctUser } = require('../controllers/authControllers')

router
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/login')
    .post(login)

router
    .route('/:id')
    .get(findUserByPk)
    .put(protect, correctUser, updateUser)
    .delete()

module.exports = router