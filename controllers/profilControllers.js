const { Profil, User, InGameRanks, InGameRole, sequelize } = require('../db/sequelizeSetup')
const { UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize')

const findAllProfils = (req, res) => {
    Profil.findAll({ include: [InGameRanks, InGameRole] })
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json(error.message)
        })
}

const findAllProfilsRawSql = (req, res) => {
    sequelize.query("SELECT inGameName FROM `profils` LEFT JOIN `reviews` ON profils.id = reviews.ProfilId",
        { type: QueryTypes.SELECT })
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
                res.json({ message: `The profile was found.`, data: profil })
            } else {
                res.status(404).json({ message: `The profile could'nt be found.`, data: profil })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: `An error has occured.`, data: error.message })
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
                    res.status(201).json({ message: 'The profile was created', data: profil })
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `The profile could'nt be created`, data: error.message })
                })
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const updateProfil = (req, res) => {
    Profil.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: 'The profile was updated.', data: result })
                    })

            } else {
                res.status(404).json({ message: `No profile was updated.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'An error has occured.', data: error.message })
        })
};

const deleteProfil = (req, res) => {
    Profil.findByPk(req.params.id)
        .then((profil) => {

            if (profil) {
                return profil.destroy()

                    .then(() => {
                        res.json({ mesage: `The profile was deleted.`, data: profil })
                    })

            } else {

                res.status(404).json({ mesage: `No profile found.` })
            }
        })
        .catch((error) => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                res.status(400).json({ message: error.message })
            }
            res.status(500).json({ mesage: `The request was not successful.`, data: error.message })
        })
}

module.exports = { findAllProfils, findProfilByPk, createProfil, updateProfil, deleteProfil, findAllProfilsRawSql }