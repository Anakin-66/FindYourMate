module.exports = (sequelize, DataTypes) => {
    return sequelize.define('GameRanks', {
        ranksLabel: {
            type: DataTypes.STRING,
        },
    }, {
        updatedAt: false,
        createdAt: false
    }
    );
}