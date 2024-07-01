module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});

    Cart.associate = function (models) {
        Cart.belongsTo(models.Product, { foreignKey: 'product_id' });
        Cart.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Cart;
};