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

const findReviewByPk = (req, res) => {
    Review.findByPk(parseInt(req.params.id))
    .then(review => {
        if (review) {
            res.json({ message: `The review was found`, date: review})
        } else {
            res.status(404).json({ message: `Please write the right ID corresponding to the review`})
        }
    })
    .catch(error => {
        res.status(500).json({message: `An error has occured`, date: error.message})
    })
}


module.exports = { findAllReviews, findReviewByPk }