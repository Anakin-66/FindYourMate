module.exports = (sequelize, DataTypes) => {
    return sequelize.define('GameRole', {
        gameRoleLabel: {
            type: DataTypes.STRING,
        },
    }, {
        updatedAt: false,
        createdAt: false
    }
    );
}