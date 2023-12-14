const { User} = require('../db/sequelizeSetup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const SECRET_KEY = require('../configs/tokenData')

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
                        data: result.username
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


module.exports = { login, protect }