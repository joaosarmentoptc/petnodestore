module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        firstname: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});

    User.associate = function (models) {
        // associations can be defined here
    };

    return User;
};