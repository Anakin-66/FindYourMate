const { User } = require('../db/sequelizeSetup')
const bcrypt = require('bcrypt')
const { UniqueConstraintError, ValidationError } = require('sequelize')

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
                res.json({ message: `User has been found`, data: user })
            } else {
                res.status(404).json({ message: `User not found`, data: user })
            }
        })
        .catch(error => {
            res.status(500).json({ message: `An error has occured`, data: error.message })
        })
}

const createUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            User.create({ ...req.body, password: hash })
                .then((user) => {
                    user.password = ""
                    res.status(201).json({ message: `The user was created`, data: user })
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `The user could'nt be created`, data: error.message })
                })
        })
        .catch(error => {
            console.log(error.message)
        })
}

const updateUser = (req, res) => {
    User.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                if (req.body.password) {
                    return bcrypt.hash(req.body.password, 10)
                        .then((hash) => {
                            req.body.password = hash

                            req.body.username = result.username
                            return result.update(req.body)
                                .then(() => {
                                    res.status(201).json({ message: `The password was updated.`, data: result })
                                })
                        })
                }
            } else {
                res.status(404).json({ message: `No user to update was found.` })
            }
             // if (result) {
                //     return result.update(req.body)
                //         .then(() => {
                //             res.status(201).json({ message: 'The username was updated.', data: result })
                //         })

                // } else {
                //     res.status(404).json({ message: `No username was updated.` })
                // }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'An error as occured.', data: error.message })
        })
}

const deleteUser = (req, res) => {
    User.findByPk(req.params.id)
        .then((user) => {
            // B. Si un coworking correspond à l'id alors on exécute la méthode destroy()
            if (user) {
                return user.destroy()
                    // C. Si le coworking est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .findByPk()
                    .then(() => {
                        res.json({ message: `The user was deleted.`, data: user })
                    })
            } else {
                // B Si aucun coworking ne correspond à l'id alors on retourne une réponse à POSTMAN
                res.status(404).json({ message: `No user was found.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: `The request was not successful.`, data: error.message })
        })
}


module.exports = { findAllUsers, findUserByPk, createUser, updateUser, deleteUser }