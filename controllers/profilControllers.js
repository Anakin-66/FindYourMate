const { Profil, User } = require('../db/sequelizeSetup')
const { UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize')

const findAllProfils = (req, res) => {
    Profil.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json(error.message)
        })
}

const findProfilByPk = (req, res) => {
    Profil.findByPk(parseInt(req.params.id))
        .then(profil => {
            if (profil) {
                res.json({ message: `The profil was found.`, data: profil })
            } else {
                res.status(404).json({ message: `The profil could'nt be found.`, data: profil })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: `Une erreur est survenue.`, data: error.message })
        });
}

const createProfil = (req, res) => {

    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `The user could'nt be found.` })
            }
            const newProfil = { ...req.body, UserId: user.id }

            Profil.create(newProfil)
                .then((profil) => {
                    res.status(201).json({ message: 'The profil was created', data: profil })
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `The profil could'nt be created`, data: error.message })
                })
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

module.exports = { findAllProfils, findProfilByPk, createProfil }