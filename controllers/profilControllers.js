const { Profil, User, sequelize, Review } = require('../db/sequelizeSetup')
const { UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize')

const findAllProfils = (req, res) => {
    Profil.findAll({ include: [User, Review] })
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json(error.message)
        })
}


const findLatestProfils = (req, res) => {
    Profil.findAll({
        include: [User, Review],
        order: [['updatedAt', 'DESC']],
        limit: 3
    })
    .then((results) => {
        res.json(results);
    })
    .catch((error) => {
        console.error('Error:', error);
        res.status(500).json(error.message);
    });
};

const findAllProfilsRawSql = (req, res) => {
    sequelize.query("SELECT inGameName, profilBio FROM `profils` LEFT JOIN `reviews` ON profils.id = reviews.ProfilId",
        { type: QueryTypes.SELECT })
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json(error.message)
        })
}

const findProfilByPk = (req, res) => {
    Profil.findByPk(parseInt(req.params.id), { include: [Review, User] })
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
                return res.status(404).json({ message: `The user couldn't be found.` });
            }

            Profil.findOne({ where: { UserId: user.id } })
                .then(existingProfil => {
                    if (existingProfil) {
                        return res.status(400).json({ message: 'The user already has a profile.' });
                    }
                    // id: user.id pour que quand le profil est supprimer son id soit égal au user.id
                    const newProfil = { ...req.body, UserId: user.id, id: user.id };
                    console.log(newProfil);

                    Profil.create(newProfil)
                        .then((profil) => {
                            res.status(201).json({ message: 'The profile was created', data: profil });
                        })
                        .catch((error) => {
                            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                                return res.status(400).json({ message: error.message });
                            }
                            res.status(500).json({ message: `The profile couldn't be created`, data: error.message });
                        });
                })
                .catch(error => {
                    res.status(500).json({ message: `Error while checking existing profile`, data: error.message });
                });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const updateProfil = (req, res) => {
    console.log('Profile ID to update:', req.params.id);
    Profil.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                console.log('Profile found:', result);

                return result.update(req.body)
                    .then((updatedProfile) => {
                        console.log('Profile updated:', updatedProfile);
                        res.status(201).json({ message: 'The profile was updated.', data: updatedProfile });
                    })
                    .catch((updateError) => {
                        console.error('Error updating profile:', updateError);
                        res.status(500).json({ message: 'An error occurred during the update.', data: updateError.message });
                    });
            } else {
                console.log('No profile found for update.');
                res.status(404).json({ message: `No profile was updated.` });
            }
        })
        .catch(error => {
            console.error('Error finding profile:', error);
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'An error has occurred.', data: error.message });
        });
};

// La fonction deleteProfil gère la suppression d'un profil en fonction de son identifiant.
const deleteProfil = (req, res) => {
    // Utilisation de la méthode findByPk pour trouver le profil par son identifiant.
    Profil.findByPk(req.params.id)
        .then((profil) => {
            // Vérifie si le profil éxiste.
            if (profil) {
                return profil.destroy()
                    // Si il existe, il est supprimé.
                    .then(() => {
                        res.json({ mesage: `The profile was deleted.`, data: profil })
                    })

            } else {
                // Sinon, une réponse 404 est renvoyé.
                res.status(404).json({ mesage: `No profile found.` })
            }
        })
        // Gestion d'erreurs
        .catch((error) => {
            // Utilisation de classe propre à Sequelize en cas de violation d'unicité.
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                res.status(400).json({ message: error.message })
            }
            // En cas d'autres erreurs, renvoie une réponse 500.
            res.status(500).json({ mesage: `The request was not successful.`, data: error.message })
        })
}

module.exports = { findAllProfils, findLatestProfils, findProfilByPk, createProfil, updateProfil, deleteProfil, findAllProfilsRawSql }