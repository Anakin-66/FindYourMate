const { User} = require('../db/sequelizeSetup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const SECRET_KEY = require('../configs/tokenData')

// Middleware login
const login = (req, res) => {
    User.scope('withPassword').findOne({ where: { username: req.body.username } })
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: `Le nom d'utilisateur n'existe pas.` })
            }
            bcrypt.compare(req.body.password, result.password)
                .then((isValid) => {
                    if (!isValid) {
                        return res.status(401).json({ message: `Le mot de passe n'est pas valide.` })
                    }
                    const token = jwt.sign({
                        data: result.username
                    }, SECRET_KEY, { expiresIn: '1h' });

                    res.cookie('coworkingapi_jwt', token)
                    res.json({ message: `Login réussi`, data: token })
                })
                .catch(error => {
                    console.log(error.message);
                })
        })
        .catch((error) => {
            res.status(500).json({ data: error.message })
        })
}


module.exports = { login }