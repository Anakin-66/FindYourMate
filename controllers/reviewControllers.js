const { Review, User } = require('../db/sequelizeSetup')
const { ValidationError } = require('sequelize')

const findAllReviews = (req, res) => {
    Review.findAll({ include: User })
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
                res.json({ message: `The review was found`, date: review })
            } else {
                res.status(404).json({ message: `Please write the right ID corresponding to the review` })
            }
        })
        .catch(error => {
            res.status(500).json({ message: `An error has occured`, date: error.message })
        })
}

const createReview = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `User not found.` })
            }
            return Review.create({ ...req.body, UserId: user.id })
                .then(result => {
                    res.json({ message: `Review created.`, data: result })
                })
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: error.message })
        })
}


module.exports = { findAllReviews, findReviewByPk, createReview }