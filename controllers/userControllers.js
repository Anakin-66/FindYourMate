const { User } = require('../db/sequelizeSetup')
// const bcrypt = require('bcrypt')
// const { UniqueConstraintError, ValidationError } = require('sequelize')

const findAllUsers = (req, res) => {
    User.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json(error.message)
        })
}

module.exports = { findAllUsers }