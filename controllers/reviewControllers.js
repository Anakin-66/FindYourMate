const { Review, User } = require('../db/sequelizeSetup')
const { ValidationError } = require('sequelize')

const findAllReviews = (req, res) => {
    Review.findAll({ include: User})
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json(error.message)
        })
}


module.exports = { findAllReviews }