// Import des gabarits défini dans le dossier models
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
const ReviewModel = require('../models/reviewModel')
const ProfilModel = require('../models/profilModel')
const InGameRanksModel = require('../models/inGameRanksModel')
const InGameRoleModel = require('../models/inGameRoleModel')
const InGameQueueModel = require('../models/inGameQueueModel')
const { setUsers, setRoles, setProfils, setGameRanks, setGameRoles, setGameQueues } = require('../db/setDataSample')


// Instance qui va communiquer avec Xampp
const sequelize = new Sequelize('find_your_mate', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});


// Instance de model qui interpretra le JS avec la table SQL correspondante
const User = UserModel(sequelize, DataTypes)
const Role = RoleModel(sequelize, DataTypes)
const Review = ReviewModel(sequelize, DataTypes)
const Profil = ProfilModel(sequelize, DataTypes)
const InGameRanks = InGameRanksModel(sequelize, DataTypes)
const InGameRole = InGameRoleModel(sequelize, DataTypes)
const InGameQueue = InGameQueueModel(sequelize, DataTypes)

// Relation des tables
Role.hasMany(User)
User.belongsTo(Role)

User.hasOne(Profil)
Profil.belongsTo(User)

InGameRanks.hasMany(Profil)
Profil.belongsTo(InGameRanks)

InGameRole.hasMany(Profil)
Profil.belongsTo(InGameRole)

InGameQueue.hasMany(Profil)
Profil.belongsTo(InGameQueue)


// Synchronisation avec la BDD
sequelize.sync({ force: true })
    .then(() => {
        setUsers(User)
        setRoles(Role)
        setProfils(Profil)
        setGameRanks(InGameRanks)
        setGameRoles(InGameRole)
        setGameQueues(InGameQueue)
    })
    .catch(error => {
        console.log(error)
    })


sequelize.authenticate()
.then(() => console.log('La connexion à la base de données a bien été établie.'))
.catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { sequelize, User, Role, Review, Profil, InGameRanks, InGameRole, InGameQueue}