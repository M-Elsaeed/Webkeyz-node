module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isUUID: 4
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlpha: true
            }
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                is: /^(adminstrator|user)$/i
            }
        },
        group_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isUUID: 4
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        }
    }, {
        tableName: 'users'
    });
};