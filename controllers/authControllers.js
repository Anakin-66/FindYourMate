const { User, Role} = require('../db/sequelizeSetup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const SECRET_KEY = require('../configs/tokenData')

// Déclaration de variable pour gérer la hiérarchie des rôles
const rolesHierarchy = {
    edit: ["edit"],
    admin: ["admin", "edit"],
    superadmin: ["superadmin", "admin", "edit"]
}

// Middleware login
const login = (req, res) => {
    console.log(req.body);
    User.scope('withPassword').findOne({ where: { username: req.body.username } })
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: `The username doesn't exist.` })
            }
            bcrypt.compare(req.body.password, result.password)
                .then((isValid) => {
                    if (!isValid) {
                        return res.status(401).json({ message: `The password is incorrect.` })
                    }
                    const token = jwt.sign({
                        data: result.username, 
                        dataId: result.id
                    }, SECRET_KEY, { expiresIn: '1h' });

                    // res.cookie('findyourmateapi_jwt', token)
                    res.json({ message: `Login successful`, data: token })
                })
                .catch(error => {
                    console.log(error.message);
                })
        })
        .catch((error) => {
            res.status(500).json({ data: error.message })
        })
}

// Middleware protect
const protect = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: `You're not connected.` })
    }

    const token = req.headers.authorization.split(' ')[1]

    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.username = decoded.data
            next()
        } catch (error) {
            return res.status(403).json({ message: `The token is not valid.` })
        }
    }
}

// Middleware pour les droits
const restrict = (labelRole) => {
    return (req, res, next) => {
        User.findOne({
            where: {
                username: req.username
            }
        })
            .then(user => {
                Role.findByPk(user.RoleId)
                    .then(role => {
                        if (rolesHierarchy[role.label].includes(labelRole)) {
                            next()
                        } else {
                            res.status(403).json({ message: `Insufficient rights` })
                        }
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// Middleware propre aux utilisateurs
const restrictToOwnUser = (model) => {
    return (req, res, next) => {
        User.findOne(
            {
                where:
                    { username: req.username }
            })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: `No users found.` })
                }
                // on teste d'abord si le user est admin
                return Role.findByPk(user.RoleId)
                    .then(role => {
                        // role.label est le rôle issu du token 
                        if (rolesHierarchy[role.label].includes('admin')) {
                            return next()
                        }
                        model.findByPk(req.params.id)
                            .then(ressource => {
                                if (!ressource) return res.status(404).json({ message: `The resource doesn't exist.` })
                                if (user.id === ressource.UserId) {
                                    next()
                                } else {
                                    res.status(403).json({ message: `You're not the author of the resource.` })
                                }
                            })
                            .catch(error => {
                                return res.status(500).json({ message: error.message })
                            })
                    })
            })
            .catch(error => console.log(error.message))
    }
}

// Middleware pour éviter qu'un rôle qui est dans la même hiérachie qu'un autre puisse modifier son contenu (mdp ou username) 
const correctUser = (req, res, next) => {
    User.findOne({ where: { username: req.username } })
        .then(authUser => {
            console.log(authUser.id, parseInt(req.params.id))
            if (authUser.id === parseInt(req.params.id)) {
                next()
            } else {
                res.status(403).json({ message: "Insufficient rights." })
            }
            // Role.findByPk(authUser.RoleId)
            //     .then(role => {
            //         // if (rolesHierarchy[role.label].includes('admin')) {
            //         //     return next()
            //         // }

            //         if (authUser.id === req.params.id) {
            //             next()
            //         } else {
            //             res.status(403).json({ message: "Droits insuffisants." })
            //         }
            //     })
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
    // if (result.id !== req.params.id) {
    //     return res.status(403).json({ message: 'Droits insuffisants.' })
    // }
}


module.exports = { login, protect, restrict, restrictToOwnUser, correctUser }