module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Profil', {
        gameName: {
            type: DataTypes.STRING,
        },
    }
    );
}