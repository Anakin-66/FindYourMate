// Définition du modèle de données pour la table "Profil" en utilisant Sequelize.
module.exports = (sequelize, DataTypes) => {
    // La fonction sequelize.define crée le modèle "Profil".
    return sequelize.define('Profil', {
        // La colonne "inGameName" représente le nom de profil du joueur et est de type chaîne de caractères. (varChar)
        inGameName: {
            type: DataTypes.STRING,
        },
        // La colonne "profilBio" représente la description du profil et est également de type chaîne de caractères. (varChar)
        profilBio: {
            type: DataTypes.STRING,
        }
    }
    );
}

