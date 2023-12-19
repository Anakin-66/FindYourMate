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

const updateReview = (req, res) => {
    Review.findByPk(req.params.id)
        .then((result => {
            if (result) {
                return result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: `The review has been updated`, data: result })
                    })
            } else {
                res.status(400).json({ message: `No review was updated` })
            }
        }))
        .catch((error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: `An error has occured`, data: error.message })
        }))
}

const deleteReview = (req, res) => {
    Review.findByPk(req.params.id)
        .then((review => {
            if (review) {
                return review.destroy()
                    .then(() => {
                        res.json({ message: `The review was deleted`, data: review })
                    })
            } else {
                res.status(400).json({ message: `No review was found` })
            }
        }))
        .catch((error => {
            if (error instanceof ValidationError) {
                res.status(400).json({ message: error.message})
            }
            res.status(500).json({ message: `The request was not successful`, data: error.message})
        }))
}


module.exports = { findAllReviews, findReviewByPk, createReview, updateReview, deleteReview }