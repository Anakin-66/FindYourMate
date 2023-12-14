const express = require('express')
const router = express.Router()
const { findAllProfils, findProfilByPk, createProfil } = require('../controllers/profilControllers')
const { protect } = require('../controllers/authControllers')


router
    .route('/')
    .get(findAllProfils)
    .post(protect, createProfil)

router
    .route('/:id')
    .get(findProfilByPk)
    .put()
    .delete()

module.exports = router