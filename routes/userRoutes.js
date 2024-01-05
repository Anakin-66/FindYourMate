const express = require('express')
const router = express.Router()
const { User } = require('../db/sequelizeSetup')
const { findAllUsers, findUserByPk, createUser, updateUser, deleteUser } = require('../controllers/userControllers')
const { login, protect, restrict, correctUser, restrictToOwnUser } = require('../controllers/authControllers')

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
    .delete(protect, restrict('superadmin'), deleteUser)

router
    .route('/ownUser/:id')
    .delete(protect, correctUser, deleteUser)

module.exports = router