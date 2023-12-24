const { InGameRanks} = require('../db/sequelizeSetup')

const findAllInGameRanks = (req, res) => {
    InGameRanks.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch((error) => {
            res.status(500).json(error.message)
        })
}


module.exports = { findAllInGameRanks }