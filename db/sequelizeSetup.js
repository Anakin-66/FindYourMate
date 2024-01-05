// Import des gabarits défini dans le dossier models
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
const ReviewModel = require('../models/reviewModel')
const ProfilModel = require('../models/profilModel')
const { setUsers, setRoles, setProfils, setReviews } = require('../db/setDataSample')


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


// Relation des tables
Role.hasMany(User)
User.belongsTo(Role)

User.hasOne(Profil)
Profil.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

Profil.hasMany(Review)
Review.belongsTo(Profil)


// Profil.beforeCreate(async (profile, options) => {
//     const existingProfile = await Profil.findOne({ where: { UserId: profile.UserId } });

//     if (existingProfile) {
//       // Si un profil existe déjà pour cet utilisateur, empêcher la création
//       throw new Error('Un utilisateur ne peut avoir qu\'un seul profil.');
//     }
//   });

// Synchronisation avec la BDD
sequelize.sync({ force: true })
    .then(async () => {
        await setRoles(Role)
        await setUsers(User)
        await setProfils(Profil)
        await setReviews(Review)
    })
    .catch(error => {
        console.log(error)
    })


sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { sequelize, User, Role, Review, Profil }