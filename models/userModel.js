// on définit le model coworking qui se traduira par une table avec ses champs dans la BDD
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            noUpdate: true,
            unique: {
                msg: "Le nom d'utilisateur est déjà pris."
            },
            validate: {
                len: {
                    msg: "Le nom doit avoir un nombre de caractères compris entre 2 et 15.",
                    args: [2, 15]
                }
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    // }, {
    //     onDelete: 'CASCADE',
    //     defaultScope: {
    //         attributes: { exclude: ['password'] }
    //     }, scopes: {
    //         withPassword: {
    //             attributes: {}
    //         }
    //     }
    },
    );
}