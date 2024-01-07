const express = require('express')
const router = express.Router()
const { findAllProfils, findLatestProfils, findProfilByPk, createProfil, updateProfil, deleteProfil, findAllProfilsRawSql } = require('../controllers/profilControllers')
const { protect, restrict, restrictToOwnUser } = require('../controllers/authControllers')
const { Profil } = require('../db/sequelizeSetup')


router
    .route('/')
    .get(findAllProfils)
    .post(protect, createProfil)

router
    .route('/rawsql')
    .get(findAllProfilsRawSql)

router
    .route('/latestProfils')
    .get(findLatestProfils)


router
    .route('/:id')
    .get(findProfilByPk)
    .put(protect, restrictToOwnUser(Profil), updateProfil)
    .delete(protect, restrict('superadmin'), deleteProfil)


module.exports = router