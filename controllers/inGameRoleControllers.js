const { InGameRole } = require('../db/sequelizeSetup')

const findAllInGameRole = (req, res) => {
    InGameRole.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json(error.message)
        })
}

module.exports = { findAllInGameRole }