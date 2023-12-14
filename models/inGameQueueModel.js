module.exports = (sequelize, DataTypes) => {
    return sequelize.define('GameQueue', {
        queueLabel: {
            type: DataTypes.STRING,
        },
    }, {
        updatedAt: false,
        createdAt: false
    }
    );
}