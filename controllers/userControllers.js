const { User } = require('../db/sequelizeSetup')
// const bcrypt = require('bcrypt')
// const { UniqueConstraintError, ValidationError } = require('sequelize')

// Middleware pour trouver tout les utilisateurs
const findAllUsers = (req, res) => {
    User.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json(error.message)
        })
}

// Middleware pour trouver un utilisateur précis (son id)
const findUserByPk = (req, res) => {
    User.findByPk(parseInt(req.params.id))
        .then(user => {
            if (user) {
                res.json({ message: `User has been found`, date: user })
            } else {
                res.status(404).json({ message: `User not found`, date: user })
            }
        })
        .catch(error => {
            res.status(500).json({ message: `An error has occured`, data: error.message })
        })
}

// const createUser = (req, res) => {
//     bcrypt.hash(req.body.password, 10)
//         .then((hash) => {
//             User.create({ ...req.body, password: hash })
//                 .then((user) => {
//                     user.password = ""
//                     res.status(201).json({ message: `The user was created`, data: user })
//                 })
//                 .catch((error) => {
//                     if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
//                         return res.status(400).json({ message: error.message })
//                     }
//                     res.status(500).json({ message: `The user could'nt be created`, data: error.message })
//                 })
//         })
//         .catch(error => {
//             console.log(error.message)
//         })
// }


module.exports = { findAllUsers, findUserByPk }