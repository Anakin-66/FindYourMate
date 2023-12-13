const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/userModel')
const { setUsers } = require('../db/setDataSample')

const sequelize = new Sequelize('find_your_mate', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const User = UserModel(sequelize, DataTypes)


sequelize.sync({ force: true })
    .then(() => {
        setUsers(User)
    })
    .catch(error => {
        console.log(error)
    })


sequelize.authenticate()
.then(() => console.log('La connexion à la base de données a bien été établie.'))
.catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { sequelize, User}