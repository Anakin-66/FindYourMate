const express = require('express')
const router = express.Router()
const { findAllProfils, findProfilByPk, createProfil, updateProfil, deleteProfil, findAllProfilsRawSql } = require('../controllers/profilControllers')
const { protect, restrictToOwnUser } = require('../controllers/authControllers')
const { Profil } = require('../db/sequelizeSetup')


router
    .route('/')
    .get(findAllProfils)
    .post(protect, createProfil)

router
    .route('/rawsql')
    .get(findAllProfilsRawSql)

router
    .route('/:id')
    .get(findProfilByPk)
    .put(protect, restrictToOwnUser(Profil), updateProfil)
    .delete(protect, restrictToOwnUser(Profil), deleteProfil)

module.exports = router